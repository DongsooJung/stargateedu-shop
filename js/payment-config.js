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

  tossClientKey: "",

  confirmEndpoint: "https://inftexpcnfinglwlrvsj.supabase.co/functions/v1/toss-confirm",

  supabaseAnonKey: "sb_publishable_-D0A-aWNMTMTHXeL0oqBXg_9Tz0bdvs",

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

window.STARGATE_BUSINESS = Object.freeze({
  companyName: "주식회사 별의문",
  ceoName: "정동수",
  bizRegNo: "848-86-03835",
  mailOrderNo: "2025-서울강남-05246호",
  address: "서울 강남구 강남대로112길 47",
  phone: "070-8027-8225",
  mobile: "010-9587-8225",
  email: "ceo@stargateedu.co.kr",
  privacyOfficer: "정동수 (대표)",
  hostingProvider: "GitHub Pages"
});
