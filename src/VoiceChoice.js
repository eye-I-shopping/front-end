import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import BackgroundLogo from "./components/BackgroundLogo";

const VoiceChoice = () => {
  const [audioSource, setAudioSource] = useState("");
  const [speaker, setSpeaker] = useState("nes_c_mikyung");
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = "";
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
          <Button
            onClick={() => handleButtonClick("/mp3/Jinho.mp3", "jinho")}
            variant="Outlined"
            sx={{
              borderRadius: "55px",
              backgroundColor: "rgba(151, 151, 151, 0.1)",
              gridArea: "a",
              color: "black",
              fontSize: "calc(1.5vw + 1.5vh)",
              height: "26vh",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "#977CC9", // hover color
              },
              "&:active": {
                backgroundColor: "#977CC9", // active color
              },
            }}
          >
            성인 남성
          </Button>
          <Button
            onClick={() =>
              handleButtonClick("/mp3/Mikyung.mp3", "nes_c_mikyung")
            }
            variant="contained"
            sx={{
              borderRadius: "45px",
              backgroundColor: "rgba(151, 151, 151, 0.1)",
              gridArea: "b",
              color: "black",
              fontSize: "calc(1.5vw + 1.5vh)",
              height: "26vh",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "#977CC9", // hover color
              },
              "&:active": {
                backgroundColor: "#977CC9", // active color
              },
            }}
          >
            성인 여성
          </Button>
          <Button
            onClick={() => handleButtonClick("/mp3/Hajoon.mp3", "nhajun")}
            variant="Outlined"
            sx={{
              borderRadius: "45px",
              backgroundColor: "rgba(151, 151, 151, 0.1)",
              gridArea: "c",
              color: "black",
              fontSize: "calc(1.5vw + 1.5vh)",
              height: "26vh",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "#977CC9", // hover color
              },
              "&:active": {
                backgroundColor: "#977CC9", // active color
              },
            }}
          >
            남자 아이
          </Button>
          <Button
            onClick={() => handleButtonClick("/mp3/Dain.mp3", "ndain")}
            variant="Outlined"
            sx={{
              borderRadius: "45px",
              backgroundColor: "rgba(151, 151, 151, 0.1)",
              gridArea: "d",
              color: "black",
              fontSize: "calc(1.5vw + 1.5vh)",
              height: "26vh",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "#977CC9", // hover color
              },
              "&:active": {
                backgroundColor: "#977CC9", // active color
              },
            }}
          >
            여자 아이
          </Button>
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
