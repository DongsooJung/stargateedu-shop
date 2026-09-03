# 토스페이먼츠 실결제 연동 — 운영 문서

## 1. 구조

```
checkout.html  (상품·금액 표시 + 구매자 정보/약관 동의)
      │  TossPayments V2 결제창 (카드 정보는 토스가 직접 처리)
      ▼
success.html   (paymentKey / orderId / amount 수신)
      │  POST
      ▼
Supabase Edge Function  toss-confirm      ← 프로젝트 inftexpcnfinglwlrvsj
      │  ① 서버 카탈로그로 금액 재검증
      │  ② public.shop_orders 에 PENDING 기록
      │  ③ Basic 인증 + Idempotency-Key 로 최종 승인 호출
      ▼
POST https://api.tosspayments.com/v1/payments/confirm
      │
      ▼
shop_orders → DONE / FAILED / CANCELED 확정
```

승인 엔드포인트: `https://inftexpcnfinglwlrvsj.supabase.co/functions/v1/toss-confirm`

## 2. 보안 모델

| 값 | 위치 | 공개 여부 |
|---|---|---|
| 클라이언트 키 (`*_ck_*`) | `js/payment-config.js` | 브라우저 공개 — 정상 |
| 시크릿 키 (`*_sk_*`) | Supabase Edge Function Secret `TOSS_SECRET_KEY` | **절대 저장소·브라우저 금지** |
| Supabase publishable key | `js/payment-config.js` | 공개 — DB 권한 없음 |
| service_role key | Edge Function 런타임 자동 주입 | 비공개 |

- **금액의 진실은 서버에만 있다.** Edge Function 의 `SERVER_CATALOG` 와 어긋나면 `AMOUNT_MISMATCH` 로 거절된다. 브라우저에서 금액을 조작해도 승인되지 않는다.
- `public.shop_orders` 는 RLS 로 anon·authenticated 접근이 전면 차단되어 있다. Edge Function(service_role)만 기록·조회한다.
- 동일 `orderId` 재요청은 멱등 처리한다. 새로고침·재시도로 중복 승인되지 않는다.
- CORS 는 `shop.stargateedu.co.kr` 등 허용 출처만 통과한다.

## 3. 남은 설정 (이 두 가지만 하면 실결제가 열린다)

### ① 시크릿 키 등록 — Supabase
Supabase 대시보드 → 프로젝트 `inftexpcnfinglwlrvsj` → **Edge Functions → Secrets** → Add new secret

```
Name : TOSS_SECRET_KEY
Value: test_sk_...   (테스트)  /  live_sk_...   (실결제)
```

### ② 클라이언트 키 등록 — 저장소
`js/payment-config.js` 의 `tossClientKey: ""` 에 붙여넣는다.

```js
tossClientKey: "test_ck_...",   // 시크릿 키와 반드시 같은 모드
```

> 클라이언트 키와 시크릿 키의 모드가 어긋나면 결제창은 열려도 승인 단계에서 실패한다.

## 4. 테스트 절차

1. 두 키를 모두 **테스트 키**로 맞춘다.
2. `https://shop.stargateedu.co.kr/checkout.html?product=koi-algorithms-guide` 접속
3. 구매자 정보 입력 → 필수 동의 2건 체크 → 결제하기
4. 토스 테스트 카드로 결제 (실제 청구 없음)
5. 확인 항목
   - `success.html` 이 "결제가 완료되었습니다" 를 표시하는가
   - 승인시각·결제수단·매출전표 링크가 표시되는가
   - `shop_orders` 에 해당 `order_id` 가 `status = 'DONE'` 으로 남았는가

```sql
select order_id, product_id, amount, status, method, approved_at
from public.shop_orders order by created_at desc limit 10;
```

6. 위변조 방어 확인 — `amount` 를 임의로 바꿔 호출하면 `AMOUNT_MISMATCH` 로 거절되어야 한다.

## 5. 라이브 전환 체크리스트

- [ ] 토스페이먼츠 상점 심사 완료 및 라이브 키 발급
- [ ] `TOSS_SECRET_KEY` 를 `live_sk_*` 로 교체
- [ ] `tossClientKey` 를 `live_ck_*` 로 교체 후 커밋·배포
- [ ] **사업자 대표 전화번호 기재** (`js/payment-config.js` 의 `STARGATE_BUSINESS.phone`) — 전자상거래법 제10조 필수 표기 항목이며 현재 공란
- [ ] 소액 실결제 1건 후 토스 관리자에서 취소 처리하여 전 구간 검증
- [ ] 환불 처리 절차 확정 (`/v1/payments/{paymentKey}/cancel` 연동 또는 토스 관리자 수동 취소)

## 6. 현재 열려 있는 상품

배송주소가 필요 없는 단건결제 9종 (`js/payment-config.js` 의 `tossEnabledProducts`).
정기 구독 4종(문제은행 월/연, 월간 모의고사, 1:1 정기 멘토링)은 **빌링키(자동결제) 연동이 별도로 필요**하고, 실물 교재 3종은 **배송주소 수집·저장 연동이 필요**하여 이메일 주문으로 접수된다.

## 7. 가격 변경 시

`js/catalog.js`(표시용)와 Edge Function `toss-confirm` 의 `SERVER_CATALOG`(검증용)를 **반드시 함께** 수정한다. 한쪽만 바꾸면 결제가 `AMOUNT_MISMATCH` 로 전부 실패한다.
