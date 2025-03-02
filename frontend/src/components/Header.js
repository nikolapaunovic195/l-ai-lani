import React from "react";
import "../components/Header.css";
import logo from "../assets/lailani_app_icon_800.png";


const Header = ({ selectedFile }) => {
  const reloadPage = () => {
    window.location.reload(); // ✅ Refreshes the page (goes back to the first page)
  };

  // Calculate tilt based on mouse position relative to element center
  const handleMouseMove = (e) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X relative to element
    const y = e.clientY - rect.top;  // Mouse Y relative to element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate offset percentages
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    // Maximum tilt angle (in degrees)
    const maxTilt = 20;
    // Invert rotateY so that the tilt feels natural
    const rotateX = deltaY * maxTilt;
    const rotateY = -deltaX * maxTilt;
    element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  // Reset transform when mouse leaves the element
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <header className="header">
      <div
        className="logo-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img src={logo} alt="Lailani Logo" className="logo" />
        <p className="app-title">l(ai)lani</p>
        {/* Invisible button covering the logo + text */}
        <button className="invisible-button" onClick={reloadPage}></button>
      </div>
      <div className="uploaded-file-container">
        {selectedFile && <h2>Uploaded File</h2>}
        {selectedFile && <p>{selectedFile.name}</p>}
      </div>
    </header>
  );
};

export default Header;
