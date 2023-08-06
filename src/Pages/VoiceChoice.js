import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import BackgroundLogo from "../components/BackgroundLogo";
import VoiceButton from "../components/VoiceChoice/VoiceButton";
import SaveButton from "../components/VoiceChoice/SaveButton";

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateAreas: `
              'a b'
              'c d'
            `,
  gridGap: "20px",
  width: "90%",
  height: "100%",
  marginBottom: "0px",
};

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
    <div className="container">
      <BackgroundLogo />
      <div className="header">
        <Header
          title="음성 선택"
          skipLink="/splashImage/custom/voiceChoice/speedChoice"
          skipOnClick={handleSkip}
        />
      </div>
      <div className="content">
        <Box
          sx={{
            display: "grid",
            width: "100%",
            height: "90%",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Box sx={gridContainer}>
            <VoiceButton
              speaker={speaker}
              handleButtonClick={handleButtonClick}
            />
          </Box>
        </Box>
      </div>
      <div className="footer">
        <SaveButton handleSave={handleSave} />
      </div>
      <audio ref={audioRef} src={audioSource} hidden />
    </div>
  );
};

export default VoiceChoice;
