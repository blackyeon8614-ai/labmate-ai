# LabMate AI — 공대 실습보고서 도우미

실험값·사진·느낀 점을 입력하면 6개 섹션(목적·이론·결과 분석·오차 원인·고찰·결론)의
실습보고서 초안을 만들어주는 웹앱입니다.

---

## 수정된 사항 (버그 픽스)

### main.py
1. `allow_origins` URL 끝 슬래시 제거 (`/` 있으면 CORS 불일치)
2. `allow_methods=[""]` → `["*"]` (빈 문자열은 아무 메서드도 허용 안 함)
3. `CORSMiddleware` 중복 import 및 `add_middleware` 중복 선언 제거

### package.json
- `tailwindcss`, `postcss`, `autoprefixer` devDependencies에 추가

### postcss.config.js (신규)
- Tailwind 빌드에 필요한 PostCSS 설정 추가

---

## 폴더 구조
```
labmate-ai/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js          ← 새로 추가
├── .env.local.example         ← 환경변수 샘플
├── main.py                    ← 백엔드 (Render 배포)
├── requirements.txt
└── src/
    ├── main.jsx
    ├── index.css
    └── LabMateApp.jsx
```

---

## 로컬 실행

```bash
# 프론트엔드
npm install
npm run dev        # http://localhost:5173

# 백엔드 (별도 터미널)
pip install -r requirements.txt
ANTHROPIC_API_KEY=sk-ant-... uvicorn main:app --reload
```

---

## Render 배포 (백엔드)

1. GitHub에 푸시
2. render.com → New Web Service → 저장소 선택
3. 설정:
   - **Runtime**: Python
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Environment Variables: `ANTHROPIC_API_KEY` = 실제 키 입력
5. Deploy

> ⚠️ 무료 플랜은 15분 비활성 시 슬립 상태가 됩니다. 첫 요청에 30~60초 지연이 생길 수 있습니다.

---

## Vercel 배포 (프론트엔드)

1. Vercel 대시보드 → Settings → Environment Variables
2. `VITE_API_URL` = `https://your-render-app-name.onrender.com` 추가
3. Redeploy

> ⚠️ `VITE_` 접두사가 있어야 Vite가 클라이언트에서 읽을 수 있습니다.
