# Stargate Edu Shop

정보·수학 올림피아드(KOI·KMO) 전문 온라인 스쿨 랜딩페이지.

- 배포 대상: Vercel 정적 사이트 + Node.js 서버리스 API
- 커스텀 도메인: **shop.stargateedu.co.kr**
- 브랜드 컬러: 딥네이비 `#0B2A4A` / 골드 `#C9A227`

## 구조
- `index.html` — 한국어 메인 랜딩
- `en/index.html` — 영문 랜딩
- `checkout.html` — 상품 확인 및 카카오페이 결제 시작/승인 화면
- `api/kakaopay/ready.js` — 카카오페이 결제 준비 API
- `api/kakaopay/approve.js` — 카카오페이 결제 승인 API
- `api/_lib/kakaopay.js` — 서버 카탈로그, 서명 검증, 카카오페이 API 클라이언트
- `js/catalog.js` — 화면 표시용 공개 상품 카탈로그
- `js/kakaopay-checkout.js` — 브라우저 결제 흐름
- `CNAME` — 커스텀 도메인 설정

## 카카오페이 운영 설정

실제 키를 저장소에 넣지 말고 Vercel의 Project Settings > Environment Variables에 아래 값을 등록합니다.

- `KAKAOPAY_SECRET_KEY`: 재발급한 운영 Secret key
- `KAKAOPAY_CID`: 카카오페이가 발급한 10자리 단건 결제 CID
- `KAKAOPAY_SUBSCRIPTION_CID`: 정기 결제 CID. 구독 상품이 없으면 생략 가능
- `CHECKOUT_SIGNING_SECRET`: 32바이트 이상의 무작위 문자열
- `SITE_ORIGIN`: `https://shop.stargateedu.co.kr`

개발 환경에서는 카카오페이의 테스트 CID와 `Secret key(dev)`를 사용합니다. 운영 Secret key와 개발 Secret key를 혼용하지 않습니다.

## 배포 전 필수 확인

1. 카카오페이 애플리케이션 Web 플랫폼에 `https://shop.stargateedu.co.kr` 등록
2. 온라인 결제 가맹점 심사 및 운영 CID 발급 확인
3. Vercel 환경변수 등록 후 재배포
4. `shop.stargateedu.co.kr` DNS를 Vercel 프로젝트에 연결
5. 소액 실결제 또는 테스트 CID로 준비/승인/취소/실패 흐름 검증
6. 결제 승인 결과를 주문 DB·이메일·수강권 발급 시스템과 연결

> 결제 금액은 브라우저 값이 아니라 서버 카탈로그에서 결정됩니다. Secret key는 서버리스 함수에서만 사용됩니다.
