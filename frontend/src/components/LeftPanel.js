import React, { useState } from "react";
import "../components/LeftPanel.css";

const LeftPanel = ({ topics: initialTopics, updateFlashcards, updateResearch, updateDeepResearch, setLoadingState }) => {
  const [topics, setTopics] = useState(initialTopics);
  const [selectedTopics, setSelectedTopics] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleTopicChange = (topic) => {
    setSelectedTopics((prev) => ({
      ...prev,
      [topic]: !prev[topic]
    }));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(topics[index]);
  };

  const finishEditing = (index) => {
    const updated = [...topics];
    updated[index] = editValue;
    setTopics(updated);
    setEditIndex(null);
    setEditValue("");
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      finishEditing(index);
    } else if (e.key === "Escape") {
      setEditIndex(null);
      setEditValue("");
    }
  };

  const handleButtonClick = (buttonLabel) => {
    const selectedTopicsList = topics.filter((topic) => selectedTopics[topic]);
    if (selectedTopicsList.length === 0) {
      console.warn("No topics selected.");
      return;
    }

    // Set loading state to true
    setLoadingState(true);

    const data = {
      option: buttonLabel,
      topics: selectedTopicsList
    };
    console.log("Data sent to backend:", JSON.stringify(data, null, 2));

    fetch("http://localhost:5000/send_selected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend:", data);

        if (buttonLabel === "flashcards") {
          if (Array.isArray(data) && data.length > 0) {
            const formattedFlashcards = data.map((flashcard) => ({
              question: flashcard.side_a,
              answer: flashcard.side_b
            }));
            updateFlashcards(formattedFlashcards);
          } else {
            console.warn("No flashcards received from backend.");
            updateFlashcards([]);
            setLoadingState(false);
          }
        }

        else if (buttonLabel === "research") {
          if (data.message && data.message.research_results) {
            updateResearch(data.message.research_results);
          } else {
            updateResearch("No research results found.");
            setLoadingState(false);
          }
        }

        else if (buttonLabel === "deep") {
          if (data.message && data.message.research_results) {
            updateDeepResearch(data.message.research_results);
          } else {
            updateDeepResearch("No deep research results found.");
            setLoadingState(false);
          }
        }
      })
      .catch((error) => {
        console.error(`Error fetching ${buttonLabel}:`, error);
        if (buttonLabel === "flashcards") {
          updateFlashcards([{ question: "Error", answer: "Failed to fetch flashcards." }]);
        } else if (buttonLabel === "research") {
          updateResearch("Error fetching research. Check console.");
        } else if (buttonLabel === "deep") {
          updateDeepResearch("Error fetching deep research. Check console.");
        }
        setLoadingState(false); // Set loading state to false on error
      });
  };

  return (
    <section className="left-panel fade-in-up delay-0">
      <h2>Topics</h2>
      <div className="topics-list scrollable">
        {topics.map((topic, index) => (
          <div key={index} className="topic fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexGrow: 1,
                cursor: "pointer"
              }}
            >
              <input
                type="checkbox"
                checked={selectedTopics[topic] || false}
                onChange={() => handleTopicChange(topic)}
              />
              {editIndex === index ? (
                <input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => finishEditing(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ) : (
                <span>{topic}</span>
              )}
            </label>
            <button
              className="edit-button"
              onClick={(e) => {
                e.stopPropagation();
                startEditing(index);
              }}
            >
              ...
            </button>
          </div>
        ))}
      </div>

      <div className="button-group">
        <button className="flashcards-btn" onClick={() => handleButtonClick("flashcards")}>
          Generate Flashcards
        </button>
        <button className="research-btn" onClick={() => handleButtonClick("research")}>
          Research
        </button>
        <button className="deep-research-btn" onClick={() => handleButtonClick("deep")}>
          Deep Research
        </button>
      </div>
    </section>
  );
};

export default LeftPanel;