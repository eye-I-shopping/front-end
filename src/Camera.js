import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Modal, Typography } from "@mui/material";
import {
  HelpOutline as HelpIcon,
  SettingsVoice as VoiceSettingIcon,
} from "@mui/icons-material";
import "./Camera.css";
import axios from "axios";
import HelpBox from "./components/HelpBox";

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    // axios
    //   .post("http://192.168.196.233:80/api/test2", formData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    axios
      .post("https://eyeishopping.shop/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
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

  const handleHelpClick = () => {
    setShowHelp((prevShowHelp) => !prevShowHelp);
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

  const handleModalOpen = () => {
    setIsModalOpen(true);
    // 오디오 파일 로직 추가
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

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
              sx={{ height: "10vh", width: "50vw" }}
              color="inherit"
              startIcon={<HelpIcon />}
              onClick={handleModalOpen}
            >
              사용방법
            </Button>
          </div>
          <div className="toolbar-button">
            <Button
              component={Link}
              to="/splashImage/voiceChoice"
              sx={{ height: "10vh", width: "50vw" }}
              color="inherit"
              startIcon={<VoiceSettingIcon />}
            >
              음성 설정
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className="camera-view">
        <video ref={videoRef} autoPlay={true} playsInline={true} />
      </div>
      {showHelp && <HelpBox />}
      <div className="capture-area" onClick={captureImage} />
      {imageData && (
        <a
          href={imageData}
          download="capture.png"
          style={{ display: "none" }}
          ref={(link) => link && link.click()}
        />
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modal-container">
          <Typography variant="h5" align="center" sx={{ mb:2 }}>
            안녕하세요.
          </Typography>
        </div>
      </Modal>
    </div>
  );
}

export default Camera;
