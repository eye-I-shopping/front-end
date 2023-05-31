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
    axios
      .post("http://192.168.0.10:80/settings", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        if (response.data) {
          console.log(response.data);
          navigate("/splashImage/voiceChoice/speedChoice/camera", {
            replace: true,
          });
        } else {
          navigate("/splashImage/voiceChoice", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/splashImage/voiceChoice", { replace: true });
      });
  }, [navigate]);

  return (
    <div className="splashImgage">
      <img
        src={logoImage_purple}
        alt="Logo"
        className="logo fade-in-fade-out"
      />
    </div>
  );
}
export default SplashImage;
