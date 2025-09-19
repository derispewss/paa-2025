import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react"
import "./style/fonts.css"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      <SpeedInsights />
    </Router>
  );
}

export default App;
