import React, { useState, useEffect } from "react";
import axios from "axios";

const PDFList = () => {
  const [pdfs, setPDFs] = useState([]);

  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      const response = await axios.get("/api/FileUpload/pdfs");
      setPDFs(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>PDF List</h2>
      <div className="pdf-container">
        {pdfs.map((pdf, index) => (
          <div className="file">
            <div className="icon">
              <img src="src/assets/images.png" alt="" />
            </div>
            <div className="filename">
              <p>{pdf.fileName.slice(0,15)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFList;
