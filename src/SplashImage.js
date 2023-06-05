import React, { useState, useEffect } from "react";
import axios from "axios";
import logoImage_purple from "./image/logo_purple.png";
import "./SplashImage.css";
import { useNavigate } from "react-router-dom";

function SplashImage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let phoneToken;
    if (window.BRIDGE !== undefined) {
      phoneToken = window.BRIDGE.sendToken();
      alert(phoneToken);
      sessionStorage.setItem("id", phoneToken);
    }

    const formData = new FormData();
    formData.append("id", phoneToken); // formData.append("id", phoneToken);

    axios
      .post("https://eyeshopping.shop/settings", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        if(data) {
          setTimeout(() => {
            navigate("/splashImage/custom/voiceChoice/speedChoice/camera", {
              replace: true,
            });
          }, 2000);
        } else {
          sessionStorage.setItem("id", phoneToken);
          setTimeout(() => {
            navigate("/splashImage/custom", { replace: true });
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          navigate("/splashImage/custom", { replace: true });
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
