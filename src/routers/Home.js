import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Camera from "../Camera";
import StartScreen from "../SplashImage";

function index() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </Router>
  );
}

export default index;
