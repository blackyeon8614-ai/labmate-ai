import React from "react";
import ReactDOM from "react-dom/client";
import App from "./LabMateApp.jsx";
import "./index.css"; // ★ 이 import가 있어야 Tailwind가 적용됩니다

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
