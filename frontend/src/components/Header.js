import React from "react";
import "../components/Header.css";
import logo from "../assets/lailani_app_icon_800.png";


const Header = ({ selectedFile }) => {
  const reloadPage = () => {
    window.location.reload(); // ✅ Refreshes the page (goes back to the first page)
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Lailani Logo" className="logo" />
        <p className="app-title">l(ai)lani</p>
        {/* ✅ Invisible button that covers the logo + text */}
        <button className="invisible-button" onClick={reloadPage}></button>
      </div>
      {selectedFile && <p className="uploaded-file">Uploaded File: {selectedFile.name}</p>}
    </header>
  );
};

export default Header;
