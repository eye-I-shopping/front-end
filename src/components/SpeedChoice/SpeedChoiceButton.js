import React from "react";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
const SpeedChoiceButton = ({ handleSpeedChange }) => {
  return (
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
  );
};

export default SpeedChoiceButton;
