import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Header from "./components/Header";
import IconButton from "@mui/material/IconButton";
import KeyboardControlKeyOutlinedIcon from "@mui/icons-material/KeyboardControlKeyOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const SpeedChoice = () => {
  return (
    <>
      <Header title="음성 속도 조절" skipLink="/splashImage/voiceChoice/speedChoice/camera"/>
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
            gridGap: "5px",
            padding: "30px",
            borderRadius: "40px 40px 0 0",
            width: "70%",
            marginBottom: "0",
            height: "85vh",
            backgroundColor: "#977CC9",
          }}
        >
          <IconButton
            sx={{
              color: "white",
              position: "resolve",
              justifyContent: "center",
              gridArea: "a",
              borderRadius: "0",
            }}
          >
            <KeyboardControlKeyOutlinedIcon
              sx={{ fontSize: "calc(15vw + 15vh)" }}
            />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
              position: "resolve",
              justifyContent: "center",
              gridArea: "b",
              borderRadius: "0",
            }}
          >
            <KeyboardArrowDownOutlinedIcon
              sx={{ fontSize: "calc(15vw + 15vh)" }}
            />
          </IconButton>
          <Button
            variant="Outlined"
            component={Link}
            to="/splashImage/voiceChoice/speedChoice/camera"
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
    </>
  );
};

export default SpeedChoice;
