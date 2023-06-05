import React, { useEffect } from "react";
import axios from "axios";
import logoImage_purple from "./image/logo_purple.png";
import "./SplashImage.css";
import { useNavigate } from "react-router-dom";

function SplashImage() {
  const navigate = useNavigate();

  useEffect(() => {
    let phoneToken = "kimkim"; // let phoneToken;
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
          // console.log("true");
          const tokenData = response.data;

          if (tokenData.id) {
            sessionStorage.setItem("id", tokenData.id);
          }
          if (tokenData.userSettings !== undefined && tokenData.userSettings !== null) {
            sessionStorage.setItem("userSettings", JSON.stringify(tokenData.userSettings));
          }        
          if (tokenData.speaker) {
            sessionStorage.setItem("speaker", tokenData.speaker);
          }
          if (tokenData.speed) {
            sessionStorage.setItem("speed", tokenData.speed);
          }
          
          setTimeout(() => {
            navigate("/splashImage/custom/voiceChoice/speedChoice/camera", {
              replace: true,
            });
          }, 2000);
        } else {
          console.log("else 처리 중");
          sessionStorage.setItem("id", phoneToken);
          setTimeout(() => {
            navigate("/splashImage/custom", { replace: true });
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        // setTimeout(() => {
        //   navigate("/splashImage/custom", { replace: true });
        // }, 2000);
      });
  }, [navigate]);

  return (
    <div className="splashImgage">
      <img src={logoImage_purple} alt="Logo" className="logo" />
    </div>
  );
}
export default SplashImage;
