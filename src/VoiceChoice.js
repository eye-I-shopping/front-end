import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import BackgroundLogo from "./components/BackgroundLogo";
import VoiceButton from "./components/VoiceChoice/VoiceButton";

const VoiceChoice = () => {
  const [audioSource, setAudioSource] = useState("");
  const [speaker, setSpeaker] = useState(
    sessionStorage.getItem("speaker") || "nes_c_mikyung"
  );
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = "/mp3/voiceChoice.mp3";
      audioRef.current.load();
      audioRef.current.oncanplaythrough = async () => {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error("playback error", error);
        }
      };
    }
  }, []);

  const handleButtonClick = (audioFile, speaker) => {
    setAudioSource(audioFile);
    setSpeaker(speaker);
    if (audioRef.current) {
      audioRef.current.src = audioFile;
      audioRef.current.load();
      audioRef.current.oncanplaythrough = async () => {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error("playback error", error);
        }
      };
    }
  };
  const handleSave = () => {
    sessionStorage.setItem("speaker", speaker);
  };

  const handleSkip = () => {
    setAudioSource("");
    setSpeaker("nes_c_mikyung");
    sessionStorage.setItem("speaker", "nes_c_mikyung");
  };

  return (
    <>
      <Header
        title="음성 선택"
        skipLink="/splashImage/custom/voiceChoice/speedChoice"
        skipOnClick={handleSkip}
      />
      <BackgroundLogo />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          height: "89vh",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateAreas: `
              'a b'
              'c d'
              'e e'
            `,
            gridGap: "20px",
            padding: "30px",
            borderRadius: "40px 40px 0 0",
            width: "90%",
            marginBottom: "0px",
            height: "80.5vh",
            backgroundColor: "white",
          }}
        >
          <VoiceButton speaker={speaker} onClick={handleButtonClick} />
          <Button
            onClick={handleSave}
            variant="Outlined"
            component={Link}
            to="/splashImage/custom/voiceChoice/speedChoice"
            sx={{
              height: "15vh",
              backgroundColor: "#BEBEBE",
              borderRadius: "55px",
              gridArea: "e",
              color: "black",
              fontSize: "calc(2vw + 2vh)",
              marginBottom: "80px",
              marginTop: "17px",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "#977CC9", // hover color
                color: "white",
              },
              "&:active": {
                backgroundColor: "#977CC9", // active color
                color: "white",
              },
            }}
          >
            저장하기
          </Button>
        </Box>
      </Box>
      <audio ref={audioRef} src={audioSource} hidden />
    </>
  );
};

export default VoiceChoice;
