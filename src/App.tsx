import "./App.css";

import { BlurredText, CRTMonitor } from "./components/CRTMonitor";
import styles from "./components/CRTMonitor.module.css";
import ProzacPill from "./assets/prozac_pill.png";
import { useState } from "react";

const Intro = ({ onClick }: { onClick: () => void }) => (
  <div className={styles.textContainer} onClick={onClick}>
    <BlurredText
      text="Jetlag"
      rgbOffset={10}
      blur={1000}
      style={{ lineHeight: 1 }}
    />
    <img
      src={ProzacPill}
      alt="Prozac Pill"
      style={{ width: "25vw", filter: "blur(2px)", marginBottom: 32 }}
    />
    <BlurredText
      text="Prozac nation"
      blur={1000}
      rgbOffset={10}
    />
  </div>
);

function App() {
  const [inputText, setInputText] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* <Cover /> */}
      <CRTMonitor active={!showIntro} />
      {showIntro && <Intro onClick={() => setShowIntro(false)} />}

      {/* Controls */}
      {!showIntro && (
        <div className={styles.controls}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your email"
            className={styles.input}
          />
          <button
            onClick={() => alert(`Added: ${inputText}`)}
            className={styles.button}
          >
            JOIN
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
