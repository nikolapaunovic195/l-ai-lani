import React, { useState } from "react";
import "../components/LeftPanel.css";

const LeftPanel = () => {
  // Hardcoded topics - replace this with your data later
  const topics = [
    "RSA Encryption",
    "Diffie-Hellman",
    "Symmetric Encryption",
    "Digital Signatures",
    "Hash Functions",
    "Public Key Infrastructure",
    "Key Management",
    "Block Ciphers",
    "Stream Ciphers",
    "Message Authentication Codes"
  ];

  // State to track which topics are selected
  const [selectedTopics, setSelectedTopics] = useState({});

  // Handle checkbox changes
  const handleTopicChange = (topic) => {
    setSelectedTopics({
      ...selectedTopics,
      [topic]: !selectedTopics[topic]
    });
  };

  // Function to handle button clicks
  const handleButtonClick = (buttonLabel) => {
    // Get only the selected topics (where value is true)
    const selectedTopicsList = Object.keys(selectedTopics).filter(
      topic => selectedTopics[topic]
    );

    // Print the button label and selected topics to console
    console.log(`Button clicked: ${buttonLabel}`);
    console.log("Selected topics:", selectedTopicsList);
  };

  return (
    <section className="left-panel">
      <h2>Topics</h2>
      <div className="topics-list scrollable">
        {topics.map((topic, index) => (
          <label key={index} className="topic">
            <input
              type="checkbox"
              checked={selectedTopics[topic] || false}
              onChange={() => handleTopicChange(topic)}
            />
            <span>{topic}</span>
          </label>
        ))}
      </div>
      <div className="button-group">
        <button
          className="flashcards-btn"
          onClick={() => handleButtonClick("Generate Flashcards")}
        >
          Generate Flashcards
        </button>
        <button
          className="research-btn"
          onClick={() => handleButtonClick("Research")}
        >
          Research
        </button>
        <button
          className="deep-research-btn"
          onClick={() => handleButtonClick("Deep Research")}
        >
          Deep Research
        </button>
      </div>
    </section>
  );
};

export default LeftPanel;