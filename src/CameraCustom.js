import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Switch,
  FormControlLabel,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import BackgroundLogo from "./components/BackgroundLogo";
import Header from "./components/Header";
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

  const [infoChoice, setInfoChoice] = useState({
    taste: dec[0] === "1" ? 1 : 0,
    allergy: dec[1] === "1" ? 1 : 0,
    package: dec[2] === "1" ? 1 : 0,
    cooking: dec[3] === "1" ? 1 : 0,
  });

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
      <Header
        title="맞춤 정보 설정"
        skipLink="/splashImage/custom/voiceChoice/speedChoice/camera"
      />
      <BackgroundLogo />
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
            to="/splashImage/custom/voiceChoice/speedChoice/camera"
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
    </ThemeProvider>
  );
};

export default CameraCustom;
