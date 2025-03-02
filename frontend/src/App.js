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
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (file, topics = []) => {
    setSelectedFile(file);
    setTopics(topics);
    setShowPanels(true);
  };

  const handleFlashcardsUpdate = (newFlashcards) => {
    setFlashcards(newFlashcards);
    setResearchText("");
    setDeepResearchText("");
    setIsLoading(false);
  };

  const handleResearchUpdate = (text) => {
    setResearchText(text);
    setFlashcards([]);
    setDeepResearchText("");
    setIsLoading(false);
  };

  const handleDeepResearchUpdate = (text) => {
    setDeepResearchText(text);
    setFlashcards([]);
    setResearchText("");
    setIsLoading(false);
  };

  const setLoadingState = (isLoading) => {
    setIsLoading(isLoading);
  };

  return (
    <div className={`app ${isLoading ? 'app-loading' : ''}`}>
      <Header selectedFile={selectedFile} />
      <UploadPanel onFileUpload={handleFileUpload} showPanels={showPanels} setLoadingState={setLoadingState} />
      {showPanels && (
        <main className="main-content">
          <div className="panel-container">
            <LeftPanel 
              topics={topics} 
              updateFlashcards={handleFlashcardsUpdate}
              updateResearch={handleResearchUpdate}
              updateDeepResearch={handleDeepResearchUpdate}
              setLoadingState={setLoadingState}
            />
            <RightPanel 
              flashcards={flashcards} 
              researchText={researchText}
              deepResearchText={deepResearchText}
              isLoading={isLoading}
            />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;