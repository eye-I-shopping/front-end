import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import {
  HelpOutline as HelpIcon,
  SettingsVoice as VoiceSettingIcon,
} from "@mui/icons-material";
import "./Camera.css";
import axios from "axios";
import HelpBox from "./components/HelpBox";
import WidgetsIcon from "@mui/icons-material/Widgets";

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [TTSAudio, setTTSAudio] = useState(null);
  const [isHelpBoxVisible, setIsHelpBoxVisible] = useState(false);

  const handleHelpClick = () => {
    setIsHelpBoxVisible(!isHelpBoxVisible);
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 10, 10, video.videoWidth, video.videoHeight);

    const dataUrl = canvas.toDataURL("image/jpg");
    setImageData(dataUrl);

    // Convert dataUrl to Blob
    const blob = dataUrltoBlob(dataUrl);

    // Create a FormData and append the Blob data
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
        console.log(response);
        if (response.data.length > 0) {
          playTTS(response.data);
        } else {
          playTTS("인식되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
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

  const playTTS = (tempReadingText) => {
    const formData = new FormData();
    formData.append("speaker", "nes_c_mikyung");
    formData.append("text", tempReadingText);

    //https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts
    axios
      .post(
        "https://cors.bridged.cc/https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts",
        formData,
        {
          headers: {
            "x-cors-api-key": "temp_43175142e5f2685eac1bfb5548c01de8",
            "Content-Type": "application/x-www-form-urlencoded",
            "X-NCP-APIGW-API-KEY-ID": "ph9wqvtot6",
            "X-NCP-APIGW-API-KEY": "ZchMYX2neSv2fc4kAL1915MVFBUJ9FZfstip5ITQ",
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        console.log(response);
        const audios = URL.createObjectURL(response.data);
        setTTSAudio(audios);
      })
      .catch((error) => {
        console.log(error);
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
      <audio controls src={TTSAudio} className="audio" autoPlay />
      <div className="camera-view">
        <video
          ref={videoRef}
          autoPlay={true}
          playsInline={true}
          preload={"auto"}
          muted
        />
      </div>
      <div className="capture-area" onClick={captureImage} />
      {imageData}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {isHelpBoxVisible && (
        <div>
          <HelpBox />
        </div>
      )}
    </div>
  );
}
export default Camera;
