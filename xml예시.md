# 검도 자세 분석 코칭 솔루션 - UI/UX 상세 명세서 (XML 예시)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<kendoPostureAnalysisCoachingSolutionUiUxSpec
  documentType="UI/UX 상세 명세서"
  projectName="검도 자세 분석 코칭 솔루션"
  targetPlatform="PC (Windows)"
  createdDate="2026-02-02"
  lastModifiedDate="2026-02-02"
  version="1.0"
  language="ko-KR"
>
  <documentInfo>
    <projectName>검도 자세 분석 코칭 솔루션</projectName>
    <targetPlatform>PC (Windows)</targetPlatform>
    <createdDate>2026-02-02</createdDate>
    <version>1.0</version>
    <author>Antigravity AI</author>
    <lastModifiedDate>2026-02-02</lastModifiedDate>
  </documentInfo>

  <designConcept>
    <corePrinciples>
      <principle order="1" title="시각적 명확성">멀리서도 조작 가능한 큰 UI 요소</principle>
      <principle order="2" title="실시간 피드백">즉각적인 시각적 반응과 상태 표시</principle>
      <principle order="3" title="전문성">스포츠 코칭 도구로서의 신뢰감 있는 디자인</principle>
      <principle order="4" title="직관성">첫 사용자도 쉽게 이해할 수 있는 구조</principle>
    </corePrinciples>

    <designStyle>
      <style>Professional Sports Tech / Modern Dashboard</style>
      <mood>Clean, Focused, Precise</mood>
      <features>
        <feature>Dark theme 기반</feature>
        <feature>영상 콘텐츠에 집중</feature>
      </features>
    </designStyle>
  </designConcept>
  <designSystem>
    <colorPalette>
      <primaryColors>
        <description>메인 브랜드 색상 - 검도의 정신과 집중을 상징하는 진청색 계열</description>
        <variables>
          <variable name="--color-primary-900" value="#0a1929" note="Darkest - 배경" />
          <variable name="--color-primary-800" value="#0f2744" note="Dark - 서브 배경" />
          <variable name="--color-primary-700" value="#1e3a5f" note="Medium Dark - 카드 배경" />
          <variable name="--color-primary-600" value="#2d5a8e" note="Medium - 호버 상태" />
          <variable name="--color-primary-500" value="#3b7abd" note="Base - 주요 액센트" />
          <variable name="--color-primary-400" value="#5b9ce5" note="Light - 버튼, 링크" />
          <variable name="--color-primary-300" value="#8bbaef" note="Lighter - 활성 상태" />
          <variable name="--color-primary-200" value="#b5d5f5" note="Very Light - 서브 텍스트" />
          <variable name="--color-primary-100" value="#e3f2fd" note="Lightest - 배경 하이라이트" />
        </variables>
        <css><![CDATA[
/* 메인 브랜드 색상 - 검도의 정신과 집중을 상징하는 진청색 계열 */
--color-primary-900: #0a1929; /* Darkest - 배경 */
--color-primary-800: #0f2744; /* Dark - 서브 배경 */
--color-primary-700: #1e3a5f; /* Medium Dark - 카드 배경 */
--color-primary-600: #2d5a8e; /* Medium - 호버 상태 */
--color-primary-500: #3b7abd; /* Base - 주요 액센트 */
--color-primary-400: #5b9ce5; /* Light - 버튼, 링크 */
--color-primary-300: #8bbaef; /* Lighter - 활성 상태 */
--color-primary-200: #b5d5f5; /* Very Light - 서브 텍스트 */
--color-primary-100: #e3f2fd; /* Lightest - 배경 하이라이트 */
        ]]></css>
      </primaryColors>

      <accentColors>
        <description>실시간 피드백용 시각적 신호</description>
        <variables>
          <variable name="--color-success" value="#10b981" note="정확한 자세" />
          <variable name="--color-success-light" value="#34d399" />
          <variable name="--color-success-dark" value="#059669" />
          <variable name="--color-warning" value="#f59e0b" note="주의 필요" />
          <variable name="--color-warning-light" value="#fbbf24" />
          <variable name="--color-warning-dark" value="#d97706" />
          <variable name="--color-error" value="#ef4444" note="오차 큼" />
          <variable name="--color-error-light" value="#f87171" />
          <variable name="--color-error-dark" value="#dc2626" />
          <variable name="--color-info" value="#3b82f6" note="정보 표시" />
          <variable name="--color-info-light" value="#60a5fa" />
          <variable name="--color-info-dark" value="#2563eb" />
        </variables>
        <css><![CDATA[
/* 실시간 피드백용 시각적 신호 */
--color-success: #10b981; /* 정확한 자세 */
--color-success-light: #34d399;
--color-success-dark: #059669;

--color-warning: #f59e0b; /* 주의 필요 */
--color-warning-light: #fbbf24;
--color-warning-dark: #d97706;

--color-error: #ef4444; /* 오차 큼 */
--color-error-light: #f87171;
--color-error-dark: #dc2626;

--color-info: #3b82f6; /* 정보 표시 */
--color-info-light: #60a5fa;
--color-info-dark: #2563eb;
        ]]></css>
      </accentColors>

      <neutralColors>
        <description>텍스트 및 UI 요소</description>
        <variables>
          <variable name="--color-neutral-50" value="#f8fafc" note="흰색에 가까운" />
          <variable name="--color-neutral-100" value="#f1f5f9" />
          <variable name="--color-neutral-200" value="#e2e8f0" />
          <variable name="--color-neutral-300" value="#cbd5e1" />
          <variable name="--color-neutral-400" value="#94a3b8" note="비활성 텍스트" />
          <variable name="--color-neutral-500" value="#64748b" note="서브 텍스트" />
          <variable name="--color-neutral-600" value="#475569" note="본문 텍스트" />
          <variable name="--color-neutral-700" value="#334155" />
          <variable name="--color-neutral-800" value="#1e293b" note="진한 UI 요소" />
          <variable name="--color-neutral-900" value="#0f172a" note="가장 진한 텍스트" />
        </variables>
        <css><![CDATA[
/* 텍스트 및 UI 요소 */
--color-neutral-50: #f8fafc; /* 흰색에 가까운 */
--color-neutral-100: #f1f5f9;
--color-neutral-200: #e2e8f0;
--color-neutral-300: #cbd5e1;
--color-neutral-400: #94a3b8; /* 비활성 텍스트 */
--color-neutral-500: #64748b; /* 서브 텍스트 */
--color-neutral-600: #475569; /* 본문 텍스트 */
--color-neutral-700: #334155;
--color-neutral-800: #1e293b; /* 진한 UI 요소 */
--color-neutral-900: #0f172a; /* 가장 진한 텍스트 */
        ]]></css>
      </neutralColors>

      <overlayAndGlassEffects>
        <description>반투명 효과</description>
        <variables>
          <variable name="--overlay-dark" value="rgba(10, 25, 41, 0.85)" />
          <variable name="--overlay-medium" value="rgba(10, 25, 41, 0.6)" />
          <variable name="--overlay-light" value="rgba(10, 25, 41, 0.3)" />
          <variable name="--glass-background" value="rgba(30, 58, 95, 0.4)" />
          <variable name="--glass-border" value="rgba(255, 255, 255, 0.1)" />
        </variables>
        <css><![CDATA[
/* 반투명 효과 */
--overlay-dark: rgba(10, 25, 41, 0.85);
--overlay-medium: rgba(10, 25, 41, 0.6);
--overlay-light: rgba(10, 25, 41, 0.3);

--glass-background: rgba(30, 58, 95, 0.4);
--glass-border: rgba(255, 255, 255, 0.1);
        ]]></css>
      </overlayAndGlassEffects>

      <poseFeedbackColors>
        <description>AI 자세 분석 시각화 색상</description>
        <variables>
          <variable name="--pose-perfect" value="#10b981" note="0-5도 오차" />
          <variable name="--pose-good" value="#84cc16" note="5-10도 오차" />
          <variable name="--pose-fair" value="#f59e0b" note="10-15도 오차" />
          <variable name="--pose-poor" value="#ef4444" note="15도 이상 오차" />
          <variable name="--skeleton-reference" value="#3b82f6" note="기준 동작 스켈레톤" />
          <variable name="--skeleton-current" value="#10b981" note="현재 자세 스켈레톤" />
        </variables>
        <css><![CDATA[
/* AI 자세 분석 시각화 색상 */
--pose-perfect: #10b981; /* 0-5도 오차 */
--pose-good: #84cc16; /* 5-10도 오차 */
--pose-fair: #f59e0b; /* 10-15도 오차 */
--pose-poor: #ef4444; /* 15도 이상 오차 */

--skeleton-reference: #3b82f6; /* 기준 동작 스켈레톤 */
--skeleton-current: #10b981; /* 현재 자세 스켈레톤 */
        ]]></css>
      </poseFeedbackColors>
    </colorPalette>

    <typography>
      <fontFamilies>
        <fontFamily name="--font-primary"><![CDATA[
"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
sans-serif
        ]]></fontFamily>
        <fontFamily name="--font-display"><![CDATA[
"Montserrat", "Pretendard", sans-serif
        ]]></fontFamily>
        <fontFamily name="--font-mono"><![CDATA[
"JetBrains Mono", "Consolas", monospace
        ]]></fontFamily>
        <css><![CDATA[
/* 한글 + 영문 조합 */
--font-primary:
  "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
  sans-serif;
--font-display: "Montserrat", "Pretendard", sans-serif;
--font-mono: "JetBrains Mono", "Consolas", monospace;
        ]]></css>
      </fontFamilies>

      <fontScale>
        <description>Desktop용 크기 (PC 환경 최적화)</description>
        <variables>
          <variable name="--text-xs" value="0.875rem" note="14px - 보조 정보" />
          <variable name="--text-sm" value="1rem" note="16px - 서브 텍스트" />
          <variable name="--text-base" value="1.125rem" note="18px - 본문" />
          <variable name="--text-lg" value="1.25rem" note="20px - 강조 텍스트" />
          <variable name="--text-xl" value="1.5rem" note="24px - 섹션 제목" />
          <variable name="--text-2xl" value="1.875rem" note="30px - 카드 제목" />
          <variable name="--text-3xl" value="2.25rem" note="36px - 페이지 제목" />
          <variable name="--text-4xl" value="3rem" note="48px - 히어로 텍스트" />
          <variable name="--text-5xl" value="4rem" note="64px - 대형 숫자/통계" />
        </variables>
        <css><![CDATA[
/* Desktop용 크기 (PC 환경 최적화) */
--text-xs: 0.875rem; /* 14px - 보조 정보 */
--text-sm: 1rem; /* 16px - 서브 텍스트 */
--text-base: 1.125rem; /* 18px - 본문 */
--text-lg: 1.25rem; /* 20px - 강조 텍스트 */
--text-xl: 1.5rem; /* 24px - 섹션 제목 */
--text-2xl: 1.875rem; /* 30px - 카드 제목 */
--text-3xl: 2.25rem; /* 36px - 페이지 제목 */
--text-4xl: 3rem; /* 48px - 히어로 텍스트 */
--text-5xl: 4rem; /* 64px - 대형 숫자/통계 */
        ]]></css>
      </fontScale>

      <fontWeights>
        <variables>
          <variable name="--font-light" value="300" />
          <variable name="--font-regular" value="400" />
          <variable name="--font-medium" value="500" />
          <variable name="--font-semibold" value="600" />
          <variable name="--font-bold" value="700" />
          <variable name="--font-extrabold" value="800" />
        </variables>
        <css><![CDATA[
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
        ]]></css>
      </fontWeights>

      <lineHeights>
        <variables>
          <variable name="--leading-tight" value="1.2" note="제목용" />
          <variable name="--leading-normal" value="1.5" note="본문용" />
          <variable name="--leading-relaxed" value="1.75" note="긴 텍스트" />
        </variables>
        <css><![CDATA[
--leading-tight: 1.2; /* 제목용 */
--leading-normal: 1.5; /* 본문용 */
--leading-relaxed: 1.75; /* 긴 텍스트 */
        ]]></css>
      </lineHeights>
    </typography>

    <spacingSystem>
      <description>8px 기반 시스템</description>
      <variables>
        <variable name="--space-1" value="0.5rem" note="8px" />
        <variable name="--space-2" value="1rem" note="16px" />
        <variable name="--space-3" value="1.5rem" note="24px" />
        <variable name="--space-4" value="2rem" note="32px" />
        <variable name="--space-5" value="2.5rem" note="40px" />
        <variable name="--space-6" value="3rem" note="48px" />
        <variable name="--space-8" value="4rem" note="64px" />
        <variable name="--space-10" value="5rem" note="80px" />
        <variable name="--space-12" value="6rem" note="96px" />
      </variables>
      <css><![CDATA[
/* 8px 기반 시스템 */
--space-1: 0.5rem; /* 8px */
--space-2: 1rem; /* 16px */
--space-3: 1.5rem; /* 24px */
--space-4: 2rem; /* 32px */
--space-5: 2.5rem; /* 40px */
--space-6: 3rem; /* 48px */
--space-8: 4rem; /* 64px */
--space-10: 5rem; /* 80px */
--space-12: 6rem; /* 96px */
      ]]></css>
    </spacingSystem>

    <borderRadius>
      <variables>
        <variable name="--radius-sm" value="0.25rem" note="4px - 작은 요소" />
        <variable name="--radius-md" value="0.5rem" note="8px - 버튼, 입력창" />
        <variable name="--radius-lg" value="0.75rem" note="12px - 카드" />
        <variable name="--radius-xl" value="1rem" note="16px - 대형 카드" />
        <variable name="--radius-2xl" value="1.5rem" note="24px - 모달" />
        <variable name="--radius-full" value="9999px" note="원형" />
      </variables>
      <css><![CDATA[
--radius-sm: 0.25rem; /* 4px - 작은 요소 */
--radius-md: 0.5rem; /* 8px - 버튼, 입력창 */
--radius-lg: 0.75rem; /* 12px - 카드 */
--radius-xl: 1rem; /* 16px - 대형 카드 */
--radius-2xl: 1.5rem; /* 24px - 모달 */
--radius-full: 9999px; /* 원형 */
      ]]></css>
    </borderRadius>

    <shadows>
      <depthShadows>
        <variables>
          <variable name="--shadow-sm" value="0 1px 2px 0 rgba(0, 0, 0, 0.05)" />
          <variable name="--shadow-md" value="0 4px 6px -1px rgba(0, 0, 0, 0.1)" />
          <variable name="--shadow-lg" value="0 10px 15px -3px rgba(0, 0, 0, 0.2)" />
          <variable name="--shadow-xl" value="0 20px 25px -5px rgba(0, 0, 0, 0.3)" />
          <variable name="--shadow-2xl" value="0 25px 50px -12px rgba(0, 0, 0, 0.4)" />
        </variables>
      </depthShadows>

      <specialEffects>
        <variables>
          <variable name="--shadow-glow-primary" value="0 0 20px rgba(59, 122, 189, 0.5)" />
          <variable name="--shadow-glow-success" value="0 0 20px rgba(16, 185, 129, 0.5)" />
          <variable name="--shadow-glow-error" value="0 0 20px rgba(239, 68, 68, 0.5)" />
        </variables>
      </specialEffects>

      <css><![CDATA[
/* 깊이감 표현 */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.4);

/* 특수효과 */
--shadow-glow-primary: 0 0 20px rgba(59, 122, 189, 0.5);
--shadow-glow-success: 0 0 20px rgba(16, 185, 129, 0.5);
--shadow-glow-error: 0 0 20px rgba(239, 68, 68, 0.5);
      ]]></css>
    </shadows>

    <zIndexLayering>
      <variables>
        <variable name="--z-base" value="0" note="기본 레이어" />
        <variable name="--z-dropdown" value="10" note="드롭다운 메뉴" />
        <variable name="--z-overlay" value="20" note="오버레이 배경" />
        <variable name="--z-modal" value="30" note="모달 다이얼로그" />
        <variable name="--z-toast" value="40" note="알림 토스트" />
        <variable name="--z-tooltip" value="50" note="툴팁" />
      </variables>
      <css><![CDATA[
--z-base: 0; /* 기본 레이어 */
--z-dropdown: 10; /* 드롭다운 메뉴 */
--z-overlay: 20; /* 오버레이 배경 */
--z-modal: 30; /* 모달 다이얼로그 */
--z-toast: 40; /* 알림 토스트 */
--z-tooltip: 50; /* 툴팁 */
      ]]></css>
    </zIndexLayering>
  </designSystem>
  <layoutStructure>
    <mainLayout>
      <screenSpec width="1920" height="1080" unit="px" />
      <compositionDiagram><![CDATA[
┌─────────────────────────────────────────────────┐
│ 헤더 (Header) - 80px                            │
├──────────┬──────────────────────────┬───────────┤
│          │                          │           │
│ 사이드바 │    메인 콘텐츠 영역       │  컨트롤   │
│  (240px) │       (가변)             │  패널     │
│          │                          │  (320px)  │
│          │                          │           │
└──────────┴──────────────────────────┴───────────┘
      ]]></compositionDiagram>
      <layoutCss><![CDATA[
.main-layout {
  display: grid;
  grid-template-columns: 240px 1fr 320px;
  grid-template-rows: 80px 1fr;
  height: 100vh;
  background: var(--color-primary-900);
}

.header {
  grid-column: 1 / -1;
  height: 80px;
  padding: 0 var(--space-6);
}

.sidebar {
  width: 240px;
  padding: var(--space-4);
  background: var(--color-primary-800);
  border-right: 1px solid var(--glass-border);
}

.main-content {
  flex: 1;
  padding: var(--space-6);
  overflow: auto;
}

.control-panel {
  width: 320px;
  padding: var(--space-4);
  background: var(--color-primary-800);
  border-left: 1px solid var(--glass-border);
}
      ]]></layoutCss>
    </mainLayout>

    <videoComparisonLayout>
      <splitView>
        <horizontalSplitMode>
          <diagram><![CDATA[
┌────────────────────┬────────────────────┐
│                    │                    │
│  기준 영상         │   수련생 웹캠      │
│  (Reference)       │   (Live)           │
│  50%              │   50%              │
│                    │                    │
└────────────────────┴────────────────────┘
          ]]></diagram>
          <css><![CDATA[
.split-view-horizontal {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  height: calc(100vh - 80px - var(--space-6) * 2);
}

.video-panel {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-primary-700);
  box-shadow: var(--shadow-xl);
}
          ]]></css>
        </horizontalSplitMode>

        <overlayMode>
          <diagram><![CDATA[
┌────────────────────────────────┐
│                                │
│  웹캠 영상 + 기준 동작 오버레이 │
│  (두 영상이 겹쳐져 표시)        │
│                                │
└────────────────────────────────┘
          ]]></diagram>
          <css><![CDATA[
.overlay-view {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-layer.reference {
  opacity: 0.4;
  mix-blend-mode: screen;
}

.video-layer.live {
  opacity: 1;
}
          ]]></css>
        </overlayMode>
      </splitView>
    </videoComparisonLayout>
  </layoutStructure>

  <componentSpecifications>
    <buttons>
      <primaryButton>
        <css><![CDATA[
.btn-primary {
  /* 크기 */
  min-height: 56px;
  min-width: 160px;
  padding: var(--space-3) var(--space-5);

  /* 스타일 */
  background: var(--color-primary-500);
  color: white;
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-md);
  border: none;

  /* 효과 */
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-primary:hover {
  background: var(--color-primary-400);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.btn-primary:disabled {
  background: var(--color-neutral-600);
  cursor: not-allowed;
  opacity: 0.5;
}
        ]]></css>
      </primaryButton>

      <secondaryButton>
        <css><![CDATA[
.btn-secondary {
  min-height: 56px;
  min-width: 160px;
  padding: var(--space-3) var(--space-5);

  background: transparent;
  color: var(--color-primary-400);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-md);
  border: 2px solid var(--color-primary-400);

  cursor: pointer;
  transition: all 200ms ease;
}

.btn-secondary:hover {
  background: var(--color-primary-400);
  color: white;
}
        ]]></css>
      </secondaryButton>

      <iconButton>
        <note>재생, 일시정지 등</note>
        <css><![CDATA[
.btn-icon {
  /* 크기 - 터치 타겟 최소 44x44px 준수 */
  width: 64px;
  height: 64px;
  padding: 0;

  /* 스타일 */
  background: var(--glass-background);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);

  /* 아이콘 */
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all 200ms ease;
}

.btn-icon svg {
  width: 32px;
  height: 32px;
  color: white;
}

.btn-icon:hover {
  background: var(--color-primary-500);
  box-shadow: var(--shadow-glow-primary);
}
        ]]></css>
      </iconButton>

      <sizeVariants>
        <css><![CDATA[
/* Large - 메인 액션 */
.btn-lg {
  min-height: 64px;
  min-width: 200px;
  font-size: var(--text-xl);
  padding: var(--space-4) var(--space-6);
}

/* Medium - 기본 */
.btn-md {
  min-height: 56px;
  min-width: 160px;
  font-size: var(--text-lg);
}

/* Small - 보조 액션 */
.btn-sm {
  min-height: 44px;
  min-width: 120px;
  font-size: var(--text-base);
  padding: var(--space-2) var(--space-4);
}
        ]]></css>
      </sizeVariants>
    </buttons>

    <cards>
      <basicCard>
        <css><![CDATA[
.card {
  background: var(--color-primary-700);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  box-shadow: var(--shadow-lg);
  transition: all 200ms ease;
}

.card:hover {
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary-500);
}

.card-header {
  margin-bottom: var(--space-4);
}

.card-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: white;
  margin-bottom: var(--space-2);
}

