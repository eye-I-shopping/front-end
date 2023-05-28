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
            padding: "30px",
            borderRadius: "40px 40px 0 0",
            width: "70%",
            marginBottom: "0",
            height: "85vh",
            backgroundColor: "#977CC9",
          }}
        >
          <Button
            variant="Outlined"
            color="primary"
            sx={{
              fontSize: "calc(1.5vw + 1.5vh)",
              backgroundColor: "lightgray",
              borderRadius: "25px",
              gridArea: "a",
              color: "black",
            }}
          >
            성인 남성
          </Button>
          <Button
            variant="Outlined"
            color="primary"
            sx={{
              backgroundColor: "lightgray",
              borderRadius: "25px",
              gridArea: "b",
              color: "black",
              fontSize: "calc(1.5vw + 1.5vh)",
            }}
          >
            성인 여성
          </Button>
          <Button
            variant="Outlined"
            color="primary"
            sx={{
              backgroundColor: "lightgray",
              borderRadius: "25px",
              gridArea: "c",
              color: "black",
              fontSize: "calc(1.5vw + 1.5vh)",
            }}
          >
            남자 아이
          </Button>
          <Button
            variant="Outlined"
            color="primary"
            sx={{
              backgroundColor: "lightgray",
              borderRadius: "25px",
              gridArea: "d",
              color: "black",
              fontSize: "calc(1.5vw + 1.5vh)",
            }}
          >
            여자 아이
          </Button>
          <Button
            variant="Outlined"
            color="primary"
            sx={{
              backgroundColor: "white",
              borderRadius: "25px",
              gridArea: "e",
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

export default App;
