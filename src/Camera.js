import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
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
  const [TTSAudio] = useState(null);
  const [isHelpBoxVisible, setIsHelpBoxVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(loadingOff);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");
  const [helpBoxMessage, setHelpBoxMessage] = useState("");
  const [audioSource] = useState("/mp3/camera.mp3");
  const [userInteracted, setUserInteracted] = useState(false);
  const [isLoadingAudioPlaying, setIsLoadingAudioPlaying] = useState(false);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (userInteracted) {
      playAudio();
    }
  }, [userInteracted]);

  const handleHelpClick = () => {
    if (!isHelpBoxVisible) {
      setIsHelpBoxVisible(true);
      setHelpBoxMessage("카메라 화면입니다. 이 화면에서는 카메라를 통해 제품을 촬영하고 음성을 듣는 기능을 사용하실 수 있습니다. 화면 상단에는 세 가지 버튼이 위치해 있습니다. 왼쪽부터 맞춤 정보설정, 사용 방법, 음성 설정 버튼이 있습니다. 화면 하단 50%를 누르면 카메라가 현재 보고 있는 제품을 촬영하여 관련 정보를 음성으로 제공합니다.");
      playAudio();
    } else {
      setIsHelpBoxVisible(false);
      playAudio(true); // 재생 중인 오디오를 멈추도록 함
    }
  };


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSource;
      audioRef.current.onended = () => {
        setIsHelpBoxVisible(false);
      };
    }
  }, [audioSource]);

  const captureImage = () => {
    // 화면이 비활성화 중일 때는 바로 리턴합니다.
    if (isLoading) {
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
    formData.append("userSettings", sessionStorage.getItem("userSettings"));

    axios
      .post("https://eyeishopping.shop/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false); // request가 끝나면 로딩 상태를 false로 변경
        if (response.data.length > 0) {
          playTTS(response.data);
        } else {
          playTTS("인식되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // error가 발생해도 로딩 상태를 false로 변경
        playTTS("네트워크 연결이 불안정합니다.");
      });
  };

  useEffect(() => {
    let interval;
    if (isLoading) {
      setIsLoadingAudioPlaying(true);
      // playTTS("로딩중입니다.");
      interval = setInterval(() => {
        setLoadingImage((prev) =>
          prev === loadingOn ? loadingOff : loadingOn
        );
      }, 1000);
    } else {
      setIsLoadingAudioPlaying(false);
      setLoadingImage(loadingOff);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

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

  const playTTS = (tempReadingText) => {
    if(isLoadingAudioPlaying) return;

    setIsLoading(false);
    const formData = new FormData();
    formData.append("speaker", sessionStorage.getItem("speaker"));
    formData.append("speed", Number(sessionStorage.getItem("speed")));
    formData.append("text", tempReadingText);

    //https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts
    axios
      .post(
        "https://cors.bridged.cc/https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts",
        formData,
        {
          headers: {
            "x-cors-api-key": process.env.REACT_APP_X_CORS_API_KEY,
            "Content-Type": "application/x-www-form-urlencoded",
            "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NCP_TTS_ID,
            "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NCP_TTS_KEY,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const audios = URL.createObjectURL(response.data);
        setOverlayMessage(tempReadingText);
        const audio = new Audio(audios);
        audio.onended = () => {
          setIsOverlayVisible(false);
          setIsLoading(false);
        };
        audio.onplay = () => {
          setIsOverlayVisible(!isLoading);
        };
        if (!isLoading) {
          audio.play();
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const constraints = { video: { facingMode: "environment" } };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("An error occurred: " + err);
      });
  }, []);

  return (
    <div 
      className="camera"
      onClick={() => {
        if (isHelpBoxVisible) {
          playAudio(true); // stop the audio
          setIsHelpBoxVisible(false); // close the help box
        }
        setUserInteracted(!userInteracted); // toggle userInteracted state
      }}
    >
      {isLoading && (
        <div className="loading">
          <img src={loadingImage} alt="Loading..." className="loading-image" />
        </div>
      )}
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
              맞춤 정보 설정
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
      <audio
        controls
        ref={audioRef}
        src={audioSource}
        className="audio"
        autoPlay
      />
      <div className="camera-view">
        <video
          ref={videoRef}
          autoPlay={true}
          playsInline={true}
          preload={"auto"}
          muted
        />
      </div>
      <div
        className={`capture-area ${isLoading ? "loading" : ""}`}
        onClick={captureImage}
      />
      {imageData}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <audio controls src={TTSAudio} className="audio" autoPlay />
      <OverlayMessage isVisible={isHelpBoxVisible} message={helpBoxMessage} />
      <OverlayMessage isVisible={isOverlayVisible} message={overlayMessage} />
    </div>
  );  
}
export default Camera;
