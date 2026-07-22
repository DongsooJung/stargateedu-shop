const crypto = require("node:crypto");

const KAKAOPAY_API_BASE = "https://open-api.kakaopay.com/online/v1/payment";

const CATALOG = Object.freeze({
  "koi-advanced": { name: "정보올림피아드 심화 (자료구조·알고리즘)", priceKRW: 429000, billing: "one_time" },
  "algorithms-bundle": { name: "알고리즘 종합 패키지 (입문+심화)", priceKRW: 690600, billing: "one_time" },
  "kmo-number-comb": { name: "KMO 대비 정수론·조합", priceKRW: 384000, billing: "one_time" },
  "koi-cpp-beginner": { name: "정보올림피아드 입문 (C++ 기초)", priceKRW: 297000, billing: "one_time" },
  "problem-bank-monthly": { name: "문제은행 월 구독", priceKRW: 39000, billing: "monthly" },
  "problem-bank-annual": { name: "문제은행 연 구독", priceKRW: 390000, billing: "annual" },
  "mock-exam-monthly": { name: "월간 모의고사", priceKRW: 49000, billing: "monthly" },
  "koi-beginner-textbook": { name: "정보올림피아드 입문 교재", priceKRW: 28800, billing: "one_time" },
  "algorithms-workbook-1": { name: "알고리즘 문제집 상권", priceKRW: 31500, billing: "one_time" },
  "koi-past-papers": { name: "KOI 기출·해설집 (2015-2025)", priceKRW: 37800, billing: "one_time" },
  "algorithms-ebook-set": { name: "알고리즘 문제집 eBook 세트", priceKRW: 47600, billing: "one_time" },
  "vacation-live-intensive": { name: "방학 집중 라이브특강 (4주)", priceKRW: 281600, billing: "one_time" },
  "koi-final-camp": { name: "KOI 직전 파이널 캠프", priceKRW: 405000, billing: "one_time" },
  "strategy-consulting": { name: "입시·대회 전략 컨설팅", priceKRW: 250000, billing: "one_time" },
  "ongoing-mentoring": { name: "1:1 정기 멘토링", priceKRW: 752000, billing: "monthly" }
});

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function signCheckout(payload) {
  const body = base64url(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", requiredEnv("CHECKOUT_SIGNING_SECRET"))
    .update(body)
    .digest("base64url");
  return `${body}.${signature}`;
}

function verifyCheckout(token) {
  if (typeof token !== "string" || !token.includes(".")) throw new Error("Invalid checkout token");
  const [body, signature] = token.split(".");
  const expected = crypto
    .createHmac("sha256", requiredEnv("CHECKOUT_SIGNING_SECRET"))
    .update(body)
    .digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) throw new Error("Invalid checkout signature");
  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  if (!payload.exp || Date.now() > payload.exp) throw new Error("Checkout session expired");
  return payload;
}

function getProduct(productId) {
  return CATALOG[productId] || null;
}

function createOrderId(productId) {
  const suffix = crypto.randomBytes(8).toString("hex");
  return `SG-${Date.now().toString(36)}-${productId.slice(0, 18)}-${suffix}`.slice(0, 100);
}

function getSiteOrigin(req) {
  const configured = process.env.SITE_ORIGIN;
  if (configured) return configured.replace(/\/$/, "");
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  if (!host) throw new Error("Unable to determine site origin");
  return `${proto}://${host}`;
}

async function kakaoPayRequest(path, payload) {
  const response = await fetch(`${KAKAOPAY_API_BASE}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `SECRET_KEY ${requiredEnv("KAKAOPAY_SECRET_KEY")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error_message || "KakaoPay request failed");
    error.statusCode = response.status;
    error.providerCode = data.error_code;
    throw error;
  }
  return data;
}

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(data));
}

function parseJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  return {};
}

module.exports = {
  createOrderId,
  getProduct,
  getSiteOrigin,
  kakaoPayRequest,
  parseJsonBody,
  requiredEnv,
  sendJson,
  signCheckout,
  verifyCheckout
};
