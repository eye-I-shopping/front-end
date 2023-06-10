import React from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header({ title, skipLink, skipOnClick }) {
  return (
    <Box className={styles.header}>
      <Typography
        sx={{
          fontSize: "calc(2.3vh + 2.3vw)",
          position: "relative",
          top: "5px",
        }}
      >
        {title}
      </Typography>
      <Box className={styles.skipButtonContainer}>
        <Button
          color="inherit"
          component={Link}
          to={skipLink}
          onClick={skipOnClick}
        >
          건너뛰기
        </Button>
      </Box>
    </Box>
  );
}

export default Header;
