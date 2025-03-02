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

  // Handle file upload
  const handleFileUpload = (file, topics = []) => {
    setSelectedFile(file);
    setTopics(topics);
    setShowPanels(true);
  };

  // Function to update flashcards when received from LeftPanel
  const handleFlashcardsUpdate = (newFlashcards) => {
    setFlashcards(newFlashcards);
    setResearchText(""); // Clear other content types
    setDeepResearchText("");
  };

  // Function to update research text
  const handleResearchUpdate = (text) => {
    setResearchText(text);
    setFlashcards([]); // Clear other content types
    setDeepResearchText("");
  };

  // Function to update deep research text
  const handleDeepResearchUpdate = (text) => {
    setDeepResearchText(text);
    setFlashcards([]); // Clear other content types
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