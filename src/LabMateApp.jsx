import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

const SECTIONS = ["실험 목적", "이론적 배경", "실험 결과", "오차 원인", "고찰", "결론"];

const SYSTEM_PROMPT = `당신은 대학교 공학 실습보고서 작성을 도와주는 전문 AI입니다.
사용자가 제공한 실험 정보를 바탕으로 아래 6개 섹션으로 구성된 실습보고서 초안을 작성해주세요.

반드시 아래 형식으로 출력하세요 (섹션 제목은 정확히 아래와 같이):

## 실험 목적
(내용)

## 이론적 배경
(내용)

## 실험 결과
(내용)

## 오차 원인
(내용)

## 고찰
(내용)

## 결론
(내용)

각 섹션은 충실하고 학문적인 문체로 작성하세요. 수치나 구체적 데이터가 없으면 일반적인 내용으로 채워주세요.`;

function parseReport(text) {
  const result = {};
  SECTIONS.forEach((section) => {
    const regex = new RegExp(`## ${section}\\s*([\\s\\S]*?)(?=## |$)`, "g");
    const match = regex.exec(text);
    result[section] = match ? match[1].trim() : "";
  });
  return result;
}

export default function LabMateApp() {
  const [step, setStep] = useState("landing"); // landing | form | loading | result
  const [form, setForm] = useState({
    subject: "",
    title: "",
    data: "",
    method: "",
    feeling: "",
  });
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleGenerate() {
    if (!form.title.trim()) {
      setError("실험 제목은 필수입니다.");
      return;
    }
    setError("");
    setStep("loading");

    const prompt = `${SYSTEM_PROMPT}

---
[실험 정보]
과목: ${form.subject || "미기재"}
실험 제목: ${form.title}
실험 방법 및 과정: ${form.method || "미기재"}
실험 데이터 / 측정값: ${form.data || "미기재"}
느낀 점 / 기타 메모: ${form.feeling || "미기재"}
---

위 정보를 바탕으로 실습보고서 초안을 작성해주세요.`;

    try {
      const res = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: prompt }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`HTTP ${res.status}: ${errBody}`);
      }

      const data = await res.json();
      const text = data.content?.[0]?.text || "";
      setReport(parseReport(text));
      setActiveSection(SECTIONS[0]);
      setStep("result");
    } catch (e) {
      setError(`오류: ${e.message}`);
      setStep("form");
    }
  }

  function copyAll() {
    const full = SECTIONS.map((s) => `## ${s}\n${report[s]}`).join("\n\n");
    navigator.clipboard.writeText(full);
  }

  // ── Landing ──────────────────────────────────────────────
  if (step === "landing") {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/30">
              🧪
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">LabMate AI</span>
          </div>

          <p className="text-slate-400 text-lg leading-relaxed">
            실험 정보를 입력하면<br />
            <span className="text-indigo-400 font-semibold">6개 섹션</span> 실습보고서 초안을 자동으로 만들어드립니다.
          </p>

          <div className="grid grid-cols-3 gap-3 text-sm">
            {["목적 · 이론", "결과 · 오차", "고찰 · 결론"].map((t) => (
              <div key={t} className="bg-slate-800/60 border border-slate-700 rounded-lg py-3 px-2 text-slate-300">
                {t}
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep("form")}
            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40"
          >
            보고서 작성 시작 →
          </button>

          <p className="text-slate-600 text-xs">생성 결과는 초안입니다. 수치와 해석은 직접 검토 후 제출하세요.</p>
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────
  if (step === "form") {
    return (
      <div className="min-h-screen bg-slate-950 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <button onClick={() => setStep("landing")} className="text-slate-500 hover:text-slate-300 transition-colors text-sm">
              ← 뒤로
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl">🧪</span>
              <span className="text-white font-bold text-xl">LabMate AI</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">실험 정보 입력</h1>
          <p className="text-slate-400 mb-8 text-sm">많이 입력할수록 더 정확한 보고서가 생성됩니다.</p>

          <div className="space-y-5">
            {/* 과목 */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">과목명</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="예) 일반물리학실험, 회로이론실험"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
            </div>

            {/* 실험 제목 */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                실험 제목 <span className="text-indigo-400">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="예) 옴의 법칙 측정 실험"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
            </div>

            {/* 실험 방법 */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">실험 방법 / 과정</label>
              <textarea
                name="method"
                value={form.method}
                onChange={handleChange}
                rows={3}
                placeholder="예) 저항 3개를 직렬 연결하고 전압을 5V씩 올리며 전류를 측정했다."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
              />
            </div>

            {/* 데이터 */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">실험 데이터 / 측정값</label>
              <textarea
                name="data"
                value={form.data}
                onChange={handleChange}
                rows={4}
                placeholder={`예) V=5V → I=0.5A\nV=10V → I=1.0A\nV=15V → I=1.48A (오차 발생)`}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none font-mono"
              />
            </div>

            {/* 느낀 점 */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">느낀 점 / 기타 메모</label>
              <textarea
                name="feeling"
                value={form.feeling}
                onChange={handleChange}
                rows={3}
                placeholder="예) 전선 연결 순서를 바꿨을 때 값이 달라졌다. 접촉 저항이 원인인 것 같다."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
              />
            </div>

            {error && (
              <div className="bg-red-900/40 border border-red-700 rounded-lg px-4 py-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg transition-all duration-200 shadow-lg shadow-indigo-600/30 mt-2"
            >
              보고서 생성하기 ✨
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading ───────────────────────────────────────────────
  if (step === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-3xl animate-pulse">
          🧪
        </div>
        <div className="text-center">
          <p className="text-white text-xl font-semibold mb-2">보고서를 작성 중입니다...</p>
          <p className="text-slate-400 text-sm">AI가 6개 섹션을 분석하고 작성하고 있어요.</p>
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Result ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep("form")}
              className="text-slate-500 hover:text-slate-300 transition-colors text-sm"
            >
              ← 다시 작성
            </button>
            <span className="text-white font-bold text-xl">🧪 LabMate AI</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={copyAll}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors border border-slate-700"
            >
              전체 복사
            </button>
            <button
              onClick={() => { setStep("form"); setReport(null); }}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm transition-colors"
            >
              새 보고서
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-1">{form.title || "실습보고서"}</h1>
        <p className="text-slate-500 text-sm mb-8">{form.subject && `${form.subject} · `}AI 생성 초안 — 제출 전 반드시 검토하세요.</p>

        <div className="flex gap-6 flex-col lg:flex-row">
          {/* 섹션 탭 */}
          <div className="lg:w-48 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 flex-shrink-0">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`px-3 py-2 rounded-lg text-sm text-left whitespace-nowrap transition-all duration-150 ${
                  activeSection === s
                    ? "bg-indigo-600 text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* 섹션 내용 */}
          <div className="flex-1 min-w-0">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-indigo-400 font-semibold text-lg">{activeSection}</h2>
                <button
                  onClick={() => navigator.clipboard.writeText(report[activeSection])}
                  className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
                >
                  복사
                </button>
              </div>
              <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                {report[activeSection] || "내용을 생성하지 못했습니다."}
              </div>
            </div>

            {/* 섹션 네비게이션 */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  const i = SECTIONS.indexOf(activeSection);
                  if (i > 0) setActiveSection(SECTIONS[i - 1]);
                }}
                disabled={SECTIONS.indexOf(activeSection) === 0}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 text-sm disabled:opacity-30 hover:bg-slate-700 transition-colors"
              >
                ← 이전
              </button>
              <button
                onClick={() => {
                  const i = SECTIONS.indexOf(activeSection);
                  if (i < SECTIONS.length - 1) setActiveSection(SECTIONS[i + 1]);
                }}
                disabled={SECTIONS.indexOf(activeSection) === SECTIONS.length - 1}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 text-sm disabled:opacity-30 hover:bg-slate-700 transition-colors"
              >
                다음 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
