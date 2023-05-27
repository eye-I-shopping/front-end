import SplashIm from "./image/main.png";
import ConnectIm from "./image/secondMain.png";
import { useState, useEffect } from "react";
import "./SplashImage.moduel.css";

function SplashImage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // 2초 후에 스플래시 화면이 사라집니다.
  }, []);

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
