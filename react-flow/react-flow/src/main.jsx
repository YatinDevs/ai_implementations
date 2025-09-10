import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FlowProvider } from "./context/FlowContext.jsx";

createRoot(document.getElementById("root")).render(
  <FlowProvider>
    <App />
  </FlowProvider>
);
