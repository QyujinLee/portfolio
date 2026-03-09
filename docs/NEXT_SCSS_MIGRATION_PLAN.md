# Portfolio Next.js 전환 계획서

## 1) 목적
- 기존 정적 사이트(`index.html`, `style.css`, `main.js`)를 Next.js 기반으로 전환한다.
- 스타일링은 SCSS Module을 기본으로 사용한다.
- 기존 UI/인터랙션을 유지하면서 유지보수성과 확장성을 높인다.

## 2) 현재 사이트 분석 요약
- 렌더링 구조: 단일 HTML 페이지에 모든 섹션이 고정 배치된 One-page 구조.
- 스타일 구조: 전역 CSS 1개 파일(`style.css`)에 전체 스타일이 집중.
- 동작 구조: DOM 직접 제어(`querySelector`, `addEventListener`) 방식의 스크립트(`main.js`).
- 섹션 구성: `home`, `about`, `skills`, `works`, `testimonials`, `contact`.
- 인터랙션:
  - 스크롤 시 네비게이션 배경 변경
  - 메뉴 클릭 스무스 스크롤
  - 모바일 메뉴 토글
  - 홈 영역 스크롤 투명도 변화
  - 위로가기 버튼 노출/이동
  - 프로젝트 카테고리 필터링
  - IntersectionObserver 기반 현재 섹션 메뉴 활성화

## 3) 주요 문제점 및 리스크
- 텍스트 인코딩 깨짐(한글 mojibake) 발생:
  - `index.html`, `main.js`, `README.md` 일부 문자열이 깨져 있음.
  - 전환 전에 원문 복구 또는 텍스트 재작성 필요.
- 클래스/ID 강결합:
  - JS 로직이 CSS 클래스명과 DOM 구조에 강하게 의존.
  - 컴포넌트 분리 시 동작 누락 위험.
- 전역 스타일 의존:
  - 현재는 CSS 변수와 타이포/요소 스타일이 전역으로 선언됨.
  - 모듈화 시 공통 스타일 경계 재설정 필요.
- 데이터 하드코딩:
  - 프로젝트/경력/추천사가 마크업에 직접 박혀 있어 변경 비용이 높음.

## 4) 목표 아키텍처 (Next.js + SCSS Module)
- 권장 스택:
  - Next.js(App Router, TypeScript)
  - SCSS Module(`*.module.scss`)
- 디렉토리 초안:
  - `src/app/page.tsx`
  - `src/app/layout.tsx`
  - `src/app/globals.scss`
  - `src/components/sections/*`
  - `src/components/common/*`
  - `src/styles/_variables.scss`
  - `src/data/portfolio.ts`
- 정적 자산:
  - 기존 `images/*`는 `public/images/*`로 이동.

## 5) 컴포넌트 분해 계획
- `Navbar`
  - 메뉴 클릭/활성 섹션 상태/모바일 토글 포함
- `HomeSection`
  - 프로필, 소개문구, Contact 버튼
- `AboutSection`
  - 자기소개, Major 카드, 경력(Job) 목록
- `SkillsSection`
  - 기술 스택/툴/기타
- `WorksSection`
  - 카테고리 필터 + 프로젝트 카드 목록
- `TestimonialsSection`
  - 추천사 카드 목록
- `ContactSection`
  - 이메일/외부 링크
- `ScrollTopButton`
  - 일정 스크롤 이후 노출

## 6) 상태/로직 이전 전략
- DOM 직접 조작 제거 후 React 상태 기반으로 전환:
  - `selectedSection`, `isNavbarDark`, `isMenuOpen`, `projectFilter`, `showScrollTop`.
- `useEffect`로 스크롤/휠/옵저버 구독 및 해제 처리.
- `scrollIntoView`는 `ref` 또는 `id` 기반으로 래핑 유틸 함수화.
- 프로젝트 필터는 배열 필터링 렌더링으로 대체.

## 7) SCSS Module 스타일링 전략
- 원칙:
  - 컴포넌트별 `*.module.scss`에 로컬 스타일 배치.
  - 공통 변수/믹스인은 `src/styles`로 분리.
  - 리셋/기본 타이포/루트 변수는 `globals.scss`에서 최소 유지.
- 예시 파일:
  - `Navbar.module.scss`
  - `HomeSection.module.scss`
  - `WorksSection.module.scss`
- 네이밍:
  - BEM 강제 대신 컴포넌트 스코프 내 의미 중심 네이밍 사용.
  - 상태 클래스는 `isOpen`, `isActive`, `isHidden` 형태로 통일.

## 8) 데이터 분리 계획
- 하드코딩 콘텐츠를 `src/data/portfolio.ts`로 분리:
  - 소개 문구
  - 경력 목록
  - 스킬/툴 목록
  - 프로젝트 목록(카테고리 포함)
  - 추천사 목록
- 장점:
  - 컴포넌트 단순화
  - 다국어/콘텐츠 교체 용이

## 9) 단계별 실행 계획
1. 프로젝트 부트스트랩
  - Next.js(TypeScript) 초기화
  - SCSS 설정 및 기본 구조 생성
2. 자산/콘텐츠 정리
  - `images` 이동
  - 깨진 한글 텍스트 복구
  - 데이터 파일 분리
3. 레이아웃/섹션 마이그레이션
  - 섹션별 컴포넌트와 SCSS Module 작성
  - 기존 UI 동일성 우선 확보
4. 인터랙션 이관
  - 스크롤/옵저버/필터/토글 로직 React화
5. 품질 점검
  - 반응형(모바일 768px 기준 포함)
  - 접근성(alt, button role, keyboard focus)
  - 기본 SEO(meta, title, og) 정리
6. 최종 정리
  - 사용되지 않는 스타일/코드 제거
  - README 업데이트

## 10) 검증 체크리스트
- 섹션 앵커 이동이 정상 동작하는가
- 현재 섹션 메뉴 active가 스크롤에 맞게 바뀌는가
- 모바일 메뉴 토글 및 닫힘 동작이 정상인가
- 프로젝트 필터가 애니메이션 포함 정상 동작하는가
- 위로가기 버튼 표시/숨김 및 이동이 정상인가
- 기존 대비 레이아웃/색상/타이포가 의도대로 유지되는가
- 깨진 한글 문자열이 모두 복구되었는가

## 11) 예상 일정(초안)
- Day 1: 초기 세팅 + 데이터/자산 정리 + 텍스트 복구
- Day 2: 섹션 컴포넌트/SCSS Module 마이그레이션
- Day 3: 인터랙션/검증/정리

## 12) 결정 필요 사항
- Next.js 버전 및 App Router 고정 여부
- TypeScript 사용 여부(권장: 사용)
- 기존 디자인 100% 유지 vs 부분 리디자인 범위
- 다국어(i18n) 도입 여부
