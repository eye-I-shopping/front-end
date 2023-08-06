import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import BackgroundLogo from "../components/BackgroundLogo";
import SaveButton from "../components/Custom/SaveButton";
import styled from "styled-components";
import BoxOption from "../components/Custom/BoxOption";

const BoxContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gridTemplateRows: "repeat(4, 1fr)",
  gridGap: "20px",
  width: "100%",
  height: "90%",
  backgroundColor: "transparent",
  fontSize: "20px",
  justifyItems: "center",
  alignItems: "center",
});

const Custom = () => {
  const [playFlag, setPlayFlag] = useState(false);
  const [infoChoice, setInfoChoice] = useState({
    taste: false,
    allergy: false,
    package: false,
    cooking: false,
  });

  const audioRef = useRef();
  useEffect(() => {
    const timerId = setTimeout(() => {
      setPlayFlag(true);
    }, 100);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (playFlag) {
      const audio = audioRef.current;
      audio.src = "/mp3/custom.mp3";
      audio.load();
      audio.oncanplaythrough = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.error("playback error", error);
        }
      };
    }
  }, [playFlag, audioRef]);

  const handleToggle = (name) => () => {
    setInfoChoice((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSave = () => {
    const tasteValue = infoChoice.taste ? 1 : 0;
    const allergyValue = infoChoice.allergy ? 2 : 0;
    const packageValue = infoChoice.package ? 4 : 0;
    const cookingValue = infoChoice.cooking ? 8 : 0;

    const userSettings =
      tasteValue + allergyValue + packageValue + cookingValue;

    sessionStorage.setItem("userSettings", userSettings);
  };

  return (
    <div className="container">
      <BackgroundLogo />
      <div className="header">
        <Header
          title="맞춤 정보 설정"
          skipLink="/splashImage/custom/voiceChoice"
          skipOnClick={() => {
            sessionStorage.setItem("userSettings", 0);
          }}
        />
      </div>
      <div className="content">
        <BoxContainer>
          <BoxOption
            name="taste"
            label="맛 정보 확인"
            infoChoice={infoChoice}
            handleToggle={handleToggle}
          />
          <BoxOption
            name="allergy"
            label="알레르기 정보 확인"
            infoChoice={infoChoice}
            handleToggle={handleToggle}
          />
          <BoxOption
            name="package"
            label="포장 형태 확인"
            infoChoice={infoChoice}
            handleToggle={handleToggle}
          />
          <BoxOption
            name="cooking"
            label="조리방법 및 주의사항 확인"
            infoChoice={infoChoice}
            handleToggle={handleToggle}
          />
        </BoxContainer>
      </div>
      <div className="footer">
        <SaveButton handleSave={handleSave} />
      </div>
      <audio ref={audioRef} hidden />
    </div>
  );
};

export default Custom;
