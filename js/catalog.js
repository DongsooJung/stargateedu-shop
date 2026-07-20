/**
 * Public storefront catalog.
 * Prices are display values only. The payment provider must be the source of truth.
 */
window.STARGATE_CATALOG = Object.freeze({
  "koi-advanced": {
    name: { ko: "정보올림피아드 심화 (자료구조·알고리즘)", en: "Advanced Computing Olympiad: Data Structures & Algorithms" },
    type: "course", billing: "one_time", delivery: "digital", priceKRW: 429000
  },
  "algorithms-bundle": {
    name: { ko: "알고리즘 종합 패키지 (입문+심화)", en: "Complete Algorithms Package: Beginner + Advanced" },
    type: "course", billing: "one_time", delivery: "digital", priceKRW: 690600
  },
  "kmo-number-comb": {
    name: { ko: "KMO 대비 정수론·조합", en: "KMO Number Theory & Combinatorics" },
    type: "course", billing: "one_time", delivery: "digital", priceKRW: 384000
  },
  "koi-cpp-beginner": {
    name: { ko: "정보올림피아드 입문 (C++ 기초)", en: "Computing Olympiad Fundamentals: C++ Basics" },
    type: "course", billing: "one_time", delivery: "digital", priceKRW: 297000
  },
  "problem-bank-monthly": {
    name: { ko: "문제은행 월 구독", en: "Monthly Problem Bank" },
    type: "subscription", billing: "monthly", delivery: "digital", priceKRW: 39000
  },
  "problem-bank-annual": {
    name: { ko: "문제은행 연 구독", en: "Annual Problem Bank" },
    type: "subscription", billing: "annual", delivery: "digital", priceKRW: 390000
  },
  "mock-exam-monthly": {
    name: { ko: "월간 모의고사", en: "Monthly Mock Exams" },
    type: "subscription", billing: "monthly", delivery: "digital", priceKRW: 49000
  },
  "koi-beginner-textbook": {
    name: { ko: "정보올림피아드 입문 교재", en: "Computing Olympiad Fundamentals Textbook" },
    type: "book", billing: "one_time", delivery: "physical", priceKRW: 28800
  },
  "algorithms-workbook-1": {
    name: { ko: "알고리즘 문제집 상권", en: "Algorithms Workbook, Volume 1" },
    type: "book", billing: "one_time", delivery: "physical", priceKRW: 31500
  },
  "koi-past-papers": {
    name: { ko: "KOI 기출·해설집 (2015-2025)", en: "KOI Past Papers & Solutions (2015–2025)" },
    type: "book", billing: "one_time", delivery: "physical", priceKRW: 37800
  },
  "algorithms-ebook-set": {
    name: { ko: "알고리즘 문제집 eBook 세트", en: "Algorithms Workbook eBook Set" },
    type: "book", billing: "one_time", delivery: "digital", priceKRW: 47600
  },
  "vacation-live-intensive": {
    name: { ko: "방학 집중 라이브특강 (4주)", en: "Vacation Live Intensive (4 Weeks)" },
    type: "live", billing: "one_time", delivery: "live", priceKRW: 281600
  },
  "koi-final-camp": {
    name: { ko: "KOI 직전 파이널 캠프", en: "KOI Final Camp" },
    type: "live", billing: "one_time", delivery: "in_person", priceKRW: 405000
  },
  "strategy-consulting": {
    name: { ko: "입시·대회 전략 컨설팅", en: "Admissions & Competition Strategy" },
    type: "consulting", billing: "one_time", delivery: "appointment", priceKRW: 250000
  },
  "ongoing-mentoring": {
    name: { ko: "1:1 정기 멘토링", en: "Ongoing 1:1 Mentoring" },
    type: "consulting", billing: "monthly", delivery: "appointment", priceKRW: 752000
  }
});

window.STARGATE_PRODUCT_ORDER = Object.freeze({
  courses: ["koi-advanced", "algorithms-bundle", "kmo-number-comb", "koi-cpp-beginner"],
  sub: ["problem-bank-monthly", "problem-bank-annual", "mock-exam-monthly"],
  books: ["koi-beginner-textbook", "algorithms-workbook-1", "koi-past-papers", "algorithms-ebook-set"],
  live: ["vacation-live-intensive", "koi-final-camp", "strategy-consulting", "ongoing-mentoring"]
});
