import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const Custom = () => {
  const [infoChoice, setInfoChoice] = useState({
    taste: false,
    allergy: false,
    package: false,
    cooking: false,
  });

  const handleChange = (event) => {
    setInfoChoice({ ...infoChoice, [event.target.name]: event.target.checked });
  };

  const handleSave = () => {
    console.log(infoChoice);
    // TODO: Save to session storage or send to server
  };

  return (
    <>
      <Header
        title="맞춤 정보 설정"
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
            gridTemplateColumns: "repeat(1, 1fr)",
            gridTemplateRows: "repeat(5, 1fr)",
            gridGap: "20px",
            padding: "30px",
            borderRadius: "40px 40px 0 0",
            width: "70%",
            marginBottom: "0",
            height: "85vh",
            backgroundColor: "#977CC9",
          }}
        >
          <Box
            sx={{
              border: "2px solid white",
              borderRadius: "25px",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={infoChoice.taste}
                  onChange={handleChange}
                  name="taste"
                  color="primary"
                />
              }
              label="맛 정보 확인"
              labelPlacement="start"
            />
          </Box>
          <Box
            sx={{
              border: "2px solid white",
              borderRadius: "25px",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={infoChoice.allergy}
                  onChange={handleChange}
                  name="allergy"
                  color="primary"
                />
              }
              label="알레르기 정보 확인"
              labelPlacement="start"
            />
          </Box>
          <Box
            sx={{
              border: "2px solid white",
              borderRadius: "25px",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={infoChoice.package}
                  onChange={handleChange}
                  name="package"
                  color="primary"
                />
              }
              label="포장 형태 확인"
              labelPlacement="start"
            />
          </Box>
          <Box
            sx={{
              border: "2px solid white",
              borderRadius: "25px",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={infoChoice.cooking}
                  onChange={handleChange}
                  name="cooking"
                  color="primary"
                />
              }
              label="조리방법 및 주의사항 확인"
              labelPlacement="start"
            />
          </Box>
          <Button
            onClick={handleSave}
            variant="outlined"
            color="primary"
            component={Link}
            to="/splashImage/custom/voiceChoice/speedChoice/camera"
            sx={{
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
    </>
  );
};

export default Custom;