.card-description {
  font-size: var(--text-base);
  color: var(--color-neutral-400);
}

.card-body {
  color: var(--color-neutral-200);
}

.card-footer {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--glass-border);
}
        ]]></css>
      </basicCard>

      <statsCard>
        <css><![CDATA[
.stats-card {
  background: linear-gradient(
    135deg,
    var(--color-primary-700),
    var(--color-primary-800)
  );
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  text-align: center;
}

.stats-value {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-300);
  font-family: var(--font-display);
  line-height: var(--leading-tight);
}

.stats-label {
  font-size: var(--text-base);
  color: var(--color-neutral-400);
  margin-top: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stats-badge {
  display: inline-block;
  margin-top: var(--space-3);
  padding: var(--space-1) var(--space-3);
  background: var(--color-success);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
}
        ]]></css>
      </statsCard>
    </cards>

    <formControls>
      <textInput>
        <css><![CDATA[
.input-text {
  /* 크기 */
  width: 100%;
  min-height: 56px;
  padding: var(--space-3) var(--space-4);

  /* 스타일 */
  background: var(--color-primary-800);
  border: 2px solid var(--glass-border);
  border-radius: var(--radius-md);

  /* 텍스트 */
  font-size: var(--text-lg);
  color: white;
  font-family: var(--font-primary);

  transition: all 200ms ease;
}

.input-text::placeholder {
  color: var(--color-neutral-500);
}

.input-text:focus {
  outline: none;
  border-color: var(--color-primary-400);
  box-shadow: 0 0 0 3px rgba(59, 122, 189, 0.2);
}

.input-text:disabled {
  background: var(--color-neutral-800);
  color: var(--color-neutral-500);
  cursor: not-allowed;
}
        ]]></css>
      </textInput>

      <slider>
        <css><![CDATA[
.slider-container {
  width: 100%;
  padding: var(--space-4) 0;
}

.slider-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-2);
  font-size: var(--text-base);
  color: var(--color-neutral-300);
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: var(--color-primary-800);
  border-radius: var(--radius-full);
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  background: var(--color-primary-400);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
}

