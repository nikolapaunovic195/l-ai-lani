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
  const [flashcards, setFlashcards] = useState([]);
  const [researchText, setResearchText] = useState("");
  const [deepResearchText, setDeepResearchText] = useState("");

  const handleFileUpload = (file, topics = []) => {
    setSelectedFile(file);
    setTopics(topics);
    setShowPanels(true);
  };

  const handleFlashcardsUpdate = (newFlashcards) => {
    setFlashcards(newFlashcards);
    setResearchText("");
    setDeepResearchText("");
  };

  const handleResearchUpdate = (text) => {
    setResearchText(text);
    setFlashcards([]);
    setDeepResearchText("");
  };

  const handleDeepResearchUpdate = (text) => {
    setDeepResearchText(text);
    setFlashcards([]);
    setResearchText("");
  };

  return (
    <div className="app">
      <Header selectedFile={selectedFile} />
      <UploadPanel onFileUpload={handleFileUpload} showPanels={showPanels} />
      {showPanels && (
        <main className="main-content">
          <div className="panel-container">
            <LeftPanel 
              topics={topics} 
              updateFlashcards={handleFlashcardsUpdate}
              updateResearch={handleResearchUpdate}
              updateDeepResearch={handleDeepResearchUpdate}
            />
            <RightPanel 
              flashcards={flashcards} 
              researchText={researchText}
              deepResearchText={deepResearchText}
            />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;