const {
  getProduct,
  kakaoPayRequest,
  parseJsonBody,
  sendJson,
  verifyCheckout
} = require("../_lib/kakaopay");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  try {
    const body = parseJsonBody(req);
    const pgToken = typeof body.pgToken === "string" ? body.pgToken : "";
    const checkout = verifyCheckout(body.checkoutToken);
    const product = getProduct(checkout.productId);

    if (!pgToken || !product || product.priceKRW !== checkout.amount) {
      return sendJson(res, 400, { error: "Invalid payment approval request" });
    }

    const approved = await kakaoPayRequest("approve", {
      cid: checkout.cid,
      tid: checkout.tid,
      partner_order_id: checkout.orderId,
      partner_user_id: checkout.userId,
      pg_token: pgToken
    });

    if (!approved.amount || approved.amount.total !== product.priceKRW) {
      console.error("KakaoPay amount mismatch", {
        orderId: checkout.orderId,
        expected: product.priceKRW,
        actual: approved.amount && approved.amount.total
      });
      return sendJson(res, 409, { error: "Payment amount mismatch" });
    }

    return sendJson(res, 200, {
      success: true,
      orderId: checkout.orderId,
      aid: approved.aid,
      tid: approved.tid,
      approvedAt: approved.approved_at,
      amount: approved.amount.total,
      paymentMethod: approved.payment_method_type,
      subscriptionId: approved.sid || null
    });
  } catch (error) {
    console.error("KakaoPay approve failed", {
      message: error.message,
      statusCode: error.statusCode,
      providerCode: error.providerCode
    });
    return sendJson(res, error.statusCode || 500, {
      error: "결제 승인에 실패했습니다.",
      code: error.providerCode || "PAYMENT_APPROVE_FAILED"
    });
  }
};
