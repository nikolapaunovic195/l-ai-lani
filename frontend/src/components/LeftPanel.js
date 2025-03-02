import React, { useState } from "react";
import "../components/LeftPanel.css";

var backend_response = null;

const LeftPanel = ({ topics }) => {
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

    // Create a JSON object with the button label and selected topics
    const data = {
      option: buttonLabel,
      topics: selectedTopicsList
    };

    // Print the JSON object to the console
    console.log("Data:", data);
    console.log(JSON.stringify(data, null, 2));

    // Send the data to the backend and handle the response
    fetch("http://localhost:5000/send_selected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        console.log("Data sent successfully");
        backend_response = response;
        response.json().then(data => {
          console.log("Response from backend:", data);
          // Optionally update state based on backend response


          
        });
      } else {
        console.error("Error sending data");
      }
    }).catch(error => {
      console.error("Error:", error);
    });
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
          onClick={() => handleButtonClick("flashcards")}
        >
          Generate Flashcards
        </button>
        <button
          className="research-btn"
          onClick={() => handleButtonClick("research")}
        >
          Research
        </button>
        <button
          className="deep-research-btn"
          onClick={() => handleButtonClick("deep")}
        >
          Deep Research
        </button>
      </div>
    </section>
  );
};

export default LeftPanel;
