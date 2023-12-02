import React, { useEffect, useState } from "react";
import InfoBox from "../InfoBox/InfoBox";
import { resetDetails } from "../../../REST";

const Homepage = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    resetDetails();
  }, []);

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
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#e6e6e6",
          margin: 0,
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            ...styles.title,
            fontSize: isHovered ? "90px" : "90px",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            marginTop: isHovered ? "0px" : "0px",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Snap Vibe
        </h1>
        <InfoBox
          style={{
            marginTop: isHovered ? "0px" : "0px",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

const styles = {
  title: {
    fontWeight: "bold",
    color: "#4a90e2",
    cursor: "pointer",
    transition: "transform 0.3s ease, font-size 0.3s ease",
  },
  footer: {
    margin: 0,
  },
  link: {
    color: "#4a90e2",
    textDecoration: "none",
  },
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <p style={styles.footer}>
        © {currentYear} Sushil L, No Rights Reserved |{" "}
        <a
          href="https://github.com/21Cash/SnapVibe-Frontend"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          View Source Code
        </a>
      </p>
    </div>
  );
};

export default Homepage;
