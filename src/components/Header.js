import React from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "./Header.module.css";
import LogoIm from "../image/headerLogo.png";
import { Link } from "react-router-dom";

function Header({ title, skipLink }) {
  return (
    <Box className={styles.header}>
      <img className={styles.logo} src={LogoIm} alt="Logo" />
      <Typography variant="h5">{title}</Typography>
      <Box className={styles.skipButtonContainer}>
        <Button color="inherit" component={Link} to={skipLink}>건너뛰기</Button>
      </Box>
    </Box>
  );
}

export default Header;
