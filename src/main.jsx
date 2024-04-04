import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import PdfProvider from "./context/PdfProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PdfProvider>
    <App />
  </PdfProvider>
);
