import React, { useState } from "react";

// 디자인 토큰 (앱 본체와 통일)
const ACCENT = "#c2410c";          // 테라코타 포인트
const ACCENT_SOFT = "#fdf0e9";     // 연한 테라코타 배경
const INK = "#1c1917";             // 짙은 잉크(다크 히어로 배경)
const PAPER = "#f4f2ee";           // 종이색 배경
const fontUI = "'IBM Plex Sans', system-ui, sans-serif";
const fontMono = "'IBM Plex Mono', monospace";
const fontSerif = "'Newsreader', Georgia, serif";

// ─────────────────────────────────────────────────────────────
// 랜딩 페이지
// ─────────────────────────────────────────────────────────────
function Landing({ onStart }) {
  const stats = [
    { num: "5종", label: "지원 실험" },
    { num: "6개", label: "보고서 섹션" },
    { num: "~30초", label: "생성 시간" },
    { num: "무료", label: "팀프로젝트용" },
  ];
  const steps = [
    { no: "01", icon: "◎", title: "실험 선택", desc: "인장·경도·진동·유체·전기회로 5가지 실험 중 작성할 실험을 선택합니다." },
    { no: "02", icon: "▤", title: "데이터 입력", desc: "측정한 값, 사진, 느낀 점을 입력 양식에 맞게 작성합니다." },
    { no: "03", icon: "⚡", title: "AI 보고서 생성", desc: "AI가 6개 섹션의 보고서 초안을 자동으로 작성합니다. 검토 후 제출!" },
  ];

  return (
    <div style={{ fontFamily: fontUI, background: PAPER }} className="min-h-screen w-full text-stone-900">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap');`}</style>

      {/* 상단 네비 */}
      <nav style={{ background: INK }} className="w-full">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button onClick={onStart} className="flex items-center gap-2.5">
            <span style={{ background: ACCENT }} className="grid h-8 w-8 place-items-center rounded-lg text-sm font-bold text-white">L</span>
            <span className="text-base font-semibold tracking-tight text-white">LabMate <span style={{ color: "#f4a36a" }}>AI</span></span>
          </button>
          <div className="hidden items-center gap-7 text-sm text-stone-300 sm:flex">
            <button onClick={onStart} className="transition hover:text-white">홈</button>
            <button onClick={onStart} className="transition hover:text-white">실험 선택</button>
            <button onClick={onStart} className="transition hover:text-white">사용법</button>
            <span style={{ fontFamily: fontMono }} className="rounded-full border border-stone-600 px-3 py-1 text-xs text-stone-300">
              공대생 전용 β
            </span>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header style={{ background: INK }} className="relative overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-6 pb-24 pt-16 text-center">
          <span
            style={{ fontFamily: fontMono, background: "rgba(255,255,255,0.06)", color: "#f4a36a" }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs tracking-wide"
          >
            <span style={{ background: "#f4a36a" }} className="h-1.5 w-1.5 rounded-full" />
            AI 기반 실습보고서 자동 생성 서비스
          </span>

          <h1 className="mt-7 text-4xl font-bold leading-[1.2] tracking-tight text-white sm:text-5xl">
            실험값 입력하면
            <br />
            <span style={{ color: "#f4a36a" }}>AI가 보고서를</span> 써드립니다
          </h1>

          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-stone-400">
            인장시험, 경도시험, 진동, 유체, 전기회로 실습 지원
            <br />
            실험 목적부터 결론까지 6개 섹션 자동 작성
          </p>

          <div className="mt-9 flex items-center justify-center gap-3">
            <button
              onClick={onStart}
              style={{ background: ACCENT }}
              className="rounded-xl px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 transition hover:brightness-110 active:scale-[0.98]"
            >
              보고서 만들기 →
            </button>
            <button onClick={onStart} className="rounded-xl px-5 py-3 text-sm font-medium text-stone-300 transition hover:text-white">
              예시 보고서 보기
            </button>
          </div>

          {/* 통계 */}
          <div className="mx-auto mt-14 grid max-w-lg grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ color: "#f4a36a" }} className="text-2xl font-bold tracking-tight">{s.num}</div>
                <div style={{ fontFamily: fontMono }} className="mt-1 text-[11px] text-stone-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 사용법 3단계 */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">이렇게 사용하세요</h2>
          <p className="mt-2 text-sm text-stone-500">3단계로 끝나는 실습보고서 작성</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((st) => (
            <div key={st.no} className="rounded-2xl border border-stone-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div style={{ fontFamily: fontMono, color: ACCENT }} className="text-xs font-medium tracking-widest">STEP {st.no}</div>
              <div style={{ color: ACCENT }} className="mt-4 text-2xl leading-none">{st.icon}</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{st.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">{st.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onStart}
            style={{ background: INK }}
            className="rounded-xl px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800 active:scale-[0.98]"
          >
            지금 시작하기 →
          </button>
        </div>
      </section>

      <footer className="border-t border-stone-200 py-8 text-center">
        <p style={{ fontFamily: fontMono }} className="text-xs text-stone-400">
          LabMate AI · 생성 결과는 초안입니다. 수치와 해석은 직접 검토 후 제출하세요.
        </p>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 화면 전환: 랜딩 ↔ 보고서 앱
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("landing"); // 'landing' | 'app'
  if (view === "landing") return <Landing onStart={() => setView("app")} />;
  return <LabApp onHome={() => setView("landing")} />;
}


const EXPERIMENTS = {
  tensile: {
    name: "인장시험", code: "MAT-01",
    purpose: "재료에 인장하중을 가하여 응력-변형률 거동을 측정하고, 영률·항복강도·인장강도·연신율 등 재료의 기계적 성질을 평가하는 실험입니다.",
    theory: "응력(σ=P/A), 변형률(ε=ΔL/L), 영률, 항복강도, 인장강도, 연신율, 후크의 법칙",
    outputs: ["인장강도 (σu)", "항복강도 (σy)", "연신율 (%)", "단면수축률 (%)", "영률 (E)"],
    applications: ["기계설계 시 재료 선정", "구조물 안전성 평가", "용접부 강도 검증", "재료 품질관리"],
    fields: [
      { key: "재질", unit: "", desc: "시험편의 재료명(예: SS400, AL6061-T6)", placeholder: "예: SS400" },
      { key: "초기직경", unit: "mm", desc: "시험편의 초기 직경", placeholder: "예: 10" },
      { key: "표점거리", unit: "mm", desc: "변형률 측정을 위한 기준 길이(L₀)", placeholder: "예: 50" },
      { key: "최대하중", unit: "kN", desc: "시험 중 가해진 최대 인장하중(Pmax)", placeholder: "예: 32.5" },
      { key: "항복하중", unit: "kN", desc: "소성 변형이 시작되는 시점의 하중", placeholder: "예: 21.0" },
      { key: "파단후길이", unit: "mm", desc: "파단 후 측정한 표점거리(Lf), 연신율 계산용", placeholder: "예: 62" },
    ],
    sample: {
      values: { 재질: "SS400", 초기직경: "10", 표점거리: "50", 최대하중: "32.5", 항복하중: "21.0", 파단후길이: "62" },
      photo: "UTM에 시편을 물린 모습과, 파단 후 컵-콘 형태로 끊어진 단면 사진을 첨부함.",
      reflection: "네킹이 시작되는 지점을 눈으로 확인한 게 신기했다. 표점거리 표시를 더 정확히 했어야 했나 싶다.",
    },
  },
  fluid: {
    name: "유체 실험", code: "FLD-02",
    purpose: "관 내부 유동에서 유량과 압력 손실을 측정하여 유속·레이놀즈수·마찰계수를 산출하고, 층류·난류 거동과 베르누이/다르시-바이스바흐 식의 적용성을 검증하는 실험입니다.",
    theory: "레이놀즈수(Re=ρVD/μ), 베르누이 방정식, 연속방정식, 관마찰계수, 다르시-바이스바흐 식, 층류/난류",
    outputs: ["유속 (V)", "레이놀즈수 (Re)", "관마찰계수 (f)", "층류/난류 판별"],
    applications: ["배관 시스템 설계", "펌프 양정 계산", "유체 기계 효율 평가", "공조·송풍 설비 설계"],
    fields: [
      { key: "유체", unit: "", desc: "사용한 작동 유체와 기준 온도", placeholder: "예: 물(20℃)" },
      { key: "관내경", unit: "mm", desc: "유체가 흐르는 관의 내경(D)", placeholder: "예: 25" },
      { key: "측정구간길이", unit: "m", desc: "압력 손실을 측정한 두 지점 사이 거리(L)", placeholder: "예: 1.5" },
      { key: "체적유량", unit: "L/min", desc: "단위 시간당 흐른 유체의 부피(Q), 유속 계산의 기초", placeholder: "예: 18" },
      { key: "압력손실수두", unit: "mm", desc: "마노미터로 읽은 두 지점 간 압력차(hL), 마찰계수 산출용", placeholder: "예: 120" },
      { key: "유체온도", unit: "℃", desc: "유체의 온도, 점성·밀도 보정에 사용", placeholder: "예: 20" },
    ],
    sample: {
      values: { 유체: "물(20℃)", 관내경: "25", 측정구간길이: "1.5", 체적유량: "18", 압력손실수두: "120", 유체온도: "20" },
      photo: "수직 마노미터 두 지점의 수두 차이를 읽는 장면과 유량 측정용 메스실린더 사진.",
      reflection: "유량을 일정하게 유지하는 게 어려웠고, 마노미터 눈금이 흔들려서 읽기 까다로웠다.",
    },
  },
  vibration: {
    name: "진동 실험", code: "DYN-03",
    purpose: "1자유도 스프링-질량계의 자유감쇠진동을 측정하여 고유진동수와 감쇠비를 산출하고, 이론값(ωn=√(k/m))과 비교하여 동적 거동을 분석하는 실험입니다.",
    theory: "고유진동수(ωn=√(k/m)), 감쇠비(ζ), 대수감쇠율(δ), 자유감쇠진동, 공진, 진폭비",
    outputs: ["이론 고유진동수 (fn)", "측정 고유진동수", "대수감쇠율 (δ)", "감쇠비 (ζ)"],
    applications: ["기계 구조물 진동 설계", "공진 회피 설계", "방진 시스템 설계", "차량·건축물의 동적 안정성 평가"],
    fields: [
      { key: "질량", unit: "kg", desc: "진동계의 추 질량(m), 이론 고유진동수 계산", placeholder: "예: 1.2" },
      { key: "스프링상수", unit: "N/m", desc: "스프링의 강성(k), 이론 고유진동수 계산", placeholder: "예: 850" },
      { key: "측정고유진동수", unit: "Hz", desc: "실험에서 측정한 진동 주파수, 이론값과 비교", placeholder: "예: 4.1" },
      { key: "1번째진폭", unit: "mm", desc: "감쇠 파형의 첫 번째 진폭(X₁), 대수감쇠율 계산", placeholder: "예: 12.0" },
      { key: "n번째진폭", unit: "mm", desc: "감쇠 파형의 n번째 진폭(Xn), 감쇠비 산출", placeholder: "예: 4.5" },
      { key: "사이클수", unit: "회", desc: "1번째와 n번째 진폭 사이의 진동 사이클 수", placeholder: "예: 5" },
    ],
    sample: {
      values: { 질량: "1.2", 스프링상수: "850", 측정고유진동수: "4.1", "1번째진폭": "12.0", "n번째진폭": "4.5", 사이클수: "5" },
      photo: "스프링-질량계가 자유진동하는 모습과 가속도계로 수집한 감쇠 파형 그래프.",
      reflection: "이론 고유진동수랑 측정값이 살짝 달라서, 스프링 자체 질량을 무시한 게 영향을 준 것 같다.",
    },
  },
  circuit: {
    name: "전기회로 실습", code: "ELC-04",
    purpose: "DC 회로 및 RC 회로에서 전압·전류·시정수를 측정하여 옴의 법칙(V=IR)과 키르히호프 법칙, RC 충방전 특성(τ=RC)을 실험적으로 검증하는 실험입니다.",
    theory: "옴의 법칙(V=IR), 키르히호프 법칙(KVL/KCL), RC 시정수(τ=RC), 분압/분류, 합성저항",
    outputs: ["이론 전류값", "측정 오차율 (%)", "이론 시정수 (τ)", "옴의 법칙 검증 결과"],
    applications: ["전자회로 설계", "센서 신호 처리", "필터 회로 설계", "전력 시스템 분석"],
    fields: [
      { key: "공급전압", unit: "V", desc: "전원에서 공급한 DC 전압(Vs)", placeholder: "예: 5.0" },
      { key: "저항", unit: "Ω", desc: "회로에 사용한 저항값(R), 옴의 법칙·시정수 계산", placeholder: "예: 1000" },
      { key: "커패시턴스", unit: "µF", desc: "RC 회로의 커패시터 용량(C), 시정수 계산", placeholder: "예: 100" },
      { key: "측정전류", unit: "mA", desc: "회로에서 실제 측정된 전류값(I)", placeholder: "예: 4.8" },
      { key: "측정전압", unit: "V", desc: "소자 양단에서 측정한 전압", placeholder: "예: 4.85" },
      { key: "측정시정수", unit: "ms", desc: "오실로스코프로 측정한 RC 시정수(τ)", placeholder: "예: 98" },
    ],
    sample: {
      values: { 공급전압: "5.0", 저항: "1000", 커패시턴스: "100", 측정전류: "4.8", 측정전압: "4.85", 측정시정수: "98" },
      photo: "브레드보드에 RC 회로를 구성한 사진과 오실로스코프의 충·방전 곡선 화면.",
      reflection: "이론 시정수(100ms)랑 측정값(98ms)이 거의 맞아서 뿌듯했다. 커패시터 공차가 큰 듯.",
    },
  },
  hardness: {
    name: "경도시험", code: "MAT-05",
    purpose: "압입자를 사용해 재료 표면에 일정 하중을 가하고 압흔의 크기를 측정하여 재료의 경도값(HV/HRC/HB)을 산출하는 실험입니다. 열처리·표면 처리 효과 평가에 활용됩니다.",
    theory: "브리넬(HB), 로크웰(HRC), 비커스(HV) 경도, 압입 자국과 경도 관계, 경도-인장강도 상관, 열처리 영향",
    outputs: ["경도값 (HV/HRC/HB)", "평균 경도", "측정값 편차", "추정 인장강도"],
    applications: ["열처리 품질관리", "표면 처리(질화·침탄) 평가", "공구강 선정", "내마모성 부품 설계"],
    fields: [
      { key: "재질", unit: "", desc: "시험편 재질 및 열처리 조건", placeholder: "예: S45C(열처리)" },
      { key: "시험법", unit: "", desc: "사용한 경도 시험법(HV/HRC/HB)", placeholder: "예: 비커스(HV)" },
      { key: "시험하중", unit: "kgf", desc: "압입자에 가한 하중(F), 경도 계산 기준", placeholder: "예: 10" },
      { key: "측정값1", unit: "", desc: "1차 측정 경도값 또는 압흔 대각선 길이", placeholder: "예: 210" },
      { key: "측정값2", unit: "", desc: "2차 측정값, 평균·편차 산출용", placeholder: "예: 215" },
      { key: "측정값3", unit: "", desc: "3차 측정값, 평균·편차 산출용", placeholder: "예: 208" },
    ],
    sample: {
      values: { 재질: "S45C(열처리)", 시험법: "비커스(HV)", 시험하중: "10", 측정값1: "210", 측정값2: "215", 측정값3: "208" },
      photo: "현미경으로 본 마름모꼴 압흔과, 측정 대각선 길이를 읽는 눈금 화면.",
      reflection: "같은 시편인데도 위치마다 경도가 조금씩 달라서 위치 선정이 중요하다고 느꼈다.",
    },
  },
};

const SECTIONS = [
  { key: "purpose", no: "01", label: "실험 목적" },
  { key: "theory", no: "02", label: "이론" },
  { key: "resultAnalysis", no: "03", label: "결과 분석" },
  { key: "errorCauses", no: "04", label: "오차 원인" },
  { key: "discussion", no: "05", label: "고찰" },
  { key: "conclusion", no: "06", label: "결론" },
];

// (디자인 토큰은 상단에서 선언됨)

const KEYS = ["purpose", "theory", "resultAnalysis", "errorCauses", "discussion", "conclusion"];

// 실행 환경 감지: Claude 채팅 미리보기 안에서는 api.anthropic.com 직접 호출이 동작하지만,
// 로컬/배포 환경에서는 CORS·인증 때문에 막히므로 프록시 서버(/api/generate)를 경유한다.
const IN_CLAUDE_PREVIEW =
  typeof window !== "undefined" &&
  /(\.|^)(claude\.ai|claudeusercontent\.com|anthropic\.com)$/.test(window.location.hostname || "");

const DIRECT_API_URL = "https://api.anthropic.com/v1/messages";
const PROXY_API_URL = "/api/generate"; // 배포 시 Node 프록시 서버 엔드포인트
const MODEL = "claude-sonnet-4-20250514";
const REQUEST_TIMEOUT_MS = 60000;

// 타임아웃이 있는 fetch
async function fetchWithTimeout(url, options, timeout = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// 일시적 오류(429/5xx/네트워크)에 한해 지수 백오프 재시도
async function fetchWithRetry(url, options, retries = 2) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetchWithTimeout(url, options);
      if (res.status === 429 || res.status >= 500) {
        if (attempt < retries) {
          await new Promise((r) => setTimeout(r, 800 * Math.pow(2, attempt)));
          continue;
        }
      }
      return res;
    } catch (e) {
      lastErr = e;
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 800 * Math.pow(2, attempt)));
        continue;
      }
    }
  }
  throw lastErr || new Error("네트워크 요청에 실패했습니다.");
}

