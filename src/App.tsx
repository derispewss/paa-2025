import MainPage from "./pages/MainPage";
import ParallaxPages from "./pages/Parallax";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style/fonts.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<ParallaxPages />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
