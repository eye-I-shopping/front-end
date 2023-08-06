import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import {
  HelpOutline as HelpIcon,
  SettingsVoice as VoiceSettingIcon,
} from "@mui/icons-material";
import WidgetsIcon from "@mui/icons-material/Widgets";

const CameraHeader = ({ handleHelpClick }) => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className="appbar"
    >
      <Toolbar className="toolbar">
        <div className="toolbar-button">
          <Button
            component={Link}
            to="/splashImage/custom/voiceChoice/speedChoice/camera/cameraCustom"
            sx={{ height: "10vh", width: "33vw" }}
            color="inherit"
            startIcon={<WidgetsIcon />}
          >
            맞춤 정보 설정
          </Button>
        </div>
        <div className="toolbar-button">
          <Button
            onClick={handleHelpClick}
            sx={{ height: "10vh", width: "34vw" }}
            color="inherit"
            startIcon={<HelpIcon />}
          >
            사용방법
          </Button>
        </div>

        <div className="toolbar-button">
          <Button
            component={Link}
            to="/splashImage/custom/voiceChoice"
            sx={{ height: "10vh", width: "33vw" }}
            color="inherit"
            startIcon={<VoiceSettingIcon />}
          >
            음성 설정
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default CameraHeader;