// 응답에서 JSON을 안전하게 추출. 잘린 응답이면 키별로 최대한 복구한다.
function extractReport(text) {
  let s = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const first = s.indexOf("{");
  const last = s.lastIndexOf("}");

  // 1순위: 정상 JSON 파싱
  if (first !== -1 && last > first) {
    try {
      const obj = JSON.parse(s.slice(first, last + 1));
      const out = {};
      KEYS.forEach((k) => (out[k] = typeof obj[k] === "string" ? obj[k] : ""));
      return KEYS.some((k) => out[k]) ? out : null;
    } catch {
      /* 폴백으로 진행 */
    }
  }

  // 2순위 폴백: 각 키의 값을, "다음 키"가 나오기 전까지를 값으로 간주해 잘라낸다.
  // (값 안에 따옴표/줄바꿈이 섞여 있어도 견딤, 응답이 중간에 잘려도 복구)
  const out = {};
  let found = false;
  for (let i = 0; i < KEYS.length; i++) {
    const k = KEYS[i];
    const startRe = new RegExp(`"${k}"\\s*:\\s*"`);
    const startMatch = startRe.exec(s);
    if (!startMatch) {
      out[k] = "";
      continue;
    }
    const valueStart = startMatch.index + startMatch[0].length;

    // 다음 키의 시작 위치를 찾아 그 직전까지를 값으로 본다
    let valueEnd = s.length;
    for (let j = i + 1; j < KEYS.length; j++) {
      const nextRe = new RegExp(`"${KEYS[j]}"\\s*:\\s*"`);
      const nextMatch = nextRe.exec(s.slice(valueStart));
      if (nextMatch) {
        valueEnd = valueStart + nextMatch.index;
        break;
      }
    }

    let raw = s.slice(valueStart, valueEnd);
    // 값 끝의 닫는 따옴표 + 쉼표/공백/중괄호 정리
    raw = raw.replace(/"\s*,?\s*$/, "").replace(/"?\s*\}?\s*$/, "");
    const v = raw
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\")
      .trim();
    out[k] = v;
    if (v) found = true;
  }
  return found ? out : null;
}