.slider::-webkit-slider-thumb:hover {
  background: var(--color-primary-300);
  box-shadow: var(--shadow-glow-primary);
  transform: scale(1.1);
}
        ]]></css>
      </slider>

      <toggleSwitch>
        <css><![CDATA[
.toggle-container {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.toggle {
  position: relative;
  width: 64px;
  height: 32px;
  background: var(--color-neutral-700);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background 200ms ease;
}

.toggle.active {
  background: var(--color-primary-500);
}

.toggle-thumb {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: transform 200ms ease;
  box-shadow: var(--shadow-sm);
}

.toggle.active .toggle-thumb {
  transform: translateX(32px);
}

.toggle-label {
  font-size: var(--text-lg);
  color: white;
  font-weight: var(--font-medium);
}
        ]]></css>
      </toggleSwitch>

      <dropdownSelect>
        <css><![CDATA[
.select-container {
  position: relative;
  width: 100%;
}

.select {
  width: 100%;
  min-height: 56px;
  padding: var(--space-3) var(--space-4);
  padding-right: var(--space-10);

  background: var(--color-primary-800);
  border: 2px solid var(--glass-border);
  border-radius: var(--radius-md);

  font-size: var(--text-lg);
  color: white;
  font-family: var(--font-primary);

  cursor: pointer;
  appearance: none;
  transition: all 200ms ease;
}

.select:focus {
  outline: none;
  border-color: var(--color-primary-400);
  box-shadow: 0 0 0 3px rgba(59, 122, 189, 0.2);
}

.select-icon {
  position: absolute;
  right: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-neutral-400);
}
        ]]></css>
      </dropdownSelect>
    </formControls>

    <modal>
      <css><![CDATA[
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--overlay-dark);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  animation: fadeIn 200ms ease;
}

