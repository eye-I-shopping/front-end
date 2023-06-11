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

const theme = createTheme({
  palette: {
    primary: {
      main: "#977CC9",
    },
  },
});

const Custom = () => {
  const [playFlag, setPlayFlag] = useState(false);
  const [infoChoice, setInfoChoice] = useState({
    taste: false,
    allergy: false,
    package: false,
    cooking: false,
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
  };

  const BoxOption = ({ name, icon, label }) => (
    <Box
      onClick={handleToggle(name)}
      sx={{
        borderRadius: "55px",
        backgroundColor: "rgba(151, 151, 151, 0.1)",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", color: "black" }}>
        {icon}
        <Box component="span" sx={{ marginLeft: 5 }}>
          {label}
        </Box>
      </Box>
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
    <ThemeProvider theme={theme}>
      <BackgroundLogo />
      <Header
        title="맞춤 정보 설정"
        buttonLabel="건너뛰기"
        skipLink="/splashImage/custom/voiceChoice"
        skipOnClick={() => {
          sessionStorage.setItem("userSettings", 0);
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          height: "100vh",
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gridTemplateRows: "repeat(5, 1fr)",
            gridGap: "20px",
            padding: "80px",
            borderRadius: "40px 40px 0 0",
            width: "90%",
            marginBottom: "0",
            height: "85vh",
            backgroundColor: "transparent",
            fontSize: "calc(1.5vw + 1.5vh)",
          }}
        >
          <BoxOption name="taste" label="맛 정보 확인" />
          <BoxOption name="allergy" label="알레르기 정보 확인" />
          <BoxOption name="package" label="포장 형태 확인" />
          <BoxOption name="cooking" label="조리방법 및 주의사항 확인" />
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            component={Link}
            to="/splashImage/custom/voiceChoice"
            sx={{
              height: "15vh",
              backgroundColor: "#bebebe",
              borderRadius: "55px",
              color: "black",
              fontSize: "calc(2vw + 2vh)",
              marginBottom: "80px",
              marginTop: "20px",
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
      <audio ref={audioRef} hidden />
    </ThemeProvider>
  );
};

export default Custom;
