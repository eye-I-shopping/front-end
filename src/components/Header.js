import React from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

function Header({ title, skipLink, skipOnClick, subTitle = "건너뛰기" }) {
  return (
    <HeaderContainer>
      <Typography
        sx={{
          fontSize: "32px",
          margin: "30px 40px",
        }}
      >
        {title}
      </Typography>
      <Button
        sx={{ fontSize: "15px", padding: "30px 30px" }}
        color="inherit"
        component={Link}
        to={skipLink}
        onClick={skipOnClick}
      >
        {subTitle}
      </Button>
    </HeaderContainer>
  );
}

export default Header;
