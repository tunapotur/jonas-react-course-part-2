import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
// import AppSolution from "./AppSolution";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
    {/* <AppSolution /> */}
  </StrictMode>
);
