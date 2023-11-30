// Homepage.jsx

import React, { useState } from "react";
import InfoBox from "../InfoBox/InfoBox";

const Homepage = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#1e1e1e",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#e6e6e6",
        }}
      >
        <h1
          style={{
            ...styles.title,
            fontSize: isHovered ? "100px" : "100px",
            transform: isHovered ? "scale(1.2)" : "scale(1)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Snap Vibe
        </h1>
        <InfoBox />
      </div>
    </>
  );
};

const styles = {
  title: {
    fontWeight: "bold",
    color: "#4a90e2",
    marginTop: "80px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    transition: "transform 0.3s ease, font-size 0.3s ease",
  },
};

export default Homepage;
