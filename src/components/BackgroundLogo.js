import React from "react";
import logoPurple from "../image/logo_purple.png";

const BackgroundLogo = () => {
  const logoStyle = {
    width: "230vw",
    height: "auto",
    position: "absolute",
    top: "35%",
    left: "-40%",
    opacity: "10%",
    zIndex: -1,
  };

  return <img src={logoPurple} alt="Logo" style={logoStyle} />;
};

export default BackgroundLogo;
