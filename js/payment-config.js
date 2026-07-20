/**
 * Public hosted-checkout configuration.
 * Add only provider-generated HTTPS checkout URLs.
 * Never place secret or API keys in this GitHub Pages repository.
 */
window.STARGATE_PAYMENT = Object.freeze({
  provider: "Global Payment",
  supportEmail: "ceo@stargateedu.co.kr",
  successUrl: "https://shop.stargateedu.co.kr/success.html",
  cancelUrl: "https://shop.stargateedu.co.kr/cancel.html",
  links: Object.freeze({
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
