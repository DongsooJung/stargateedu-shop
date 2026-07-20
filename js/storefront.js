(function () {
  "use strict";
  var script = document.currentScript;
  var lang = script && script.dataset.lang === "en" ? "en" : "ko";
  var catalog = window.STARGATE_CATALOG || {};
  var order = window.STARGATE_PRODUCT_ORDER || {};
  var labels = {
    ko: { buy: "구매하기", subscribe: "구독하기", checkout: "결제 단계로 이동" },
    en: { buy: "Buy now", subscribe: "Subscribe", checkout: "Continue to checkout" }
  };
  var checkoutPath = lang === "en" ? "../checkout.html" : "./checkout.html";
  var style = document.createElement("style");
  style.textContent = ".product-buy{display:block;margin-top:14px;padding:10px 14px;border-radius:8px;background:#0B2A4A;color:#fff!important;text-align:center;font-size:13px;font-weight:800;transition:transform .15s,background .15s}.product-buy:hover{background:#123A63;transform:translateY(-1px)}.plan .product-buy{background:#C9A227;color:#3a2e00!important}.plan .product-buy:hover{background:#d7b536}";
  document.head.appendChild(style);

  function checkoutUrl(productId) {
    return checkoutPath + "?" + new URLSearchParams({ product: productId, lang: lang }).toString();
  }

  function wireSection(sectionId, productIds, selector) {
    document.querySelectorAll("#" + sectionId + " " + selector).forEach(function (node, index) {
      var productId = productIds[index];
      var product = catalog[productId];
      if (!product) return;
      var existing = node.querySelector("a.btn.gold");
      var button = existing || document.createElement("a");
      button.href = checkoutUrl(productId);
      button.dataset.product = productId;
      button.setAttribute("aria-label", labels[lang].checkout + ": " + product.name[lang]);
      if (!existing) {
        button.className = "product-buy";
        button.textContent = product.billing === "monthly" || product.billing === "annual" ? labels[lang].subscribe : labels[lang].buy;
        node.appendChild(button);
      } else {
        button.classList.add("product-buy");
      }
      button.addEventListener("click", function () {
        if (Array.isArray(window.dataLayer)) {
          window.dataLayer.push({ event: "begin_checkout", product_id: productId, product_name: product.name[lang], value: product.priceKRW, currency: "KRW" });
        }
      });
    });
  }

  wireSection("courses", order.courses || [], ".card .body");
  wireSection("sub", order.sub || [], ".plan");
  wireSection("books", order.books || [], ".card .body");
  wireSection("live", order.live || [], ".card .body");
})();
