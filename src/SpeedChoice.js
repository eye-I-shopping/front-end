import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Header from "./components/Header";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import BackgroundLogo from "./components/BackgroundLogo";

const SpeedChoice = () => {
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef();

  const speedFiles = useMemo(
    () => ({
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
    }),
    []
  );

  const speedValue = {
    1: 0,
    2: -3,
    3: -5,
  };

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

  const handleSave = () => {
    try {
      sessionStorage.setItem("speed", speedValue[speed]);

      const getId = sessionStorage.getItem("id");
      const getUserSet = sessionStorage.getItem("userSettings");
      const getSpeaker = sessionStorage.getItem("speaker");
      const getSpeed = sessionStorage.getItem("speed");

      const formData = new FormData();
      formData.append("id", getId);
      formData.append("userSettings", getUserSet);
      formData.append("speaker", getSpeaker);
      formData.append("speed", getSpeed);

      axios
        .post("https://eyeshopping.shop/settings", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error sending data to the server", error);
        });
    } catch (error) {
      console.error("An error occurred while preparing the request", error);
    }
  };

  return (
    <div className="container">
      <BackgroundLogo />
      <div className="header">
        <Header
          title="음성 속도 조절"
          skipLink="/splashImage/custom/voiceChoice/speedChoice/camera"
          skipOnClick={() => {
            handleSave();
            sessionStorage.setItem("speed", 0);
          }}
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
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "repeat(2, 1fr)",
              gridTemplateAreas: `
            'a a'
            'b b'
          `,
              gridGap: "20px",
              width: "90%",
              height: "100%",
              backgroundColor: "transparent",
            }}
          >
            <IconButton
              onClick={() => handleSpeedChange("increase")}
              sx={{
                backgroundColor: "rgba(151, 151, 151, 0.2)",
                position: "resolve",
                justifyContent: "center",
                gridArea: "a",
                color: "black",
                borderRadius: "50px",
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
              UP
            </IconButton>
            <IconButton
              onClick={() => handleSpeedChange("decrease")}
              sx={{
                backgroundColor: "rgba(151, 151, 151, 0.2)",
                position: "resolve",
                justifyContent: "center",
                gridArea: "b",
                color: "black",
                borderRadius: "50px",
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
              DOWN
            </IconButton>
          </Box>
        </Box>
      </div>
      <div className="footer">
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          component={Link}
          to="/splashImage/custom/voiceChoice/speedChoice/camera"
          sx={{
            width: "90%",
            height: "80%",
            backgroundColor: "#bebebe",
            borderRadius: "40px",
            color: "black",
            fontSize: "25px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
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
      </div>
      <audio ref={audioRef} autoPlay />
    </div>
  );
};

export default SpeedChoice;
