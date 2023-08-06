import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Switch,
  FormControlLabel,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Header from "./components/Header";
import BackgroundLogo from "./components/BackgroundLogo";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#977CC9",
    },
  },
});

const CameraCustom = () => {
  const userSettings = parseInt(sessionStorage.getItem("userSettings"));
  let dec = userSettings.toString(2);

  const [playFlag, setPlayFlag] = useState(false);
  const [infoChoice, setInfoChoice] = useState({
    taste: dec[0] === "1" ? 1 : 0,
    allergy: dec[1] === "1" ? 1 : 0,
    package: dec[2] === "1" ? 1 : 0,
    cooking: dec[3] === "1" ? 1 : 0,
  });

  const audioRef = useRef();
  useEffect(() => {
    const timerId = setTimeout(() => {
      setPlayFlag(true);
    }, 100);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (playFlag) {
      const audio = audioRef.current;
      audio.src = "/mp3/custom.mp3";
      audio.load();
      audio.oncanplaythrough = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.error("playback error", error);
        }
      };
    }
  }, [playFlag, audioRef]);

  const handleToggle = (name) => () => {
    setInfoChoice((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSave = () => {
    const tasteValue = infoChoice.taste ? 1 : 0;
    const allergyValue = infoChoice.allergy ? 2 : 0;
    const packageValue = infoChoice.package ? 4 : 0;
    const cookingValue = infoChoice.cooking ? 8 : 0;

    const userSettings =
      tasteValue + allergyValue + packageValue + cookingValue;

    sessionStorage.setItem("userSettings", userSettings);

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
        console.log("Error sending data to the server", error);
      });
  };

  const BoxOption = ({ name, label }) => (
    <Box
      onClick={handleToggle(name)}
      sx={{
        width: "90%",
        height: "100%",
        borderRadius: "50px",
        backgroundColor: "rgba(151, 151, 151, 0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <span style={{ marginLeft: 40 }}>{label}</span>
      <ThemeProvider theme={theme}>
        <FormControlLabel
          control={
            <Switch
              checked={infoChoice[name]}
              onClick={(event) => event.stopPropagation()}
              onChange={handleToggle(name)}
              name={name}
              color="primary"
            />
          }
          label=""
          sx={{ marginLeft: "auto" }}
        />
      </ThemeProvider>
    </Box>
  );

  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <BackgroundLogo />
        <div className="header">
          <Header
            title="맞춤 정보 설정"
            subTitle=""
            skipLink="/splashImage/custom/voiceChoice"
            skipOnClick={() => {
              sessionStorage.setItem("userSettings", 0);
            }}
          />
        </div>
        <div className="content">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gridTemplateRows: "repeat(4, 1fr)",
              gridGap: "20px",
              width: "100%",
              height: "90%",
              backgroundColor: "transparent",
              fontSize: "20px",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <BoxOption name="taste" label="맛 정보 확인" />
            <BoxOption name="allergy" label="알레르기 정보 확인" />
            <BoxOption name="package" label="포장 형태 확인" />
            <BoxOption name="cooking" label="조리방법 및 주의사항 확인" />
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
        <audio ref={audioRef} hidden />
      </ThemeProvider>
    </div>
  );
};

export default CameraCustom;
