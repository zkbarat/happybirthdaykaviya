import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Fallback for older iOS Safari that doesn't support 100dvh: keep a
// CSS variable in sync with the real visible viewport height.
function setAppHeight() {
  const h = window.visualViewport?.height ?? window.innerHeight;
  document.documentElement.style.setProperty("--app-height", `${h}px`);
}
setAppHeight();
window.addEventListener("resize", setAppHeight);
window.addEventListener("orientationchange", setAppHeight);
window.visualViewport?.addEventListener("resize", setAppHeight);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
