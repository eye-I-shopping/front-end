import React, { useEffect } from "react";
import logoImage from "./image/logo.png";
import "./MainScreen.css";
import { useNavigate } from "react-router-dom";

function MainScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/splashImage");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="mainScreen">
      <img src={logoImage} alt="Logo" className="logo" />
    </div>
  );
}

export default MainScreen;

export default MainScreen;