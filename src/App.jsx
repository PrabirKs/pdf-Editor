import { useState, useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Upload from "./pages/Upload";
import Editor from "./pages/Editor";
function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Upload/>}/>
            <Route path="/edit" element={<Editor/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