function LabApp({ onHome }) {
  const [type, setType] = useState("tensile");
  const [values, setValues] = useState({});
  const [photo, setPhoto] = useState("");
  const [images, setImages] = useState([]); // [{name, dataUrl, mediaType, base64}]
  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState("");
  const [overviewOpen, setOverviewOpen] = useState(true); // 실험 개요 펼침 상태(기본 펼침)

  const exp = EXPERIMENTS[type];

  const pick = (t) => { setType(t); setValues({}); setPhoto(""); setImages([]); setReflection(""); setReport(null); setError(""); };
  const loadSample = () => { const s = EXPERIMENTS[type].sample; setValues({ ...s.values }); setPhoto(s.photo); setReflection(s.reflection); setReport(null); };
  const setVal = (k, v) => setValues((p) => ({ ...p, [k]: v }));

  // 파일 → base64 변환 후 상태에 저장 (최대 4장, 이미지 5MB 제한)
  const handleFiles = (fileList) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    files.slice(0, 4).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setError(`'${file.name}'은(는) 5MB를 넘어 건너뜁니다.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        const m = /^data:(image\/[a-zA-Z+]+);base64,(.+)$/.exec(dataUrl);
        if (!m) return;
        setImages((prev) =>
          [...prev, { name: file.name, dataUrl, mediaType: m[1], base64: m[2] }].slice(0, 4)
        );
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (i) => setImages((prev) => prev.filter((_, idx) => idx !== i));

  const generate = async () => {
    // 입력 검증: 최소 한 개 이상의 실험값이 있어야 함
    const filledCount = exp.fields.filter((f) => values[f.key]?.toString().trim()).length;
    if (filledCount === 0) {
      setError("실험값을 한 개 이상 입력해 주세요. (예시 데이터 불러오기를 눌러도 됩니다)");
      return;
    }

    setLoading(true); setError(""); setReport(null);
    try {
      const valuesText = exp.fields
        .map((f) => `- ${f.key}: ${values[f.key] ? values[f.key] + (f.unit ? " " + f.unit : "") : "(미입력)"}`).join("\n");
      const prompt = `너는 성실한 한국 공과대학 학부생이고, 방금 끝낸 실습 보고서를 직접 쓰고 있다.

[실험 종류] ${exp.name}
[관련 이론 키워드] ${exp.theory}
[측정한 실험값]
${valuesText}
[사진 설명] ${photo || "(없음)"}${images.length ? `\n[첨부 사진] ${images.length}장이 함께 제공됨 — 사진에서 보이는 장비 구성/측정 장면/결과를 실험 방법·결과·고찰에 자연스럽게 반영할 것.` : ""}
[느낀 점] ${reflection || "(없음)"}

[규칙]
- 자연스러운 대학생 과제 문체. AI가 쓴 티가 나면 안 된다.
- 결과 분석은 입력 실험값을 실제 공식에 대입해 계산하고 의미를 해석한다. 미입력 값은 지어내지 말 것.
- 오차 원인은 이 실험에서 실제로 생길 법한 구체적 요인을 든다.
- 고찰은 1인칭 톤으로, 이론값과의 차이/한계/개선안과 '느낀 점'을 자연스럽게 녹인다.
- 실험 종류에 맞는 고유 이론만 사용한다.
- 각 항목은 핵심만 담아 3~5문장 이내로 간결하게 쓴다.

[출력] 아래 JSON 객체 하나만, 코드블록·설명 없이 순수 JSON으로:
{"purpose":"","theory":"","resultAnalysis":"","errorCauses":"","discussion":"","conclusion":""}`;

      // 사진이 있으면 이미지 블록 + 텍스트로 content 구성, 없으면 텍스트만
      const content = images.length
        ? [
            ...images.map((img) => ({
              type: "image",
              source: { type: "base64", media_type: img.mediaType, data: img.base64 },
            })),
            { type: "text", text: prompt },
          ]
        : prompt;

      const payload = { model: MODEL, max_tokens: 4000, messages: [{ role: "user", content }] };

      // 환경에 따라 호출 대상 분기: 미리보기=직접, 그 외=프록시 서버
      const url = IN_CLAUDE_PREVIEW ? DIRECT_API_URL : PROXY_API_URL;
      const res = await fetchWithRetry(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 응답 본문을 먼저 텍스트로 받아 비-JSON(에러 페이지 등)도 처리
      const rawBody = await res.text();

      // 프록시가 404로 떨어지면(서버 미실행) 안내
      if (res.status === 404 && !IN_CLAUDE_PREVIEW) {
        throw new Error(
          "프록시 서버(/api/generate)를 찾을 수 없습니다. 백엔드 서버가 실행 중인지 확인해 주세요."
        );
      }

      let data;
      try {
        data = JSON.parse(rawBody);
      } catch {
        throw new Error(`서버 응답을 읽을 수 없습니다 (HTTP ${res.status}). ${rawBody.slice(0, 120)}`);
      }

      // API/서버 오류를 그대로 노출
      if (!res.ok || data?.type === "error" || data?.error) {
        const msg = data?.error?.message || data?.error || `요청 실패 (HTTP ${res.status})`;
        throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
      }

      // 직접 호출 응답({content:[...]}) / 프록시 응답({report:{...}}) 양쪽 지원
      let parsed = null;
      if (data.report && typeof data.report === "object") {
        parsed = {};
        KEYS.forEach((k) => (parsed[k] = typeof data.report[k] === "string" ? data.report[k] : ""));
        if (!KEYS.some((k) => parsed[k])) parsed = null;
      } else {
        const text = (data.content || [])
          .filter((b) => b.type === "text")
          .map((b) => b.text)
          .join("")
          .trim();
        if (!text) throw new Error("응답이 비어 있습니다. 잠시 후 다시 시도해 주세요.");
        parsed = extractReport(text);
      }

      if (!parsed) throw new Error("응답을 보고서 형식으로 읽지 못했습니다. 다시 생성해 주세요.");
      setReport(parsed);
    } catch (e) {
      // 사용자 친화적 에러 메시지로 변환
      let msg = e?.message || String(e);
      if (e?.name === "AbortError") {
        msg = "응답이 너무 오래 걸려 중단했습니다. 잠시 후 다시 시도해 주세요.";
      } else if (/Failed to fetch|NetworkError|Load failed/i.test(msg)) {
        msg = IN_CLAUDE_PREVIEW
          ? "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
          : "서버에 연결하지 못했습니다. 프록시 서버 실행 여부와 네트워크를 확인해 주세요.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const copy = async (kind) => {
    const txt = kind === "json"
      ? JSON.stringify(report, null, 2)
      : SECTIONS.map((s) => `[${s.no}. ${s.label}]\n${report[s.key]}`).join("\n\n");
    await navigator.clipboard.writeText(txt);
    setCopied(kind); setTimeout(() => setCopied(""), 1500);
  };

  const filled = exp.fields.filter((f) => values[f.key]).length;

  return (
    <div style={{ fontFamily: fontUI, background: "#f4f2ee" }} className="min-h-screen w-full text-stone-900">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap');`}</style>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        {/* 상단 네비 */}
        <div className="mb-6 flex items-center justify-between">
          <button onClick={onHome} className="flex items-center gap-2 text-sm text-stone-500 transition hover:text-stone-900">
            <span style={{ fontFamily: fontMono }}>←</span> 홈으로
          </button>
          <button onClick={onHome} className="flex items-center gap-2">
            <span style={{ background: ACCENT }} className="grid h-7 w-7 place-items-center rounded-md text-sm font-bold text-white">L</span>
            <span className="text-sm font-semibold tracking-tight">LabMate <span style={{ color: ACCENT }}>AI</span></span>
          </button>
        </div>
        {/* 헤더 */}
        <header className="mb-8 border-b border-stone-300 pb-6">
          <div style={{ fontFamily: fontMono, color: ACCENT }} className="mb-2 text-xs uppercase tracking-[0.25em]">
            AI Lab Report Helper
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            공대 실습보고서 도우미
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-500">
            실험값과 느낀 점만 입력하면, 목적부터 결론까지 보고서 초안을 정리해 드립니다.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* ── 입력 ── */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            {/* 실험 탭 */}
            <div style={{ fontFamily: fontMono }} className="mb-3 text-[11px] uppercase tracking-widest text-stone-400">
              실험 종류
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
              {Object.entries(EXPERIMENTS).map(([k, v]) => {
                const active = type === k;
                return (
                  <button key={k} onClick={() => pick(k)}
                    style={active ? { background: ACCENT, borderColor: ACCENT } : {}}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                      active ? "text-white" : "border-stone-200 text-stone-600 hover:border-stone-400"
                    }`}>
                    {v.name}
                  </button>
                );
              })}
            </div>

            {/* 실험 개요 (교육용) */}
            <div className="mb-5 overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
              <button
                onClick={() => setOverviewOpen((v) => !v)}
                className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-stone-100"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                  <span>📘</span> 실험 개요
                  <span className="text-xs font-normal text-stone-500">— {exp.name}이(가) 어떤 실험인지 확인하세요</span>
                </span>
                <span
                  style={{ fontFamily: fontMono }}
                  className={`text-xs text-stone-400 transition-transform ${overviewOpen ? "rotate-180" : ""}`}
                >
                  ▾
                </span>
              </button>

              {overviewOpen && (
                <div className="border-t border-stone-200 bg-white px-4 py-4">
                  {/* 실험 목적 */}
                  <div className="mb-4">
                    <div
                      style={{ fontFamily: fontMono, color: ACCENT }}
                      className="mb-1.5 text-[11px] font-medium uppercase tracking-widest"
                    >
                      실험 목적
                    </div>
                    <p className="text-sm leading-relaxed text-stone-700">{exp.purpose}</p>
                  </div>

                  {/* 3분할: 측정 데이터 / 계산 결과 / 활용 분야 */}
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                      <div
                        style={{ fontFamily: fontMono }}
                        className="mb-2 text-[10px] font-medium uppercase tracking-widest text-stone-500"
                      >
                        📥 측정 데이터
                      </div>
                      <ul className="space-y-1 text-xs text-stone-700">
                        {exp.fields.map((f) => (
                          <li key={f.key} className="flex items-start gap-1.5">
                            <span style={{ color: ACCENT }} className="mt-0.5">·</span>
                            <span>{f.key}{f.unit && <span className="text-stone-400"> ({f.unit})</span>}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                      <div
                        style={{ fontFamily: fontMono }}
                        className="mb-2 text-[10px] font-medium uppercase tracking-widest text-stone-500"
                      >
                        📊 계산 / 분석 결과
                      </div>
                      <ul className="space-y-1 text-xs text-stone-700">
                        {exp.outputs.map((o) => (
                          <li key={o} className="flex items-start gap-1.5">
                            <span style={{ color: ACCENT }} className="mt-0.5">·</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                      <div
                        style={{ fontFamily: fontMono }}
                        className="mb-2 text-[10px] font-medium uppercase tracking-widest text-stone-500"
                      >
                        🔧 활용 분야
                      </div>
                      <ul className="space-y-1 text-xs text-stone-700">
                        {exp.applications.map((a) => (
                          <li key={a} className="flex items-start gap-1.5">
                            <span style={{ color: ACCENT }} className="mt-0.5">·</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 실험값 */}
            <div className="mb-2 flex items-center justify-between">
              <div style={{ fontFamily: fontMono }} className="text-[11px] uppercase tracking-widest text-stone-400">
                실험값 · {exp.code}
              </div>
              <button onClick={loadSample} style={{ color: ACCENT }} className="text-xs font-medium hover:underline">
                예시 데이터 불러오기
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {exp.fields.map((f) => (
                <label key={f.key} className="block">
                  <span className="mb-1 flex items-center justify-between text-xs text-stone-600">
                    <span className="font-medium">{f.key}</span>
                    {f.unit && <span style={{ fontFamily: fontMono }} className="text-stone-400">{f.unit}</span>}
                  </span>
                  <input
                    value={values[f.key] || ""}
                    onChange={(e) => setVal(f.key, e.target.value)}
                    placeholder={f.placeholder || ""}
                    style={{ fontFamily: fontMono }}
                    className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none transition placeholder:text-stone-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                  {f.desc && (
                    <span className="mt-1 block text-[11px] leading-snug text-stone-400">{f.desc}</span>
                  )}
                </label>
              ))}
            </div>

            {/* 사진 설명 + 첨부 */}
            <div className="mt-5">
              <span style={{ fontFamily: fontMono }} className="mb-1 block text-[11px] uppercase tracking-widest text-stone-400">사진 첨부 / 설명</span>

              {/* 업로드 드롭존 */}
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 px-3 py-4 text-center transition hover:border-orange-500 hover:bg-orange-50/40"
              >
                <span style={{ color: ACCENT }} className="text-lg leading-none">＋</span>
                <span className="mt-1 text-xs text-stone-500">사진을 끌어다 놓거나 클릭해서 첨부 (최대 4장)</span>
                <input type="file" accept="image/*" multiple className="hidden"
                  onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }} />
              </label>

              {/* 썸네일 미리보기 */}
              {images.length > 0 && (
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {images.map((img, i) => (
                    <div key={i} className="group relative aspect-square overflow-hidden rounded-md border border-stone-200">
                      <img src={img.dataUrl} alt={img.name} className="h-full w-full object-cover" />
                      <button onClick={() => removeImage(i)}
                        className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/60 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 사진 설명 텍스트 */}
              <textarea value={photo} onChange={(e) => setPhoto(e.target.value)} rows={2}
                placeholder="사진에 무엇이 담겨 있는지 적어주세요. (사진을 안 올려도 설명만으로 반영됩니다)"
                className="mt-2 w-full resize-none rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none transition placeholder:text-stone-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-100" />
            </div>
            {/* 느낀 점 */}
            <label className="mt-4 block">
              <span style={{ fontFamily: fontMono }} className="mb-1 block text-[11px] uppercase tracking-widest text-stone-400">느낀 점</span>
              <textarea value={reflection} onChange={(e) => setReflection(e.target.value)} rows={3}
                placeholder="어려웠던 점, 인상 깊었던 결과 등 — 고찰에 반영됩니다."
                className="w-full resize-none rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none transition placeholder:text-stone-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-100" />
            </label>

            <button onClick={generate} disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:opacity-40">
              {loading ? (<><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" /> 생성 중…</>)
                : (<>보고서 생성 →</>)}
            </button>
            <p className="mt-2 text-center text-xs text-stone-400">입력 항목 {filled}/{exp.fields.length} 채움</p>
            {error && (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs leading-relaxed text-red-600">
                <span className="font-semibold">오류 · </span>{error}
              </div>
            )}
          </div>

          {/* ── 결과 ── */}
          <div className="rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
              <div>
                <div style={{ fontFamily: fontMono }} className="text-[11px] uppercase tracking-widest text-stone-400">보고서 초안</div>
                <div className="text-sm font-semibold">{exp.name}</div>
              </div>
              {report && (
                <div className="flex items-center gap-1.5 text-xs">
                  <button onClick={() => setShowJson((s) => !s)} className="rounded-md border border-stone-200 px-2.5 py-1.5 text-stone-600 hover:border-stone-400">
                    {showJson ? "문서" : "JSON"}
                  </button>
                  <button onClick={() => copy("text")} className="rounded-md border border-stone-200 px-2.5 py-1.5 text-stone-600 hover:border-stone-400">
                    {copied === "text" ? "복사됨" : "복사"}
                  </button>
                  <button onClick={() => copy("json")} className="rounded-md border border-stone-200 px-2.5 py-1.5 text-stone-600 hover:border-stone-400">
                    {copied === "json" ? "복사됨" : "JSON복사"}
                  </button>
                </div>
              )}
            </div>

            <div className="px-6 py-5">
              {/* 빈 상태 */}
              {!report && !loading && (
                <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                  <div style={{ borderColor: ACCENT, color: ACCENT }} className="grid h-12 w-12 place-items-center rounded-full border-2 text-xl">⌬</div>
                  <p className="mt-4 text-sm text-stone-500">실험을 고르고 <span className="font-medium text-stone-700">예시 데이터 불러오기</span> 후</p>
                  <p className="text-sm text-stone-500">[보고서 생성]을 눌러보세요.</p>
                </div>
              )}
              {/* 로딩 스켈레톤 */}
              {loading && (
                <div className="min-h-[360px] animate-pulse space-y-5">
                  {[0, 1, 2].map((i) => (
                    <div key={i}>
                      <div className="mb-2 h-3 w-24 rounded bg-stone-200" />
                      <div className="h-2.5 w-full rounded bg-stone-100" />
                      <div className="mt-1.5 h-2.5 w-11/12 rounded bg-stone-100" />
                      <div className="mt-1.5 h-2.5 w-4/5 rounded bg-stone-100" />
                    </div>
                  ))}
                </div>
              )}
              {/* 문서 */}
              {report && !showJson && (
                <div className="max-h-[560px] space-y-6 overflow-y-auto pr-1">
                  {SECTIONS.map((s) => (
                    <section key={s.key}>
                      <div className="mb-2 flex items-baseline gap-2.5">
                        <span style={{ fontFamily: fontMono, color: ACCENT }} className="text-xs font-medium">{s.no}</span>
                        <h3 className="text-base font-semibold tracking-tight">{s.label}</h3>
                      </div>
                      <p style={{ fontFamily: fontSerif }} className="whitespace-pre-wrap text-[15.5px] leading-7 text-stone-700">
                        {report[s.key]}
                      </p>
                    </section>
                  ))}
                </div>
              )}
              {/* JSON */}
              {report && showJson && (
                <pre style={{ fontFamily: fontMono }} className="max-h-[560px] overflow-auto rounded-lg bg-stone-900 p-4 text-[11px] leading-5 text-emerald-300">
{JSON.stringify(report, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-stone-400">
          생성 결과는 초안입니다 · 수치와 해석은 직접 검토 후 제출하세요
        </p>
      </div>
    </div>
  );
}
