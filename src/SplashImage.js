import React, { useState, useEffect } from "react";
import axios from "axios";
import logoImage_purple from "./image/logo_purple.png";
import "./SplashImage.css";
import { useNavigate } from "react-router-dom";

function SplashImage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("id", "temp");

  useEffect(() => {
    if (window.BRIDGE !== undefined) {
      let phoneToken = window.BRIDGE.sendToken();
      alert(phoneToken);
    }

    axios
      .post("http://192.168.0.10:80/settings", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        if (data) {
          console.log(response.data);
          setTimeout(() => {
            navigate("/splashImage/voiceChoice/speedChoice/camera", {
              replace: true,
            });
          }, 2000);
        } else {
          setTimeout(() => {
            navigate("/splashImage/voiceChoice", { replace: true });
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          navigate("/splashImage/voiceChoice", { replace: true });
        }, 2000);
      });
  }, [navigate]);

  return (
    <div className="splashImgage">
      <img src={logoImage_purple} alt="Logo" className="logo" />
    </div>
  );
}
export default SplashImage;
