import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style/fonts.css"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
