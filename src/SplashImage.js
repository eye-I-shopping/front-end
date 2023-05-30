import React, { useState, useEffect } from "react";
import axios from "axios";
import SplashIm from "./image/main.png";
import ConnectIm from "./image/secondMain.png";
import VoiceChoice from "./VoiceChoice";
import Camera from "./Camera";
import "./SplashImage.moduel.css";

function SplashImage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const formData = new FormData();
  formData.append("token_id", "temp");
  useEffect(() => {
    axios
      .post("http://192.168.0.39:80/settings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setData(null);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="splashScreen">
        <img
          src={isLoading ? SplashIm : ConnectIm}
          alt={isLoading ? "시작화면" : "접속완료 화면"}
          className={isLoading ? "fade-out" : "fade-in"}
        />
      </div>
      <div>{data ? <Camera /> : <VoiceChoice />}</div>
    </>
  );
}

export default SplashImage;
