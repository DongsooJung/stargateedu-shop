# Stargate Edu Shop

정보·수학 올림피아드(KOI·KMO) 전문 온라인 스쿨의 **향후 전환용 스토어 구현체**입니다.

- 현재 라이브 도메인: `shop.stargateedu.co.kr`
- 현재 라이브 원본: [`DongsooJung/stargate-shop-redirect`](https://github.com/DongsooJung/stargate-shop-redirect) (`main`, GitHub Pages)
- 이 저장소의 상태: GitHub Pages 비활성 · 커스텀 도메인 미연결 · 직접 배포 금지
- 브랜드 컬러: 딥네이비 `#0B2A4A` / 골드 `#C9A227`

## 구조

- `index.html` — 한국어 메인 랜딩(히어로·베스트셀러·구독·교재·라이브·컨설팅)
- `en/index.html` — 전체 영문 랜딩 및 글로벌 상품 안내
- 한국어/영어 페이지 상단의 `KO`·`EN` 버튼으로 언어 전환
- 각 언어 페이지에 canonical·hreflang 다국어 SEO 적용
- `CNAME` — 향후 커스텀 도메인 전환 시 사용할 설정
- `404.html` — 오류 페이지

## 운영 원칙

이 저장소의 변경은 `shop.stargateedu.co.kr`에 자동 반영되지 않습니다. 라이브 스토어의 긴급 수정은 현재 Pages 원본에서 처리하고, 이 구현체로의 전환은 Pages·도메인·결제 백엔드·운영 레지스트리를 함께 검증하는 명시적 마이그레이션으로만 수행합니다. 세부 기준은 [SOURCE_OF_TRUTH.md](SOURCE_OF_TRUTH.md)를 따릅니다.
