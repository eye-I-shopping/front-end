import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "./components/Header"; // 해당 경로에 따라 수정해주세요

const App = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end", // 박스를 화면 하단에 배치
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateAreas: `
              'a b'
              'c d'
              'e e'
            `,
            gridGap: "20px",
            backgroundColor: "purple",
            padding: "30px",
            borderRadius: "10% 10% 0 0",
            width: "70%",
            marginBottom: "0",
            height: "90vh",
            backgroundColor: "#977CC9",
          }}
        >
          <Button
            variant="Outlined"
            color="primary"
            sx={{
              backgroundColor: "lightgray",
              borderRadius: "15%",
              gridArea: "a",
              color: "black",
              fontSize: "25px",
            }}
          >
            성인 남성
          </Button>
          <Button
            variant="Outlined"
            color="primary"
            sx={{
              backgroundColor: "lightgray",
              borderRadius: "15%",
              gridArea: "b",
              color: "black",
              fontSize: "25px",
            }}
          >
            성인 여성
          </Button>
          <Button
            variant="Outlined"
            color="primary"
            sx={{
              backgroundColor: "lightgray",
              borderRadius: "15%",
              gridArea: "c",
              color: "black",
              fontSize: "25px",
            }}
          >
            남자 아이
          </Button>
          <Button
            variant="Outlined"
            color="primary"
            sx={{
              backgroundColor: "lightgray",
              borderRadius: "15%",
              gridArea: "d",
              color: "black",
              fontSize: "25px",
            }}
          >
            여자 아이
          </Button>
          <Button
            variant="Outlined"
            color="primary"
            sx={{
              backgroundColor: "white",
              variant: "contained",
              color: "primary",
              borderRadius: "15%",
              gridArea: "e",
              color: "black",
              fontSize: "30px",
            }}
          >
            저장하기
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default App;
