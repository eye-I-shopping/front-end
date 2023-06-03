import React from "react";

function HelpBox() {
  return (
    <div
      style={{
        position: "absolute",
        top: "13vh", // AppBar의 높이만큼 내려가도록 설정
        left: 0, // 화면 왼쪽에서 25% 위치에 배치
        width: "100%", // div의 너비를 50%로 설정
        height: "30%", // div의 높이를 50%로 설정
        backgroundColor: "rgba(128, 128, 128, 0.5)", // 반투명 검은색 배경
        color: "white", // 텍스트는 하얀색
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // 다른 요소들 위에 노출되도록 z-index 설정
      }}
    >
      <p
        style={{
          padding: "10px",
        }}
      >
        여기에 이런식으로 사용설명이 나오게끔? 나중에 읽어주는 것도 구현
      </p>
    </div>
  );
}

export default HelpBox;
