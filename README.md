# Stargate Edu Shop

정보·수학 올림피아드(KOI·KMO) 전문 온라인 스쿨 랜딩페이지.

- 상태: 후속 스토어 준비 중
- 현재 `shop.stargateedu.co.kr` 운영 원본: [`DongsooJung/stargate-shop-redirect`](https://github.com/DongsooJung/stargate-shop-redirect)
- 이 저장소는 도메인과 GitHub Pages 설정을 명시적으로 이전하기 전까지 운영 원본이 아닙니다.
- 브랜드 컬러: 딥네이비 `#0B2A4A` / 골드 `#C9A227`

## 구조

- `index.html` — 한국어 메인 랜딩(히어로·베스트셀러·구독·교재·라이브·컨설팅)
- `en/index.html` — 전체 영문 랜딩 및 글로벌 상품 안내
- 한국어/영어 페이지 상단의 `KO`·`EN` 버튼으로 언어 전환
- 각 언어 페이지에 canonical·hreflang 다국어 SEO 적용
- `CNAME` — 향후 도메인 이전을 위한 설정 파일
- `404.html` — 오류 페이지

운영 원본과 이전 조건은 [SOURCE_OF_TRUTH.md](SOURCE_OF_TRUTH.md)를 참고하세요.
