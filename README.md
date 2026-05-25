# LabMate AI — 공대 실습보고서 도우미

실험값·사진·느낀 점을 입력하면 6개 섹션(목적·이론·결과 분석·오차 원인·고찰·결론)의
실습보고서 초안을 만들어주는 웹앱입니다.

---

## ⚠ 이전에 스타일이 깨졌던 이유

이 앱의 디자인은 **Tailwind CSS** 클래스로 만들어졌습니다.
`labmate-ai.jsx` **파일 하나만** 올리면 Tailwind 설정이 없어서 모든 디자인 클래스가
무시되고, 글자만 세로로 쌓인 "날것" 화면이 나옵니다.

이 폴더에는 Tailwind가 실제로 빌드되도록 아래 4가지가 모두 포함되어 있습니다.
이 폴더를 **통째로** 올려야 정상 작동합니다.

1. `src/index.css` — `@tailwind base/components/utilities` 지시어
2. `src/main.jsx` — `import "./index.css"`
3. `tailwind.config.js` — `content` 경로 지정
4. `postcss.config.js` — tailwindcss 플러그인 등록
   그리고 `package.json`의 devDependencies에 `tailwindcss`, `postcss`, `autoprefixer`

---

## 로컬 실행

```bash
npm install
npm run dev        # http://localhost:5173
```
`npm install` 후 화면이 정상(카드·색·레이아웃 적용)으로 나오는지 먼저 확인하세요.

---

## Vercel 배포

1. 이 폴더를 GitHub 저장소에 올립니다.
   ```bash
   git init
   git add .
   git commit -m "fix: include tailwind setup"
   git branch -M main
   git remote add origin https://github.com/<사용자명>/<저장소명>.git
   git push -u origin main
   ```
2. vercel.com → New Project → 이 저장소 선택
3. Framework Preset이 **Vite**로 자동 인식됩니다. (Build: `npm run build`, Output: `dist`)
4. Deploy 클릭 → 끝.

> 중요: GitHub에 올릴 때 **이 폴더 전체**(package.json, vite.config.js, tailwind.config.js,
> postcss.config.js, src/ 전부)를 올려야 합니다. jsx 파일 하나만 올리면 또 깨집니다.

---

## GitHub Pages에 올릴 경우

Pages는 하위경로(`/저장소명/`)로 서빙되므로 `vite.config.js`에 base를 추가하세요.
```js
export default defineConfig({
  base: "/저장소명/",
  plugins: [react()],
});
```
(Vercel은 루트로 서빙되므로 base 설정이 필요 없습니다.)

---

## 폴더 구조
```
labmate-vercel/
├── index.html
├── package.json              # tailwindcss/postcss/autoprefixer 포함
├── vite.config.js
├── tailwind.config.js        # content 경로
├── postcss.config.js         # tailwindcss 플러그인
└── src/
    ├── main.jsx              # index.css import
    ├── index.css             # @tailwind 지시어 + 폰트
    └── LabMateApp.jsx        # 앱 본체(랜딩 + 보고서 생성)
```

## 보고서 생성에 대해
이 앱은 Claude 미리보기 환경에서는 인앱 API로 동작합니다. 외부(Vercel 등)에 올렸을 때
실제 생성을 하려면 API 키를 보관하는 백엔드가 필요합니다. 화면·입력·전환 등 UI는 모두 정상
동작하며, 데모/실제 생성 방식이 필요하면 요청해 주세요.

생성 결과는 **초안**입니다. 수치와 해석은 직접 검토 후 제출하세요.
