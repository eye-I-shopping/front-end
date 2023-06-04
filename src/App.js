import { Route, Routes } from "react-router-dom";
import MainScreen from "./MainScreen";
import SplashImage from "./SplashImage";
import Custom from "./Custom";
import VoiceChoice from "./VoiceChoice";
import SpeedChoice from "./SpeedChoice";
import Camera from "./Camera";
import CameraCustom from "./CameraCustom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/splashImage" element={<SplashImage />} />
      <Route path="/splashImage/custom" element={<Custom />} />
      <Route path="/splashImage/custom/voiceChoice" element={<VoiceChoice />} />
      <Route path="/splashImage/custom/voiceChoice/speedChoice" element={<SpeedChoice />} />
      <Route path="/splashImage/custom/voiceChoice/speedChoice/camera" element={<Camera />} />
      <Route path="/splashImage/custom/voiceChoice/speedChoice/camera/cameraCustom" element={<CameraCustom />} />
    </Routes>
  );
}

export default App;