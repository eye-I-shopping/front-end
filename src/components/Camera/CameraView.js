import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import loadingOn from "../../image/loadingOn.png";
import loadingOff from "../../image/loadingOff.png";

function CameraView({ videoRef, audioRef, setTTSAudio, setOverlayMessage }) {
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(loadingOn);

  // Loading Image effect
  useEffect(() => {
    let interval;
    if (isLoading) {
      setTTSAudio("/mp3/loading.mp3");
      interval = setInterval(() => {
        setLoadingImage((prev) =>
          prev === loadingOn ? loadingOff : loadingOn
        );
      }, 1000);
    } else {
      setLoadingImage(loadingOn);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const captureImage = () => {
    if (isLoading || !audioRef.current.paused) {
      return;
    }
    setIsLoading(true);

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 10, 10, video.videoWidth, video.videoHeight);

    const dataUrl = canvas.toDataURL("image/jpg");
    setImageData(dataUrl);

    const blob = dataUrltoBlob(dataUrl);
    const formData = new FormData();
    formData.append("image", blob);

    axios
      .post("https://eyeishopping.shop/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false); // 여기에 추가

        if (response.data.length > 0) {
          playTTS(response.data);
        } else {
          playTTS("인식되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // 여기에 이미 있음
        playTTS("네트워크 연결이 불안정합니다.");
      });
  };

  const dataUrltoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const buffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      buffer[i] = byteString.charCodeAt(i);
    }
    return new Blob([buffer], { type: mimeString });
  };

  const playTTS = (readingText) => {
    const formData = new FormData();
    formData.append("speaker", sessionStorage.getItem("speaker"));
    formData.append("speed", Number(sessionStorage.getItem("speed")));
    formData.append("text", readingText);
    //https://cors-anywhere.herokuapp.com/
    //https://cors.bridged.cc/
    axios
      .post(
        "https://cors.bridged.cc/https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-NCP-APIGW-API-KEY-ID":
              process.env.REACT_APP_X_NCP_APIGW_API_KEY_ID,
            "X-NCP-APIGW-API-KEY": process.env.REACT_APP_X_NCP_APIGW_API_KEY,
            "x-cors-api-key": process.env.REACT_APP_X_CORS_API_KEY,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        console.log(response);
        setIsLoading(false); // 여기에 추가
        const audio = URL.createObjectURL(response.data);
        setOverlayMessage(readingText);
        setTTSAudio(audio);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // 여기에 추가
      });
  };

  return (
    <>
      <div className="camera-view">
        <video
          ref={videoRef}
          autoPlay={true}
          playsInline={true}
          preload={"auto"}
          muted
        />
      </div>
      <Box sx={{ zIndex: 2 }}>
        <div
          className={`capture-area ${isLoading ? "loading" : ""}`}
          onClick={captureImage}
        />
        <span hidden>{imageData}</span>
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {isLoading && (
          <div className="loading">
            <img src={loadingImage} alt="Loading…" className="loading-image" />
          </div>
        )}
      </Box>
    </>
  );
}

export default CameraView;
