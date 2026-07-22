const {
  createOrderId,
  getProduct,
  getSiteOrigin,
  kakaoPayRequest,
  parseJsonBody,
  requiredEnv,
  sendJson,
  signCheckout
} = require("../_lib/kakaopay");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  try {
    const body = parseJsonBody(req);
    const productId = typeof body.productId === "string" ? body.productId : "";
    const lang = body.lang === "en" ? "en" : "ko";
    const product = getProduct(productId);
    if (!product) return sendJson(res, 400, { error: "Unknown product" });

    const cid = product.billing === "monthly" || product.billing === "annual"
      ? (process.env.KAKAOPAY_SUBSCRIPTION_CID || requiredEnv("KAKAOPAY_CID"))
      : requiredEnv("KAKAOPAY_CID");
    const orderId = createOrderId(productId);
    const userId = `guest-${orderId.slice(-16)}`;
    const origin = getSiteOrigin(req);
    const callback = `${origin}/checkout.html?product=${encodeURIComponent(productId)}&lang=${lang}`;

    const ready = await kakaoPayRequest("ready", {
      cid,
      partner_order_id: orderId,
      partner_user_id: userId,
      item_name: product.name,
      item_code: productId,
      quantity: 1,
      total_amount: product.priceKRW,
      tax_free_amount: 0,
      approval_url: `${callback}&payment=approve`,
      cancel_url: `${callback}&payment=cancel`,
      fail_url: `${callback}&payment=fail`
    });

    const checkoutToken = signCheckout({
      cid,
      tid: ready.tid,
      orderId,
      userId,
      productId,
      amount: product.priceKRW,
      exp: Date.now() + 15 * 60 * 1000
    });

    const ua = String(req.headers["user-agent"] || "");
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
    const redirectUrl = isMobile
      ? (ready.next_redirect_mobile_url || ready.next_redirect_pc_url)
      : ready.next_redirect_pc_url;

    return sendJson(res, 200, { redirectUrl, checkoutToken, orderId });
  } catch (error) {
    console.error("KakaoPay ready failed", {
      message: error.message,
      statusCode: error.statusCode,
      providerCode: error.providerCode
    });
    return sendJson(res, error.statusCode || 500, {
      error: "결제 준비에 실패했습니다.",
      code: error.providerCode || "PAYMENT_READY_FAILED"
    });
  }
};
