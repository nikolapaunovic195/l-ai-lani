import React from "react";
import "../components/Header.css";
import logo from "../assets/lailani_app_icon_800.png"; // Ensure the image is inside src/assets/

const Header = ({ selectedFile }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Lailani Logo" className="logo" />
        <p className="app-title">l(ai)lani</p>
      </div>
      {selectedFile && <p className="uploaded-file">Uploaded File: {selectedFile.name}</p>}
    </header>
  );
};

export default Header;
