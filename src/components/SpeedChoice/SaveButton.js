import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SaveButton = ({ handleSave }) => {
  return (
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
  );
};

export default SaveButton;
