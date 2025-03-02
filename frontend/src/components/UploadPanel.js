import React, { useState } from "react";
import "../components/UploadPanel.css";

const UploadPanel = ({ onFileUpload, showPanels }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file ? file.name : "No file chosen");
    onFileUpload(file);
  };

  return (
    <section className={`upload-section ${showPanels ? "small-upload" : ""}`}>
      <div className="upload-container">
        <label htmlFor="file-upload" className="upload-btn">Upload File</label>
        <input type="file" id="file-upload" accept=".pdf, .doc, .docx, .txt, .md" onChange={handleFileChange} hidden />
        {!showPanels && <span className="file-name">{selectedFile || "No file chosen"}</span>}
      </div>
    </section>
  );
};

export default UploadPanel;