import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "./components/Header";

const VoiceChoice = () => {
  const [audioSource, setAudioSource] = useState("");
  const audioRef = useRef();

  const handleButtonClick = (audioFile, speaker) => {
    setAudioSource(audioFile);
    sessionStorage.setItem("speaker", speaker);
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
    const speaker = sessionStorage.getItem("speaker");
  };

  return (
    <>
      <Header
        title="음성 선택"
        skipLink="/splashImage/custom/voiceChoice/speedChoice"
        skipOnClick={() => {
          handleButtonClick("", "nes_c_mikyung");
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          height: "100vh",
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
            width: "70%",
            marginBottom: "0",
            height: "85vh",
            backgroundColor: "#977CC9",
          }}
        >
          <Button
            onClick={() => handleButtonClick("/mp3/Jinho.mp3", "jinho")}
            variant="Outlined"
            color="primary"
            sx={{
              fontSize: "calc(1.5vw + 1.5vh)",
              backgroundColor: "lightgray",
              borderRadius: "25px",
              gridArea: "a",
              color: "black",
            }}
          >
            성인 남성
          </Button>
          <Button
            onClick={() => handleButtonClick("/mp3/Mikyung.mp3", "nes_c_mikyung")}
            variant="contained"
            color="inherit"
            sx={{
              backgroundColor: "lightgray",
              borderRadius: "25px",
              gridArea: "b",
              color: "black",
              fontSize: "calc(1.5vw + 1.5vh)",
            }}
          >
            성인 여성
          </Button>
          <Button
            onClick={() => handleButtonClick("/mp3/Hajoon.mp3", "nhajun")}
            variant="Outlined"
            color="primary"
            sx={{
              backgroundColor: "lightgray",
              borderRadius: "25px",
              gridArea: "c",
              color: "black",
              fontSize: "calc(1.5vw + 1.5vh)",
            }}
          >
            남자 아이
          </Button>
          <Button
            onClick={() => handleButtonClick("/mp3/Dain.mp3", "ndain")}
            variant="Outlined"
            color="primary"
            sx={{
              backgroundColor: "lightgray",
              borderRadius: "25px",
              gridArea: "d",
              color: "black",
              fontSize: "calc(1.5vw + 1.5vh)",
            }}
          >
            여자 아이
          </Button>
          <Button
            onClick={handleSave}
            variant="Outlined"
            color="primary"
            component={Link}
            to="/splashImage/custom/voiceChoice/speedChoice"
            sx={{
              backgroundColor: "white",
              borderRadius: "25px",
              gridArea: "e",
              color: "black",
              fontSize: "calc(1.5vw + 1.5vh)",
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
