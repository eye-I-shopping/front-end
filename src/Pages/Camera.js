import React, { useRef, useState, useEffect } from "react";
import "../Camera.css";
import CameraHeader from "../components/Camera/CameraHeader";
import CameraView from "../components/Camera/CameraView";
import OverlayMessage from "../components/OverlayMessage";
import camerButton from "../image/cameraButton.png";

const CameraButtonStyle = {
  zIndex: 1,
  width: "50%",
  height: "auto",
  position: "absolute",
  top: "75%",
  left: "30%",
  display: "none",
};

function Camera() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [TTSAudio, setTTSAudio] = useState(null);
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
        }
      })
      .catch((err) => {
        console.error("카메라 접근 에러: " + err);
      });
  }, []);

  const handleHelpClick = () => {
    if (overlayMessage === promptMessage) {
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
      setIsOverlayVisible(true);
    }
  };

  const handleAudioEnd = () => {
    setTTSAudio(null);
    setOverlayMessage("");
    setIsOverlayVisible(false);
  };

  return (
    <div className="camera">
      <CameraHeader handleHelpClick={handleHelpClick} />
      <CameraView
        videoRef={videoRef}
        audioRef={audioRef}
        setTTSAudio={setTTSAudio}
        setIsOverlayVisible={setIsOverlayVisible}
        setOverlayMessage={setOverlayMessage}
      />
      <img src={camerButton} alt="카메라 버튼" style={CameraButtonStyle}></img>
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