.modal {
  background: var(--color-primary-700);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);

  /* 크기 */
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow: auto;

  animation: scaleIn 200ms ease;
}

.modal-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: white;
}

.modal-close {
  width: 48px;
  height: 48px;
  border: none;
  background: transparent;
  color: var(--color-neutral-400);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all 200ms ease;
}

.modal-close:hover {
  background: var(--color-primary-600);
  color: white;
}

.modal-body {
  padding: var(--space-6);
}

.modal-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--glass-border);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
      ]]></css>
    </modal>

    <videoController>
      <css><![CDATA[
.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, var(--overlay-dark), transparent);
  padding: var(--space-5);
  opacity: 0;
  transition: opacity 200ms ease;
}

.video-panel:hover .video-controls {
  opacity: 1;
}

.controls-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.playback-button {
  width: 56px;
  height: 56px;
  background: white;
  border: none;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
}

.playback-button:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-lg);
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--color-neutral-700);
  border-radius: var(--radius-full);
  position: relative;
  cursor: pointer;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary-400);
  border-radius: var(--radius-full);
  transition: width 100ms linear;
}

.time-display {
  font-size: var(--text-lg);
  font-family: var(--font-mono);
  color: white;
  font-weight: var(--font-medium);
  min-width: 120px;
  text-align: right;
}
      ]]></css>
    </videoController>

    <toast>
      <css><![CDATA[
.toast-container {
  position: fixed;
  top: var(--space-6);
  right: var(--space-6);
  z-index: var(--z-toast);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.toast {
  min-width: 320px;
  padding: var(--space-4) var(--space-5);
  background: var(--color-primary-700);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);

  display: flex;
  align-items: center;
  gap: var(--space-3);

  animation: slideInRight 300ms ease;
}

.toast-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: white;
  margin-bottom: var(--space-1);
}

.toast-message {
  font-size: var(--text-base);
  color: var(--color-neutral-300);
}

/* 타입별 스타일 */
.toast.success {
  border-left: 4px solid var(--color-success);
}

.toast.error {
  border-left: 4px solid var(--color-error);
}

.toast.warning {
  border-left: 4px solid var(--color-warning);
}

.toast.info {
  border-left: 4px solid var(--color-info);
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
      ]]></css>
    </toast>
  </componentSpecifications>

  <aiPoseVisualization>
    <skeletonRendering>
      <css><![CDATA[
.skeleton-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* 관절 포인트 */
.joint {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

/* 뼈대 선 */
.bone {
  stroke-width: 3px;
  stroke-linecap: round;
}

.bone.reference {
  stroke: var(--skeleton-reference);
  opacity: 0.6;
}

.bone.current {
  stroke: var(--skeleton-current);
  opacity: 1;
}

/* 각도 오차 표시 */
.angle-indicator {
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  font-weight: var(--font-bold);
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
}

.angle-indicator.perfect {
  fill: var(--pose-perfect);
}

.angle-indicator.good {
  fill: var(--pose-good);
}

.angle-indicator.fair {
  fill: var(--pose-fair);
}

.angle-indicator.poor {
  fill: var(--pose-poor);
}
      ]]></css>
    </skeletonRendering>

    <feedbackOverlay>
      <css><![CDATA[
.feedback-overlay {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  right: var(--space-4);
  display: flex;
  gap: var(--space-3);
  pointer-events: none;
}

.feedback-badge {
  padding: var(--space-2) var(--space-4);
  background: var(--glass-background);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);

  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.feedback-badge-icon {
  width: 24px;
  height: 24px;
}

.feedback-badge-text {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: white;
}

.feedback-badge.success {
  border-color: var(--color-success);
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
}

.feedback-badge.warning {
  border-color: var(--color-warning);
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.3);
}

.feedback-badge.error {
  border-color: var(--color-error);
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.3);
}
      ]]></css>
    </feedbackOverlay>

    <guideArrows>
      <css><![CDATA[
.guide-arrow {
  position: absolute;
  width: 60px;
  height: 60px;
  animation: pulse 1s ease infinite;
}

.guide-arrow svg {
  filter: drop-shadow(0 0 8px currentColor);
}

.guide-arrow.up {
  color: var(--color-info);
}

.guide-arrow.down {
  color: var(--color-warning);
  transform: rotate(180deg);
}

.guide-arrow.left {
  color: var(--color-error);
  transform: rotate(-90deg);
}

.guide-arrow.right {
  color: var(--color-success);
  transform: rotate(90deg);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}
      ]]></css>
    </guideArrows>
  </aiPoseVisualization>

  <analysisReportUi>
    <accuracyChart>
      <css><![CDATA[
.accuracy-chart {
  background: var(--color-primary-700);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.chart-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: white;
}

.chart-legend {
  display: flex;
  gap: var(--space-4);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-sm);
}

.legend-label {
  font-size: var(--text-base);
  color: var(--color-neutral-300);
}

.chart-body {
  height: 300px;
  position: relative;
}
      ]]></css>
    </accuracyChart>

    <progressRing>
      <css><![CDATA[
.progress-ring {
  width: 200px;
  height: 200px;
  position: relative;
  margin: 0 auto;
}

.progress-ring-circle {
  fill: none;
  stroke-width: 12;
  stroke-linecap: round;
}

.progress-ring-background {
  stroke: var(--color-primary-800);
}

.progress-ring-fill {
  stroke: var(--color-primary-400);
  stroke-dasharray: 0 100;
  transition: stroke-dasharray 600ms ease;
}

.progress-ring-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-value {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-300);
  font-family: var(--font-display);
}

.progress-label {
  font-size: var(--text-base);
  color: var(--color-neutral-400);
  margin-top: var(--space-1);
}
      ]]></css>
    </progressRing>
  </analysisReportUi>

  <interactionAndAnimation>
    <transitions>
      <css><![CDATA[
/* 기본 트랜지션 */
.transition-base {
  transition: all 200ms ease;
}

/* 색상 트랜지션 */
.transition-colors {
  transition:
    background-color 200ms ease,
    color 200ms ease;
}

/* 변형 트랜지션 */
.transition-transform {
  transition: transform 200ms ease;
}
      ]]></css>
    </transitions>

    <hoverEffects>
      <css><![CDATA[
/* 카드 호버 */
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-2xl);
}

