import React, { useState } from "react";
import Header from "./components/Header";
import UploadPanel from "./components/UploadPanel";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [topics, setTopics] = useState([]);
  const [showPanels, setShowPanels] = useState(false);

  const handleFileUpload = ({ file, topics }) => {
    setSelectedFile(file);
    setTopics(topics);
    setShowPanels(true);
  };

  return (
    <div className="app">
      <Header selectedFile={selectedFile} />
      <UploadPanel onFileUpload={handleFileUpload} showPanels={showPanels} />
      {showPanels && (
        <main className="main-content">
          <div className="panel-container">
            <LeftPanel topics={topics} />
            <RightPanel />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;