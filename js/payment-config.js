/**
 * Public payment configuration.
 * Client keys and Supabase anon keys are browser-safe identifiers.
 * NEVER put TOSS_SECRET_KEY or any server secret in this repository.
 */
window.STARGATE_PAYMENT = Object.freeze({
  provider: "TossPayments",
  supportEmail: "ceo@stargateedu.co.kr",
  successUrl: "https://shop.stargateedu.co.kr/success.html",
  cancelUrl: "https://shop.stargateedu.co.kr/cancel.html",

  // TossPayments V2 Standard Payment Window client key.
  // Paste the matching test_ck_* or live_ck_* client key here.
  tossClientKey: "",

  // Supabase Edge Function that performs the server-side Toss confirm call.
  confirmEndpoint: "https://flxntafmvcdhpagzrvii.supabase.co/functions/v1/toss-confirm",

  // Legacy anon JWT is a publishable browser key. It only authorizes access to
  // the Edge Function; the Toss secret remains server-side in Supabase secrets.
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZseG50YWZtdmNkaHBhZ3pydmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMzc2NjgsImV4cCI6MjA3NzkxMzY2OH0.JOqS4I18z1al-omPSgRQor-eUx2Qd-IhT-6aAAtdDl8",

  tossEnabledProducts: Object.freeze([
    "koi-algorithms-guide"
  ]),

  // Keep legacy hosted links for products not yet migrated to TossPayments.
  links: Object.freeze({
    "koi-algorithms-guide": "",
    "koi-advanced": "",
    "algorithms-bundle": "",
    "kmo-number-comb": "",
    "koi-cpp-beginner": "",
    "problem-bank-monthly": "",
    "problem-bank-annual": "",
    "mock-exam-monthly": "",
    "koi-beginner-textbook": "",
    "algorithms-workbook-1": "",
    "koi-past-papers": "",
    "algorithms-ebook-set": "",
    "vacation-live-intensive": "",
    "koi-final-camp": "",
    "strategy-consulting": "",
    "ongoing-mentoring": ""
  })
});
