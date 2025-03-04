import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import { loggonTheme } from "./styles/loggonTheme.ts";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={loggonTheme}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