/* 버튼 호버 */
.btn-hover:hover {
  transform: scale(1.05);
}

/* 링크 호버 */
.link-hover:hover {
  color: var(--color-primary-300);
  text-decoration: underline;
}
      ]]></css>
    </hoverEffects>

    <loadingStates>
      <css><![CDATA[
.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-primary-800);
  border-top-color: var(--color-primary-400);
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.skeleton-loader {
  background: linear-gradient(
    90deg,
    var(--color-primary-800) 25%,
    var(--color-primary-700) 50%,
    var(--color-primary-800) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
      ]]></css>
    </loadingStates>
  </interactionAndAnimation>

  <responsiveSupport enabled="optional">
    <breakpoints>
      <css><![CDATA[
/* Desktop First - 기본은 대형 화면 */
--breakpoint-xl: 1920px; /* 풀HD */
--breakpoint-lg: 1440px; /* 노트북 */
--breakpoint-md: 1024px; /* 태블릿 가로 */
      ]]></css>
    </breakpoints>

    <mediaQueries>
      <css><![CDATA[
/* 노트북 (1440px 이하) */
@media (max-width: 1440px) {
  .main-layout {
    grid-template-columns: 200px 1fr 280px;
  }

  .control-panel {
    width: 280px;
  }
}

/* 태블릿 가로 (1024px 이하) */
@media (max-width: 1024px) {
  .main-layout {
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr;
  }

  .sidebar,
  .control-panel {
    position: fixed;
    z-index: var(--z-dropdown);
    transform: translateX(-100%);
    transition: transform 300ms ease;
  }

  .sidebar.open,
  .control-panel.open {
    transform: translateX(0);
  }
}
      ]]></css>
    </mediaQueries>
  </responsiveSupport>

  <accessibility>
    <colorContrast>
      <requirement>최소 대비율: WCAG AA 기준 4.5:1 이상</requirement>
      <requirement>큰 텍스트: 3:1 이상 (18px bold 또는 24px 이상)</requirement>
    </colorContrast>

    <keyboardNavigation>
      <css><![CDATA[
/* 포커스 스타일 */
*:focus-visible {
  outline: 3px solid var(--color-primary-400);
  outline-offset: 2px;
}

/* 포커스 순서 */
.focusable {
  -webkit-user-select: none;
  user-select: none;
}
      ]]></css>
    </keyboardNavigation>

    <ariaLabels>
      <html><![CDATA[
<!-- 버튼 -->
<button aria-label="재생">
  <svg>...</svg>
</button>

<!-- 입력 -->
<input type="text" aria-label="검색어 입력" aria-describedby="search-hint" />

<!-- 상태 표시 -->
<div role="status" aria-live="polite" aria-atomic="true">자세 정확도: 85%</div>
      ]]></html>
    </ariaLabels>
  </accessibility>

  <performanceOptimization>
    <imageAndVideo>
      <css><![CDATA[
/* 웹캠 스트림 최적화 */
.webcam-video {
  will-change: transform;
  transform: translateZ(0);
}

/* 하드웨어 가속 */
.gpu-accelerated {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
      ]]></css>
    </imageAndVideo>

    <animationOptimization>
      <css><![CDATA[
/* 리플로우 방지 - transform/opacity만 사용 */
.optimized-animation {
  transform: translateX(0);
  opacity: 1;
  transition:
    transform 200ms ease,
    opacity 200ms ease;
}

/* 애니메이션 감소 설정 존중 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
      ]]></css>
    </animationOptimization>
  </performanceOptimization>

  <implementationChecklist>
    <phase id="1" name="기본 UI 구조">
      <task status="todo">메인 레이아웃 (헤더, 사이드바, 콘텐츠, 컨트롤 패널)</task>
      <task status="todo">영상 Split View</task>
      <task status="todo">기본 버튼 컴포넌트</task>
      <task status="todo">카드 컴포넌트</task>
      <task status="todo">모달 컴포넌트</task>
    </phase>

    <phase id="2" name="비디오 기능">
      <task status="todo">웹캠 스트림 연동</task>
      <task status="todo">비디오 컨트롤러 (재생/일시정지/슬로우모션)</task>
      <task status="todo">프레임 단위 이동</task>
      <task status="todo">구간 반복 재생</task>
    </phase>

    <phase id="3" name="AI 포즈 분석">
      <task status="todo">MediaPipe 연동</task>
      <task status="todo">스켈레톤 렌더링</task>
      <task status="todo">각도 계산 및 표시</task>
      <task status="todo">피드백 오버레이</task>
      <task status="todo">가이드 화살표</task>
    </phase>

    <phase id="4" name="코칭 도구">
      <task status="todo">드로잉 기능 (선, 도형)</task>
      <task status="todo">분석 리포트 생성</task>
      <task status="todo">정확도 차트</task>
      <task status="todo">진행 상황 추적</task>
    </phase>

    <phase id="5" name="최적화">
      <task status="todo">성능 프로파일링</task>
      <task status="todo">접근성 검증</task>
      <task status="todo">반응형 테스트</task>
      <task status="todo">크로스 브라우저 테스트</task>
    </phase>
  </implementationChecklist>

  <references>
    <designTools>
      <tool>Figma: 프로토타이핑</tool>
      <tool>Adobe XD: 와이어프레임</tool>
    </designTools>

    <frontendFrameworks>
      <framework recommended="true">React 18+ (Hooks, Suspense)</framework>
      <framework>Vite: 빌드 도구</framework>
      <framework>Tailwind CSS: 유틸리티 CSS</framework>
    </frontendFrameworks>

    <aiMlLibraries>
      <library>MediaPipe (Google): 포즈 추정</library>
      <library>TensorFlow.js: 커스텀 모델</library>
      <library>Canvas API / WebGL: 스켈레톤 렌더링</library>
    </aiMlLibraries>

    <videoProcessing>
      <library>WebRTC: 웹캠 접근</library>
      <library>Video.js: 비디오 플레이어</library>
      <library>FFmpeg.wasm: 비디오 편집 (옵션)</library>
    </videoProcessing>
  </references>

  <corePrinciplesSummary>
    <item order="1" title="가독성">멀리서도 보이는 큰 폰트와 버튼</item>
    <item order="2" title="대비">어두운 테마에서 명확한 색상 구분</item>
    <item order="3" title="피드백">모든 인터랙션에 즉각적인 시각적 반응</item>
    <item order="4" title="일관성">모든 페이지에서 동일한 디자인 언어 사용</item>
    <item order="5" title="성능">60fps 유지, 실시간 처리 최우선</item>
    <item order="6" title="접근성">WCAG 2.1 AA 준수</item>
  </corePrinciplesSummary>
</kendoPostureAnalysisCoachingSolutionUiUxSpec>
```
