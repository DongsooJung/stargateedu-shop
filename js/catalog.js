/**
 * Public storefront catalog.
 * 여기의 가격은 "표시용" 이다. 실제 결제 금액의 진실은 Supabase Edge Function `toss-confirm`
 * 안의 SERVER_CATALOG 이며, 금액이 어긋나면 승인 단계에서 AMOUNT_MISMATCH 로 거절된다.
 * 가격을 바꿀 때는 반드시 이 파일과 Edge Function 을 함께 수정한다.
 */
window.STARGATE_CATALOG = Object.freeze({
  "koi-algorithms-guide": {
    name: { ko: "KOI 수상자의 25개 핵심 알고리즘 가이드", en: "25 Essential Algorithms by a KOI Award Winner" },
    sku: "SGE-EBOOK-KOI-25", type: "book", billing: "one_time", delivery: "digital", priceKRW: 30000
  },
  "koi-advanced": {
    name: { ko: "정보올림피아드 심화 (자료구조·알고리즘)", en: "Advanced Computing Olympiad: Data Structures & Algorithms" },
    sku: "SGE-COURSE-ADV", type: "course", billing: "one_time", delivery: "digital", priceKRW: 429000
  },
  "algorithms-bundle": {
    name: { ko: "알고리즘 종합 패키지 (입문+심화)", en: "Complete Algorithms Package: Beginner + Advanced" },
    sku: "SGE-COURSE-BUNDLE", type: "course", billing: "one_time", delivery: "digital", priceKRW: 690600
  },
  "kmo-number-comb": {
    name: { ko: "KMO 대비 정수론·조합", en: "KMO Number Theory & Combinatorics" },
    sku: "SGE-COURSE-KMO-NC", type: "course", billing: "one_time", delivery: "digital", priceKRW: 384000
  },
  "koi-cpp-beginner": {
    name: { ko: "정보올림피아드 입문 (C++ 기초)", en: "Computing Olympiad Fundamentals: C++ Basics" },
    sku: "SGE-COURSE-CPP-BEG", type: "course", billing: "one_time", delivery: "digital", priceKRW: 297000
  },
  "problem-bank-monthly": {
    name: { ko: "문제은행 월 구독", en: "Monthly Problem Bank" },
    sku: "SGE-SUB-PB-M", type: "subscription", billing: "monthly", delivery: "digital", priceKRW: 39000
  },
  "problem-bank-annual": {
    name: { ko: "문제은행 연 구독", en: "Annual Problem Bank" },
    sku: "SGE-SUB-PB-Y", type: "subscription", billing: "annual", delivery: "digital", priceKRW: 390000
  },
  "mock-exam-monthly": {
    name: { ko: "월간 모의고사", en: "Monthly Mock Exams" },
    sku: "SGE-SUB-MOCK-M", type: "subscription", billing: "monthly", delivery: "digital", priceKRW: 49000
  },
  "koi-beginner-textbook": {
    name: { ko: "정보올림피아드 입문 교재", en: "Computing Olympiad Fundamentals Textbook" },
    sku: "SGE-BOOK-BEG", type: "book", billing: "one_time", delivery: "physical", priceKRW: 28800
  },
  "algorithms-workbook-1": {
    name: { ko: "알고리즘 문제집 상권", en: "Algorithms Workbook, Volume 1" },
    sku: "SGE-BOOK-WB1", type: "book", billing: "one_time", delivery: "physical", priceKRW: 31500
  },
  "koi-past-papers": {
    name: { ko: "KOI 기출·해설집 (2015-2025)", en: "KOI Past Papers & Solutions (2015–2025)" },
    sku: "SGE-BOOK-PAST-1525", type: "book", billing: "one_time", delivery: "physical", priceKRW: 37800
  },
  "algorithms-ebook-set": {
    name: { ko: "알고리즘 문제집 eBook 세트", en: "Algorithms Workbook eBook Set" },
    sku: "SGE-EBOOK-SET", type: "book", billing: "one_time", delivery: "digital", priceKRW: 47600
  },
  "vacation-live-intensive": {
    name: { ko: "방학 집중 라이브특강 (4주)", en: "Vacation Live Intensive (4 Weeks)" },
    sku: "SGE-LIVE-VAC4W", type: "live", billing: "one_time", delivery: "live", priceKRW: 281600
  },
  "koi-final-camp": {
    name: { ko: "KOI 직전 파이널 캠프", en: "KOI Final Camp" },
    sku: "SGE-LIVE-FINALCAMP", type: "live", billing: "one_time", delivery: "in_person", priceKRW: 405000
  },
  "strategy-consulting": {
    name: { ko: "입시·대회 전략 컨설팅", en: "Admissions & Competition Strategy" },
    sku: "SGE-CONSULT-STRATEGY", type: "consulting", billing: "one_time", delivery: "appointment", priceKRW: 250000
  },
  "ongoing-mentoring": {
    name: { ko: "1:1 정기 멘토링", en: "Ongoing 1:1 Mentoring" },
    sku: "SGE-CONSULT-MENTOR-M", type: "consulting", billing: "monthly", delivery: "appointment", priceKRW: 752000
  }
});

window.STARGATE_PRODUCT_ORDER = Object.freeze({
  ko: Object.freeze({
    courses: ["koi-advanced", "algorithms-bundle", "kmo-number-comb", "koi-cpp-beginner"],
    sub: ["problem-bank-monthly", "problem-bank-annual", "mock-exam-monthly"],
    books: ["koi-algorithms-guide", "koi-beginner-textbook", "algorithms-workbook-1", "koi-past-papers"],
    live: ["vacation-live-intensive", "koi-final-camp", "strategy-consulting", "ongoing-mentoring"]
  }),
  en: Object.freeze({
    courses: ["koi-advanced", "algorithms-bundle", "kmo-number-comb", "koi-cpp-beginner"],
    sub: ["problem-bank-monthly", "problem-bank-annual", "mock-exam-monthly"],
    books: ["koi-beginner-textbook", "algorithms-workbook-1", "koi-past-papers", "algorithms-ebook-set"],
    live: ["vacation-live-intensive", "koi-final-camp", "strategy-consulting", "ongoing-mentoring"]
  })
});
