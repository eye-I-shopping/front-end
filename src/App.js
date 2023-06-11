import { HashRouter, Route, Routes } from "react-router-dom";
import MainScreen from "./MainScreen";
import SplashImage from "./SplashImage";
import Custom from "./Custom";
import VoiceChoice from "./VoiceChoice";
import SpeedChoice from "./SpeedChoice";
import Camera from "./Camera";
import Camera1 from "./Camera1";
import Camera2 from "./Camera2";
import Camera3 from "./Camera3";
import Camera4 from "./Camera4";
import Camera5 from "./Camera5";
import Camera6 from "./Camera6";
import CameraCustom from "./CameraCustom";

const App = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/splashImage" element={<SplashImage />} />
        <Route path="/splashImage/custom" element={<Custom />} />
        <Route
          path="/splashImage/custom/voiceChoice"
          element={<VoiceChoice />}
        />
        <Route
          path="/splashImage/custom/voiceChoice/speedChoice"
          element={<SpeedChoice />}
        />
        <Route
          path="/splashImage/custom/voiceChoice/speedChoice/camera"
          element={<Camera />}
        />
        <Route
          path="/splashImage/custom/voiceChoice/speedChoice/camera1"
          element={<Camera1 />}
        />
        <Route
          path="/splashImage/custom/voiceChoice/speedChoice/camera2"
          element={<Camera2 />}
        />
        <Route
          path="/splashImage/custom/voiceChoice/speedChoice/camera3"
          element={<Camera3 />}
        />
        <Route
          path="/splashImage/custom/voiceChoice/speedChoice/camera4"
          element={<Camera4 />}
        />
        <Route
          path="/splashImage/custom/voiceChoice/speedChoice/camera5"
          element={<Camera5 />}
        />
        <Route
          path="/splashImage/custom/voiceChoice/speedChoice/camera6"
          element={<Camera6 />}
        />
        <Route
          path="/splashImage/custom/voiceChoice/speedChoice/camera/cameraCustom"
          element={<CameraCustom />}
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
