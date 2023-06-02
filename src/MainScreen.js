import React, { useEffect, useState } from "react";
import logoImage from "./image/logo.png";
import "./MainScreen.css";
import { useNavigate } from "react-router-dom";

function MainScreen() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const logoFadeTimer = setTimeout(() => {
      setIsTransitioning(true);
    }, 2000);

    const transitionTimer = setTimeout(() => {
      navigate("/splashImage", { replace: true });
    }, 4000);

    return () => {
      clearTimeout(logoFadeTimer);
      clearTimeout(transitionTimer);
    };
  }, [navigate]);

  return (
    <div className={`mainScreen ${isTransitioning ? "transitioning" : ""}`}>
      <img src={logoImage} alt="Logo" className="logo" />
      {isTransitioning && <div className="circle-mask"></div>}
    </div>
  );
}

export default MainScreen;
