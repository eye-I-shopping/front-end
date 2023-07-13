import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import {
  HelpOutline as HelpIcon,
  SettingsVoice as VoiceSettingIcon,
} from "@mui/icons-material";
import "./Camera.css";
import axios from "axios";
import WidgetsIcon from "@mui/icons-material/Widgets";
import loadingOn from "./image/loadingOn.png";
import loadingOff from "./image/loadingOff.png";
import OverlayMessage from "./components/OverlayMessage";

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [TTSAudio, setTTSAudio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(loadingOn);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");
  const promptMessage =
    "카메라 화면입니다. 이 화면에서는 카메라를 통해 제품을 촬영하고 음성을 듣는 기능을 사용하실 수 있습니다. 화면 상단에는 세 가지 버튼이 위치해 있습니다. 왼쪽부터 맞춤 정보설정, 사용 방법, 음성 설정 버튼이 있습니다. 화면 하단 50%를 누르면 카메라가 현재 보고 있는 제품을 촬영하여 관련 정보를 음성으로 제공합니다.";

  useEffect(() => {
    const constraints = { video: { facingMode: "environment" } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // handleHelpClick();
        }
      })
      .catch((err) => {
        console.error("카메라 접근 에러: " + err);
      });
  }, []);

  const handleHelpClick = () => {
    if (overlayMessage === promptMessage) {
      // 끄고싶을때 예외처리
      audioRef.current.pause();
      setTTSAudio(null);
      setOverlayMessage("");
      setIsOverlayVisible(false);
    } else {
      if (audioRef.current.paused) {
        setTTSAudio("/mp3/camera.mp3");
        setOverlayMessage(promptMessage);
        setIsOverlayVisible(true);
      }
    }
  };

  const handleAudioStart = () => {
    if (TTSAudio !== "/mp3/loading.mp3") {
      setIsLoading(false);
      setIsOverlayVisible(true);
    }
  };

  const handleAudioEnd = () => {
    setTTSAudio(null);
    setOverlayMessage("");
    setIsOverlayVisible(false);
  };

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
    // 화면이 비활성화 중일 때는 바로 리턴합니다.
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
    formData.append("test", "5");
    formData.append("userSettings", sessionStorage.getItem("userSettings"));

    axios
      .post("https://eyeishopping.shop/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          playTTS(response.data);
        } else {
          playTTS("인식되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // error가 발생하면 로딩 상태를 false로 변경
        playTTS("네트워크 연결이 불안정합니다.");
      });
  };

  const dataUrltoBlob = (dataURI) => {
    let base64Content = atob(dataURI.split(",")[1]);
    let mimeType = dataURI.split(",")[0].split(":")[1].split(";")[0];
    let arrayBuffer = new ArrayBuffer(base64Content.length);
    let arrayBufferView = new Uint8Array(arrayBuffer);
    for (let i = 0; i < base64Content.length; i++) {
      arrayBufferView[i] = base64Content.charCodeAt(i);
    }
    let blob = new Blob([arrayBuffer], { type: mimeType });
    return blob;
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
        const audio = URL.createObjectURL(response.data);
        setOverlayMessage(readingText);
        setTTSAudio(audio);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="camera">
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        className="appbar"
      >
        <Toolbar className="toolbar">
          <div className="toolbar-button">
            <Button
              component={Link}
              to="/splashImage/custom/voiceChoice/speedChoice/camera/cameraCustom"
              sx={{ height: "10vh", width: "33vw" }}
              color="inherit"
              startIcon={<WidgetsIcon />}
            >
              맞춤 설정
            </Button>
          </div>
          <div className="toolbar-button">
            <Button
              onClick={handleHelpClick}
              sx={{ height: "10vh", width: "34vw" }}
              color="inherit"
              startIcon={<HelpIcon />}
            >
              사용방법
            </Button>
          </div>

          <div className="toolbar-button">
            <Button
              component={Link}
              to="/splashImage/custom/voiceChoice"
              sx={{ height: "10vh", width: "33vw" }}
              color="inherit"
              startIcon={<VoiceSettingIcon />}
            >
              음성 설정
            </Button>
          </div>
        </Toolbar>
      </AppBar>
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
      <audio
        src={TTSAudio}
        ref={audioRef}
        onPlay={handleAudioStart}
        onEnded={handleAudioEnd}
        className="audio"
        autoPlay
      />
      <OverlayMessage isVisible={isOverlayVisible} message={overlayMessage} />
    </div>
  );
}
export default Camera;
