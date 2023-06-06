import React, { useState, useEffect } from "react";

const OverlayMessage = ({ isVisible, message, duration }) => {
  const typingSpeed = 100; // 한 글자를 타이핑하는데 걸리는 시간(ms)

  const [text, setText] = useState("");

  useEffect(() => {
    setText("");
  }, [message]);

  useEffect(() => {
    let timerId;
    if (text.length < message.length) {
      timerId = setTimeout(() => {
        setText(message.slice(0, text.length + 1));
      }, typingSpeed);
    }

    return () => clearTimeout(timerId);
  }, [text, message]);

  return (
    isVisible && (
      <div
        style={{
          position: "fixed",
          top: "35%",
          bottom: "35%",
          left: "10%",
          right: "10%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "15px",
          padding: "20px",
          zIndex: 100,
          boxSizing: "border-box",
          fontSize: "calc(1.5vw + 1.5vh)",
        }}
      >
        {text}
      </div>
    )
  );
};

export default OverlayMessage;
