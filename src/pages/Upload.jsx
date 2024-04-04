import { useState, useRef, useEffect } from "react";
import { PdfState } from "../context/PdfProvider";
import { useNavigate } from "react-router-dom";
import PDFList from "./PdfList";
function Upload() {
  const navigate = useNavigate();
  const {pdf,setPdf} = PdfState() ;
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setPdf(URL.createObjectURL(e.target.files[0]));
  };
  useEffect(() => {
    uploadClick();
  }, []);

  const uploadClick = (e) => {
    const uploadArea = document.querySelector("#uploadArea");
    const dropZone = document.querySelector("#dropZone");
    const loadingText = document.querySelector("#loadingText");
    const fileInput = document.querySelector("#fileInput");
    const previewImage = document.querySelector("#previewImage");
    const fileDetails = document.querySelector("#fileDetails");
    const uploadedFile = document.querySelector("#uploadedFile");
    const uploadedFileInfo = document.querySelector("#uploadedFileInfo");
    const uploadedFileName = document.querySelector(".uploaded-file__name");
    const uploadedFileIconText = document.querySelector(
      ".uploaded-file__icon-text"
    );
    const uploadedFileCounter = document.querySelector(
      ".uploaded-file__counter"
    );

    dropZone.addEventListener("dragover", function (event) {
      event.preventDefault();
      dropZone.classList.add("drop-Zone--over");
    });

    dropZone.addEventListener("dragleave", function (event) {
      dropZone.classList.remove("drop-Zone--over");
    });

    dropZone.addEventListener("drop", function (event) {
      event.preventDefault();
      dropZone.classList.remove("drop-Zone--over");
      const file = event.dataTransfer.files[0];

      uploadFile(file);
    });

    dropZone.addEventListener("click", function (event) {
      fileInput.click();
    });

    fileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      uploadFile(file);
    });

    function uploadFile(file) {
      const fileReader = new FileReader();
      const fileType = file.type;
      const fileSize = file.size;

      dropZone.classList.add("drop-Zone--Uploaded");

      loadingText.style.display = "block";
      previewImage.style.display = "none";

      uploadedFile.classList.remove("uploaded-file--open");
      uploadedFileInfo.classList.remove("uploaded-file__info--active");

      fileReader.addEventListener("load", function () {
        setTimeout(function () {
          uploadArea.classList.add("upload-area--open");

          loadingText.style.display = "none";
          previewImage.style.display = "block";

          fileDetails.classList.add("file-details--open");
          uploadedFile.classList.add("uploaded-file--open");
          uploadedFileInfo.classList.add("uploaded-file__info--active");
        }, 500);

        previewImage.setAttribute("src", "src/assets/images.png");

        uploadedFileName.innerHTML = file.name;

        progressMove();
      });

      fileReader.readAsDataURL(file);
    }

    function progressMove() {
      let counter = 0;

      setTimeout(() => {
        let counterIncrease = setInterval(() => {
          if (counter === 100) {
            clearInterval(counterIncrease);
          } else {
            counter = counter + 10;
            uploadedFileCounter.innerHTML = `${counter}%`;
          }
        }, 100);
      }, 600);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file); // key should match the parameter name in the backend
 
    try {
      const response = await fetch("api/FileUpload/upload", {
        method: "POST",
        body: formData,
      });
 
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
 
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("There was an error!", error);
    }
    navigate("/edit")
  };
  return (
    <div className="main-container">
      <div id="uploadArea" className="upload-area">
        <div className="upload-area__header">
          <h1 className="upload-area__title">Upload your file</h1>
          <p className="upload-area__paragraph">File format supported (PDF)</p>
        </div>

        <form id="dropZone" className="upload-area__drop-Zone drop-Zone">
          <span className="drop-Zone__icon">
            <i className="bx bxs-file-image"></i>
          </span>
          <p className="drop-Zone__paragraph">
            Drop your file here or Click to browse
          </p>
          <span id="loadingText" className="drop-Zone__loading-text">
            Please Wait
          </span>
          <img
            src=""
            alt="Preview Image"
            id="previewImage"
            className="drop-Zone__preview-image"
            draggable="false"
          />
          <input
            type="file"
            id="fileInput"
            className="drop-Zone__file-input"
            accept=".pdf"
            onChange={handleChange}
          />
        </form>

        <div
          id="fileDetails"
          className="upload-area__file-details file-details"
        >
          <h3 className="file-details__title">Uploaded File</h3>

          <div id="uploadedFile" className="uploaded-file">
            <div className="uploaded-file__icon-container">
              <i className="bx bxs-file-blank uploaded-file__icon"></i>
              <span className="uploaded-file__icon-text"></span>
            </div>

            <div id="uploadedFileInfo" className="uploaded-file__info">
              <span className="uploaded-file__name">Proejct 1</span>
              <span className="uploaded-file__counter">0%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <button className="btn" onClick={handleEdit}>EDIT</button>
      </div> 
      <PDFList/>
    </div>
   
  );
}

export default Upload;
