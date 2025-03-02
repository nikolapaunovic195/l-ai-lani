import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "../components/RightPanel.css";
import logo_mono from "../assets/lailani_monochrome_icon_800.png";

const RightPanel = ({ flashcards, researchText, deepResearchText }) => {
    const [flipped, setFlipped] = useState({});
    const [reloadKey, setReloadKey] = useState(0);
    const logoRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!logoRef.current) return;
        const { clientX, clientY } = event;
        const { x, y, width, height } = logoRef.current.getBoundingClientRect();
        const centerX = x + width / 2;
        const centerY = y + height / 2;
        const offsetX = clientX - centerX;
        const offsetY = clientY - centerY;
        const rotateX = (offsetY / height) * 5;
        const rotateY = (offsetX / width) * -5;
        logoRef.current.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        if (!logoRef.current) return;
        logoRef.current.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg)";
    };

    useEffect(() => {
        if (flashcards && flashcards.length > 0) {
            setReloadKey((prev) => prev + 1);
        }
    }, [flashcards]);

    const handleFlip = (index) => {
        setFlipped((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    if (
        (!flashcards || flashcards.length === 0) &&
        (!researchText || researchText.trim() === "") &&
        (!deepResearchText || deepResearchText.trim() === "")
    ) {
        return (
            <section className="right-panel fade-in-up delay-1">
                <div className="right-panel-empty">
                    <img
                        src={logo_mono}
                        alt="Lailani Logo"
                        className="lailani-logo-mono"
                        ref={logoRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    />
                    <p className="right-panel-text">Welcome to l(ai)lani</p>
                    <p className="right-panel-text-smaller">Select topics to continue</p>
                </div>
            </section>
        );
    }

    if (flashcards && flashcards.length > 0) {
        return (
            <section className="right-panel fade-in-up delay-1">
                <div className="flashcards-subpanel" key={reloadKey}>
                    <h2>Flashcards</h2>
                    <div className="flashcard-grid">
                        {flashcards.map((card, index) => (
                            <div
                                key={index}
                                className={`flashcard fade-in-up ${flipped[index] ? "flipped" : ""}`}
                                onClick={() => handleFlip(index)}
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className="flashcard-inner">
                                    <div className="flashcard-front">
                                        <p>{card.question}</p>
                                    </div>
                                    <div className="flashcard-back">
                                        <p>{card.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (researchText && researchText.trim() !== "") {
        return (
            <section className="right-panel fade-in-up delay-1">
                <div className="text-subpanel">
                    <h2>Research</h2>
                    <div className="text-content">
                        <ReactMarkdown>{researchText}</ReactMarkdown> {}
                    </div>
                </div>
            </section>
        );
    }

    if (deepResearchText && deepResearchText.trim() !== "") {
        return (
            <section className="right-panel fade-in-up delay-1">
                <div className="text-subpanel">
                    <h2>Deep Research</h2>
                    <div className="text-content">
                        <ReactMarkdown>{deepResearchText}</ReactMarkdown> {}
                    </div>
                </div>
            </section>
        );
    }

    return null;
};

export default RightPanel;
