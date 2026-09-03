/**
 * 전자상거래법 사업자 정보 푸터 렌더러.
 * <div id="bizFooter"></div> 가 있는 페이지에 자동으로 표기를 주입한다.
 * STARGATE_BUSINESS 의 빈 값은 렌더링하지 않는다(미기재 상태를 눈에 띄게 남긴다).
 */
(function () {
  "use strict";
  var mount = document.getElementById("bizFooter");
  if (!mount) return;

  var biz = window.STARGATE_BUSINESS || {};
  var en = new URLSearchParams(location.search).get("lang") === "en";
  var labels = en
    ? { companyName: "Company", ceoName: "Representative", bizRegNo: "Business registration no.", mailOrderNo: "Mail-order sales registration no.", address: "Address", phone: "Phone", email: "Email", privacyOfficer: "Privacy officer", hostingProvider: "Hosting" }
    : { companyName: "상호", ceoName: "대표자", bizRegNo: "사업자등록번호", mailOrderNo: "통신판매업신고번호", address: "주소", phone: "전화", email: "이메일", privacyOfficer: "개인정보 보호책임자", hostingProvider: "호스팅 제공자" };

  var order = ["companyName", "ceoName", "bizRegNo", "mailOrderNo", "address", "phone", "email", "privacyOfficer", "hostingProvider"];
  var parts = order
    .filter(function (key) { return typeof biz[key] === "string" && biz[key].trim(); })
    .map(function (key) {
      var span = document.createElement("span");
      span.textContent = labels[key] + " " + biz[key].trim();
      return span;
    });

  if (!parts.length) return;

  var wrap = document.createElement("div");
  wrap.className = "biz-info";
  wrap.setAttribute("role", "contentinfo");
  parts.forEach(function (span, index) {
    if (index) wrap.appendChild(document.createTextNode(" · "));
    wrap.appendChild(span);
  });

  var links = document.createElement("div");
  links.className = "biz-links";
  [
    { href: "./terms.html", ko: "이용약관", en: "Terms" },
    { href: "./privacy.html", ko: "개인정보처리방침", en: "Privacy" },
    { href: "https://stargateedu.co.kr/refund/", ko: "환불정책", en: "Refund policy" }
  ].forEach(function (item, index) {
    if (index) links.appendChild(document.createTextNode(" · "));
    var a = document.createElement("a");
    a.href = item.href;
    a.textContent = en ? item.en : item.ko;
    links.appendChild(a);
  });

  var style = document.createElement("style");
  style.textContent = ".biz-info{max-width:960px;margin:36px auto 0;padding:18px 20px 0;border-top:1px solid #E4E7EC;color:#667085;font-size:12px;line-height:1.9}.biz-links{max-width:960px;margin:6px auto 40px;padding:0 20px;font-size:12px}.biz-links a{color:#0B2A4A;font-weight:700}";

  mount.appendChild(style);
  mount.appendChild(wrap);
  mount.appendChild(links);
})();
