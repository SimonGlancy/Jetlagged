import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Prozac from "./pages/Prozac";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/prozac-nation" element={<Prozac />} />
    </Routes>
  );
}

export default App;
