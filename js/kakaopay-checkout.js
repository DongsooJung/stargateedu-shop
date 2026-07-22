(function () {
  "use strict";

  var params = new URLSearchParams(location.search);
  var lang = params.get("lang") === "en" ? "en" : "ko";
  var productId = params.get("product") || "";
  var paymentState = params.get("payment") || "";
  var pgToken = params.get("pg_token") || "";
  var catalog = window.STARGATE_CATALOG || {};
  var product = catalog[productId];
  var config = window.STARGATE_PAYMENT || {};
  var apiBase = String(config.apiBase || "").replace(/\/$/, "");
  var checkoutKey = "stargate:kakaopay:" + productId;

  var copy = {
    ko: {
      title: "주문 확인", lead: "상품과 금액을 확인한 후 카카오페이 결제를 진행합니다.", summary: "선택 상품",
      type: "상품 유형", delivery: "제공 방식", billing: "결제 주기", total: "총 결제금액",
      pay: "카카오페이로 결제하기", processing: "결제를 준비하고 있습니다…", approving: "결제를 승인하고 있습니다…",
      cancel: "결제가 취소되었습니다. 청구된 금액은 없습니다.", fail: "결제 인증에 실패했습니다. 다시 시도해 주세요.",
      genericError: "결제를 처리하지 못했습니다. 잠시 후 다시 시도하거나 고객센터로 문의해 주세요.",
      support: "결제·주문 문의", back: "← 쇼핑 계속하기",
      secure: "결제 정보는 카카오페이가 직접 처리하며 이 사이트에는 저장되지 않습니다.",
      note: "결제를 진행하면 이용약관과 환불정책에 동의한 것으로 간주됩니다. 실물 교재는 배송비·배송 가능 지역을 별도로 확인해 주세요.",
      productError: "선택한 상품을 찾을 수 없습니다.", sessionError: "결제 세션이 만료되었거나 현재 브라우저에서 찾을 수 없습니다. 다시 결제를 시작해 주세요.",
      types: { course: "온라인 강의", subscription: "구독", book: "교재", live: "라이브 과정", consulting: "컨설팅" },
      deliveries: { digital: "디지털 제공", physical: "실물 배송", live: "실시간 온라인", in_person: "오프라인", appointment: "예약제" },
      billings: { one_time: "1회 결제", monthly: "매월", annual: "매년" }
    },
    en: {
      title: "Review your order", lead: "Confirm your order and continue with KakaoPay.", summary: "Selected product",
      type: "Product type", delivery: "Delivery", billing: "Billing", total: "Total",
      pay: "Pay with KakaoPay", processing: "Preparing your payment…", approving: "Approving your payment…",
      cancel: "Payment was cancelled. You have not been charged.", fail: "Payment authentication failed. Please try again.",
      genericError: "We could not process the payment. Please try again or contact support.",
      support: "Payment & order support", back: "← Continue shopping",
      secure: "KakaoPay processes payment details directly. This site does not store them.",
      note: "By continuing, you agree to the Terms and Refund Policy. Shipping fees and destinations for printed books are confirmed separately.",
      productError: "The selected product could not be found.", sessionError: "The payment session expired or is unavailable in this browser. Please start again.",
      types: { course: "Online course", subscription: "Subscription", book: "Book", live: "Live program", consulting: "Consulting" },
      deliveries: { digital: "Digital access", physical: "Physical shipping", live: "Live online", in_person: "In person", appointment: "By appointment" },
      billings: { one_time: "One-time", monthly: "Monthly", annual: "Annual" }
    }
  }[lang];

  function el(id) { return document.getElementById(id); }
  function setStatus(message, kind) {
    var node = el("status");
    node.textContent = message;
    node.className = "status show " + (kind || "wait");
  }
  function cleanCallbackUrl() {
    var url = new URL(location.href);
    ["payment", "pg_token"].forEach(function (key) { url.searchParams.delete(key); });
    history.replaceState({}, "", url.pathname + "?" + url.searchParams.toString());
  }
  async function post(path, payload) {
    var response = await fetch(apiBase + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "same-origin"
    });
    var data = await response.json().catch(function () { return {}; });
    if (!response.ok) throw new Error(data.error || copy.genericError);
    return data;
  }
  function showPageError(message) {
    el("checkoutView").style.display = "none";
    el("pageError").style.display = "block";
    el("pageError").textContent = message;
  }

  document.documentElement.lang = lang;
  document.title = copy.title + " · Stargate Edu";
  el("title").textContent = copy.title;
  el("lead").textContent = copy.lead;
  el("summaryLabel").textContent = copy.summary;
  el("typeLabel").textContent = copy.type;
  el("deliveryLabel").textContent = copy.delivery;
  el("billingLabel").textContent = copy.billing;
  el("totalLabel").textContent = copy.total;
  el("payButton").textContent = copy.pay;
  el("supportLink").textContent = copy.support;
  el("backLink").textContent = copy.back;
  el("secureText").textContent = copy.secure;
  el("note").textContent = copy.note;

  var home = lang === "en" ? "./en/" : "./";
  el("homeLink").href = home;
  el("backLink").href = home;

  if (!product) {
    showPageError(copy.productError);
    return;
  }

  el("productName").textContent = product.name[lang];
  el("productType").textContent = copy.types[product.type] || product.type;
  el("delivery").textContent = copy.deliveries[product.delivery] || product.delivery;
  el("billing").textContent = copy.billings[product.billing] || product.billing;
  el("price").textContent = new Intl.NumberFormat(lang === "en" ? "en-US" : "ko-KR", {
    style: "currency", currency: "KRW", maximumFractionDigits: 0
  }).format(product.priceKRW);

  var subject = (lang === "en" ? "Order inquiry: " : "상품 주문 문의: ") + product.name[lang];
  el("supportLink").href = "mailto:" + encodeURIComponent(config.supportEmail || "ceo@stargateedu.co.kr") +
    "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent("Product ID: " + productId);

  el("payButton").addEventListener("click", async function () {
    var button = el("payButton");
    button.disabled = true;
    setStatus(copy.processing, "wait");
    try {
      var ready = await post("/api/kakaopay/ready", { productId: productId, lang: lang });
      sessionStorage.setItem(checkoutKey, ready.checkoutToken);
      location.assign(ready.redirectUrl);
    } catch (error) {
      button.disabled = false;
      setStatus(error.message || copy.genericError, "error");
    }
  });

  async function approvePayment() {
    var checkoutToken = sessionStorage.getItem(checkoutKey);
    if (!pgToken || !checkoutToken) {
      cleanCallbackUrl();
      setStatus(copy.sessionError, "error");
      return;
    }
    el("payButton").disabled = true;
    setStatus(copy.approving, "wait");
    try {
      var result = await post("/api/kakaopay/approve", { pgToken: pgToken, checkoutToken: checkoutToken });
      sessionStorage.removeItem(checkoutKey);
      location.replace("./success.html?lang=" + lang + "&order=" + encodeURIComponent(result.orderId));
    } catch (error) {
      cleanCallbackUrl();
      el("payButton").disabled = false;
      setStatus(error.message || copy.genericError, "error");
    }
  }

  if (paymentState === "approve") approvePayment();
  if (paymentState === "cancel") {
    sessionStorage.removeItem(checkoutKey);
    cleanCallbackUrl();
    setStatus(copy.cancel, "wait");
  }
  if (paymentState === "fail") {
    sessionStorage.removeItem(checkoutKey);
    cleanCallbackUrl();
    setStatus(copy.fail, "error");
  }
})();
