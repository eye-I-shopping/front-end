import { Route, Routes } from "react-router-dom";
import SplashImage from "./SplashImage";
import VoiceChoice from "./VoiceChoice";
import SpeedChoice from "./SpeedChoice";
import Camera from "./Camera";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashImage />} />
      <Route path="/voiceChoice" element={<VoiceChoice />} />
      <Route path="/voiceChoice/speedChoice" element={<SpeedChoice />} />
      <Route path="/voiceChoice/speedChoice/camera" element={<Camera />} />
    </Routes>
  );
}

export default App;
