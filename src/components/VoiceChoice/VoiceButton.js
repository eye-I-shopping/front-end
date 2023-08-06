import React from "react";
import { Button } from "@mui/material";

const voiceData = [
  {
    label: "성인 남성",
    audioFile: "/mp3/Jinho.mp3",
    speaker: "jinho",
    gridArea: "a",
  },
  {
    label: "성인 여성",
    audioFile: "/mp3/Mikyung.mp3",
    speaker: "nes_c_mikyung",
    gridArea: "b",
  },
  {
    label: "남자 아이",
    audioFile: "/mp3/Hajoon.mp3",
    speaker: "nhajun",
    gridArea: "c",
  },
  {
    label: "여자 아이",
    audioFile: "/mp3/Dain.mp3",
    speaker: "ndain",
    gridArea: "d",
  },
];

const getVoiceButtonStyle = (currentSpeaker, speaker, gridArea) => ({
  borderRadius: "50px",
  backgroundColor:
    currentSpeaker === speaker ? "#977CC9" : "rgba(151, 151, 151, 0.1)",
  color: currentSpeaker === speaker ? "#ffffff" : "#323232",
  gridArea,
  fontSize: "20px",
  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: "#977CC9",
    color: "white",
  },
  "&:active": {
    backgroundColor: "#977CC9",
    color: "white",
  },
});

const VoiceButton = ({ speaker: currentSpeaker, handleButtonClick }) => {
  return (
    <>
      {voiceData.map(({ label, audioFile, speaker, gridArea }) => (
        <Button
          key={speaker}
          onClick={() => handleButtonClick(audioFile, speaker)}
          variant="Outlined"
          sx={getVoiceButtonStyle(currentSpeaker, speaker, gridArea)}
        >
          {label}
        </Button>
      ))}
    </>
  );
};

export default VoiceButton;
