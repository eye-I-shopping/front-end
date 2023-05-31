import React, { useState, useEffect } from "react";
import axios from "axios";
import SplashIm from "./image/main.png";
import ConnectIm from "./image/secondMain.png";
import "./SplashImage.module.css";
import { useNavigate } from "react-router-dom";

function SplashImage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  console.log(navigate);
  const formData = new FormData();
  formData.append("token_id", "temp");

  useEffect(() => {
    axios
      .post("http://192.168.0.77:8443/settings", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);

        // sessionStorage.setItem(쟤가 만든 테이블 컬럼이름 key , 쟤가 만든 테이블 컬럼의 값 );

        if (response.data) {
          console.log(response.data);
          navigate("/voiceChoice/speedChoice/camera", { replace: true });
        } else {
          navigate("/voiceChoice", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/voiceChoice", { replace: true });
      });
  }, [navigate]);

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
