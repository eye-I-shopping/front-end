import SplashIm from "./image/main.png";
import ConnectIm from "./image/secondMain.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashImage.moduel.css";

function SplashImage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      navigate("/voiceChoice");
    }, 2000); // 2초 후에 스플래시 화면이 사라집니다.
  }, [navigate]);

  return (
    <div className="splashScreen">
      <img
        src={loading ? SplashIm : ConnectIm}
        alt={loading ? "시작화면" : "접속완료 화면"}
        className={loading ? "fade-out" : "fade-in"}
      />
    </div>
  );
}

export default SplashImage;
