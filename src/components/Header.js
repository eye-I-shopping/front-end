import React from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "./Header.module.css";
import LogoIm from "../image/headerLogo.png";

function Header() {
  return (
    <Box className={styles.header}>
      <img className={styles.logo} src={LogoIm} alt="Logo" />
      <Typography variant="h5">음성 선택</Typography>
      <Box className={styles.skipButtonContainer}>
        <Button color="inherit">건너뛰기</Button>
      </Box>
    </Box>
  );
}

export default Header;
