import React, { useEffect, useState } from "react";
import axios from "axios";
import logoImage_purple from "./image/logo_purple.png";
import "./SplashImage.css";
import { useNavigate } from "react-router-dom";

function SplashImage() {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    let phoneToken = "temp"; // let phoneToken;

    if (window.BRIDGE !== undefined) {
      phoneToken = window.BRIDGE.sendToken();
      alert(phoneToken);
    }

    const formData = new FormData();
    formData.append("id", phoneToken);

    axios
      .post("https://eyeshopping.shop/settings/get", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          const tokenData = response.data;

          if (tokenData.id) {
            sessionStorage.setItem("id", tokenData.id);
          }
          if (
            tokenData.userSettings !== undefined &&
            tokenData.userSettings !== null
          ) {
            sessionStorage.setItem(
              "userSettings",
              JSON.stringify(tokenData.userSettings)
            );
          }
          if (tokenData.speaker) {
            sessionStorage.setItem("speaker", tokenData.speaker);
          }
          if (tokenData.speed) {
            sessionStorage.setItem("speed", tokenData.speed);
          }

          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              navigate("/splashImage/custom/voiceChoice/speedChoice/camera", {
                replace: true,
              });
            }, 2000);
          }, 5000);
        } else {
          console.log("else 처리 중");
          sessionStorage.setItem("id", phoneToken);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              navigate("/splashImage/custom", { replace: true });
            }, 2000);
          }, 5000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  return (
    <div
      className={`splashImage ${fadeIn ? "fade-in" : ""} ${
        fadeOut ? "fade-out" : ""
      }`}
    >
      <div className="main-text-container">
        <span className="splash-subtitle">
          세상을 열어주는
          <br />
          구매 보조앱
        </span>
        <h2 className="splash-title">EYE(I) 쇼핑</h2>
      </div>
      <img src={logoImage_purple} alt="Logo" className="splash-logo" />
    </div>
  );
}

export default React.memo(SplashImage);
