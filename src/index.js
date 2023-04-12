import App from "./App";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");
createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
