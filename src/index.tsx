import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import { Screen } from "./screens/Screen";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Screen />
  </StrictMode>,
);
