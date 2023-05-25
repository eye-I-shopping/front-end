import SplashIm from "./image/main.png";
import { useState, useEffect } from "react";
import Camera from "./Camera";

function SplashImage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3초 후에 스플래시 화면이 사라집니다.
  }, []);
  return (
    <div className="splashScreen">
      {loading ? (
        <img
          src={SplashIm}
          width={"100%"}
          height={"100%"}
          alt="eyeShop아이콘"
        />
      ) : (
        <div>
          <Camera />
        </div>
      )}
    </div>
  );
}

export default SplashImage;
