# TossPayments E2E setup

The KOI eBook checkout is wired as:

`checkout.html` → TossPayments V2 payment window → `success.html` → Supabase Edge Function `toss-confirm` → Toss Payments `/v1/payments/confirm`

## Security model

- `tossClientKey` is a browser-exposed client identifier and may be stored in `js/payment-config.js`.
- `TOSS_SECRET_KEY` must **never** be committed to GitHub or returned to the browser.
- The Supabase Edge Function validates the KOI product amount server-side as **KRW 30,000** before calling Toss confirmation.
- Client and secret keys must be the matching pair and must both be test keys or both be live keys.

## Remaining configuration

1. TossPayments Developer Center → API Keys.
2. Copy the Standard Payment Window client key (`test_ck_*` for test or `live_ck_*` for live).
3. Set `tossClientKey` in `js/payment-config.js`.
4. In Supabase project `STARGATE8224's Project`, add Edge Function secret:
   - Name: `TOSS_SECRET_KEY`
   - Value: matching `test_sk_*` or `live_sk_*`
5. Open:
   - `https://shop.stargateedu.co.kr/checkout.html?product=koi-algorithms-guide`
6. Run one test payment first. Test keys do not create a real charge.
7. Verify:
   - payment window opens
   - redirect contains `paymentKey`, `orderId`, `amount`
   - `success.html` calls the Edge Function
   - server validates amount = 30000
   - Toss confirmation returns `status: DONE`
   - success page displays order ID, SKU `SGE-EBOOK-KOI-25`, amount, and status

## Production gate

Do not switch to live keys until the full test-key flow succeeds. When moving live, change the client key and Edge Function secret as a matching pair.
