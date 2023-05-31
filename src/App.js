import { Route, Routes } from "react-router-dom";
import MainScreen from "./MainScreen";
import SplashImage from "./SplashImage";
import VoiceChoice from "./VoiceChoice";
import SpeedChoice from "./SpeedChoice";
import Camera from "./Camera";
import TTS from "./TTS";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/splashImage" element={<SplashImage />} />
      <Route path="/splashImage/voiceChoice" element={<VoiceChoice />} />
      <Route
        path="/splashImage/voiceChoice/speedChoice"
        element={<SpeedChoice />}
      />
      <Route
        path="/splashImage/voiceChoice/speedChoice/camera"
        element={<Camera />}
      />
    </Routes>
  );
}

export default App;
