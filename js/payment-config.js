/**
 * Public payment configuration.
 * 브라우저에 노출되어도 안전한 값만 둔다.
 * NEVER put TOSS_SECRET_KEY or any server secret in this repository.
 */
window.STARGATE_PAYMENT = Object.freeze({
  provider: "TossPayments",
  supportEmail: "ceo@stargateedu.co.kr",
  successUrl: "https://shop.stargateedu.co.kr/success.html",
  cancelUrl: "https://shop.stargateedu.co.kr/cancel.html",

  // TossPayments V2 결제창 클라이언트 키.
  // 개발자센터 → API 키 → "클라이언트 키" 를 그대로 붙여넣는다.
  // 테스트: test_ck_*  /  라이브: live_ck_*
  // 시크릿 키와 반드시 같은 모드(테스트↔테스트, 라이브↔라이브)여야 한다.
  tossClientKey: "",

  // 서버측 최종 승인 엔드포인트 (Supabase Edge Function).
  // 프로젝트: inftexpcnfinglwlrvsj — 금액 검증·주문 원장 기록·멱등 처리를 담당한다.
  confirmEndpoint: "https://inftexpcnfinglwlrvsj.supabase.co/functions/v1/toss-confirm",

  // Supabase publishable key. 브라우저 공개용 식별자이며 DB 접근 권한이 없다.
  // (shop_orders 테이블은 RLS 로 anon 접근이 전면 차단되어 있다.)
  supabaseAnonKey: "sb_publishable_-D0A-aWNMTMTHXeL0oqBXg_9Tz0bdvs",

  // 토스페이먼츠 결제창을 여는 상품 목록 = 배송주소가 필요 없는 단건결제 상품.
  // 이 목록과 별개로 금액은 Edge Function 의 서버 카탈로그로 재검증된다.
  tossEnabledProducts: Object.freeze([
    "koi-algorithms-guide",
    "koi-advanced",
    "algorithms-bundle",
    "kmo-number-comb",
    "koi-cpp-beginner",
    "algorithms-ebook-set",
    "vacation-live-intensive",
    "koi-final-camp",
    "strategy-consulting"
  ]),

  // 정기 구독은 빌링키 연동 전까지, 실물 상품은 배송주소 수집 연동 전까지 이메일 주문을 유지한다.
  links: Object.freeze({
    "problem-bank-monthly": "",
    "problem-bank-annual": "",
    "mock-exam-monthly": "",
    "koi-beginner-textbook": "",
    "algorithms-workbook-1": "",
    "koi-past-papers": "",
    "ongoing-mentoring": ""
  })
});

/**
 * 전자상거래법 제10조 · 통신판매업 신고사항 표기 정보.
 * 값은 기존 index.html / faq.html / privacy.html 푸터 표기와 동일하게 맞춘다.
 * ⚠ phone 은 아직 미기재. 전자상거래법상 "전화번호" 는 필수 표기 항목이므로
 *    라이브 키 전환 전에 반드시 채워야 한다. 빈 값은 화면에 렌더링되지 않는다.
 */
window.STARGATE_BUSINESS = Object.freeze({
  companyName: "주식회사 별의문",
  ceoName: "정동수",
  bizRegNo: "848-86-03835",
  mailOrderNo: "2025-서울강남-05246호",
  address: "서울 강남구 강남대로112길 47",
  phone: "",                       // ← 대표 전화번호 (필수 표기, 미기재 상태)
  email: "ceo@stargateedu.co.kr",
  privacyOfficer: "정동수 (대표)",
  hostingProvider: "GitHub Pages"
});
