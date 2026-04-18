import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Prozac from "./pages/Prozac";
import Links from "./pages/Links";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/prozac-nation" element={<Prozac />} />
      <Route path="/links" element={<Links />} />
    </Routes>
  );
}

export default App;
