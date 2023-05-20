import SplashImage from "./image/main.png";
import { useState, useEffect } from "react";
import Camera from "./Camera";

function StartScreen() {
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
          src={SplashImage}
          width={"100%"}
          height={"100%"}
          alt="eyeShop아이콘"
        />
      ) : (
        <div>
          카메라 찰칵 찰칵
          <Camera />
        </div>
      )}
    </div>
  );
}

export default StartScreen;
