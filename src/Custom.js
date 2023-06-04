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
import Header from "./components/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#977CC9",
    },
  },
});

const Custom = () => {
  const [infoChoice, setInfoChoice] = useState({
    taste: false,
    allergy: false,
    package: false,
    cooking: false,
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
  };

  const BoxOption = ({ name, icon, label }) => (
    <Box
      onClick={handleToggle(name)}
      backgroundColor="lightgray"
      sx={{
        border: "2px solid white",
        borderRadius: "25px",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
              onChange={() => {}}
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
        skipLink="/splashImage/custom/voiceChoice"
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
            gridTemplateColumns: "repeat(1, 1fr)",
            gridTemplateRows: "repeat(5, 1fr)",
            gridGap: "20px",
            padding: "30px",
            borderRadius: "40px 40px 0 0",
            width: "70%",
            marginBottom: "0",
            height: "85vh",
            backgroundColor: "#977CC9",
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
              border: "2px solid white",
              backgroundColor: "white",
              borderRadius: "25px",
              color: "black",
              fontSize: "calc(1.5vw + 1.5vh)",
            }}
          >
            저장하기
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Custom;
