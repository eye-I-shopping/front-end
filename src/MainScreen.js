import React, { useEffect, useState } from "react";
import logoImage from "./image/logo.png";
import "./MainScreen.css";
import { useNavigate } from "react-router-dom";

function MainScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        navigate("/splashImage", { replace: true });
      }, 2000);
    }, 2000);
    return () => {
      clearTimeout(transitionTimer);
    };
  }, [navigate]);

  return (
    <div className={`mainScreen ${fadeOut ? "fade-out" : ""}`}>
      <div className="main-text-container">
        <span className="subtitle">
          세상을 열어주는
          <br />
          구매 보조앱
        </span>
        <h2 className="title">EYE(I) 쇼핑</h2>
      </div>
      <img src={logoImage} alt="Logo" className="logo" />
    </div>
  );
}

export default MainScreen;
