import React from "react";
import "../components/Header.css";
import logo from "../assets/lailani_app_icon_800.png";


const Header = ({ selectedFile }) => {
  const reloadPage = () => {
    window.location.reload();
  };

  const handleMouseMove = (e) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    const maxTilt = 20;
    const rotateX = deltaY * maxTilt;
    const rotateY = -deltaX * maxTilt;
    element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

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
        {/* */}
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
