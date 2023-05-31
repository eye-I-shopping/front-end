import React, { useState, useEffect } from "react";
import axios from "axios";
import SplashIm from "./image/main.png";
import ConnectIm from "./image/secondMain.png";
import "./SplashImage.module.css";
import { useNavigate } from "react-router-dom";

function SplashImage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("token_id", "temp");

  useEffect(() => {
    if (window.BRIDGE !== undefined) {
      let phoneToken = window.BRIDGE.sendToken();
      alert(phoneToken);
    }

    axios
      .post("https://192.168.0.39:80/settings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setData(response.data);
        if (response.data) {
          navigate("/camera");
        } else {
          navigate("/voiceChoice");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/voiceChoice");
      });
  }, []);

  return (
    <div className="splashScreen">
      {data === null ? (
        <img src={SplashIm} alt="시작화면" className="fade-in" />
      ) : (
        <img src={ConnectIm} alt="접속완료 화면" className="fade-in-fade-out" />
      )}
    </div>
  );
}

export default SplashImage;
