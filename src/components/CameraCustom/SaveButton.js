import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SaveButtonStyle = {
  width: "90%",
  height: "80%",
  backgroundColor: "#bebebe",
  borderRadius: "40px",
  color: "black",
  fontSize: "25px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: "#977CC9",
    color: "white",
  },
  "&:active": {
    backgroundColor: "#977CC9",
    color: "white",
  },
};

const SaveButton = ({ handleSave }) => {
  return (
    <Button
      onClick={handleSave}
      variant="Outlined"
      component={Link}
      to="/splashImage/custom/voiceChoice/speedChoice/camera"
      sx={SaveButtonStyle}
    >
      저장하기
    </Button>
  );
};

export default SaveButton;
