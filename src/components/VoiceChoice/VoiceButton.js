import React from "react";
import { Button } from "@mui/material";
const VoiceButton = ({ speaker, handleButtonClick }) => {
  return (
    <>
      <Button
        onClick={() => handleButtonClick("/mp3/Jinho.mp3", "jinho")}
        variant="Outlined"
        sx={{
          borderRadius: "55px",
          backgroundColor:
            speaker === "jinho" ? "#977CC9" : "rgba(151, 151, 151, 0.1)",
          color: speaker === "jinho" ? "#ffffff" : "#323232",
          gridArea: "a",
          fontSize: "calc(1.5vw + 1.5vh)",
          height: "26vh",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "#977CC9",
            color: "white",
          },
          "&:active": {
            backgroundColor: "#977CC9",
            color: "white",
          },
        }}
      >
        성인 남성
      </Button>
      <Button
        onClick={() => handleButtonClick("/mp3/Mikyung.mp3", "nes_c_mikyung")}
        variant="contained"
        sx={{
          borderRadius: "55px",
          backgroundColor:
            speaker === "nes_c_mikyung"
              ? "#977CC9"
              : "rgba(151, 151, 151, 0.1)",
          color: speaker === "nes_c_mikyung" ? "#ffffff" : "#323232",
          gridArea: "b",
          fontSize: "calc(1.5vw + 1.5vh)",
          height: "26vh",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "#977CC9",
            color: "white",
          },
          "&:active": {
            backgroundColor: "#977CC9",
            color: "white",
          },
        }}
      >
        성인 여성
      </Button>
      <Button
        onClick={() => handleButtonClick("/mp3/Hajoon.mp3", "nhajun")}
        variant="Outlined"
        sx={{
          borderRadius: "55px",
          backgroundColor:
            speaker === "nhajun" ? "#977CC9" : "rgba(151, 151, 151, 0.1)",
          color: speaker === "nhajun" ? "#ffffff" : "#323232",
          gridArea: "c",
          fontSize: "calc(1.5vw + 1.5vh)",
          height: "26vh",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "#977CC9",
            color: "white",
          },
          "&:active": {
            backgroundColor: "#977CC9",
            color: "white",
          },
        }}
      >
        남자 아이
      </Button>
      <Button
        onClick={() => handleButtonClick("/mp3/Dain.mp3", "ndain")}
        variant="Outlined"
        sx={{
          borderRadius: "55px",
          backgroundColor:
            speaker === "ndain" ? "#977CC9" : "rgba(151, 151, 151, 0.1)",
          color: speaker === "ndain" ? "#ffffff" : "#323232",
          gridArea: "d",
          fontSize: "calc(1.5vw + 1.5vh)",
          height: "26vh",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "#977CC9",
            color: "white",
          },
          "&:active": {
            backgroundColor: "#977CC9",
            color: "white",
          },
        }}
      >
        여자 아이
      </Button>
    </>
  );
};

export default VoiceButton;
