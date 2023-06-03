import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Header from "./components/Header";
import IconButton from "@mui/material/IconButton";
import KeyboardControlKeyOutlinedIcon from "@mui/icons-material/KeyboardControlKeyOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const SpeedChoice = () => {
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef();

  const speedFiles = {
    0: "/mp3/feedback_static.mp3", // For initial speed choice
    1: {
      decrease: "/mp3/feedback1_decrease.mp3",
      increase: "/mp3/feedback1_increase.mp3",
    },
    2: {
      decrease: "/mp3/feedback2_decrease.mp3",
      increase: "/mp3/feedback2_increase.mp3",
    },
    3: {
      decrease: "/mp3/feedback3_decrease.mp3",
      increase: "/mp3/feedback3_increase.mp3",
    },
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = speedFiles[0];
      audioRef.current.load();
      audioRef.current.oncanplaythrough = async () => {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error("playback error", error);
        }
      };
    }
  }, [speedFiles]);

  const handleSpeedChange = (direction) => {
    if (direction === "increase" && speed < 3) {
      setSpeed(speed + 1);
    } else if (direction === "decrease" && speed > 1) {
      setSpeed(speed - 1);
    }

    let newAudioFile = speedFiles[speed][direction];
    if (audioRef.current) {
      audioRef.current.src = newAudioFile;
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

  return (
    <>
      <Header
        title="음성 속도 조절"
        skipLink="/splashImage/custom/voiceChoice/speedChoice/camera"
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
              'a a'
              'b b'
              'c c'
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
          <IconButton
            onClick={() => handleSpeedChange("increase")}
            sx={{
              color: "white",
              position: "resolve",
              justifyContent: "center",
              gridArea: "a",
              borderRadius: "25px",
            }}
          >
            <KeyboardControlKeyOutlinedIcon
              sx={{ fontSize: "calc(7vw + 7vh)" }}
            />
          </IconButton>
          <IconButton
            onClick={() => handleSpeedChange("decrease")}
            sx={{
              color: "white",
              position: "resolve",
              justifyContent: "center",
              gridArea: "b",
              borderRadius: "25px",
            }}
          >
            <KeyboardArrowDownOutlinedIcon
              sx={{ fontSize: "calc(7vw + 7vh)" }}
            />
          </IconButton>
          <Button
            variant="Outlined"
            component={Link}
            to="/splashImage/custom/voiceChoice/speedChoice/camera"
            sx={{
              backgroundColor: "white",
              borderRadius: "25px",
              gridArea: "c",
              color: "black",
              fontSize: "calc(1.5vw + 1.5vh)",
            }}
          >
            저장하기
          </Button>
        </Box>
      </Box>
      <audio ref={audioRef} autoPlay />
    </>
  );
};

export default SpeedChoice;
