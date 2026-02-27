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
      className={styles.pill}
    />
    <BlurredText
      text="Prozac nation"
      blur={1000}
      rgbOffset={10}
      style={{ fontSize: "8vw", lineHeight: 1 }}
    />
  </div>
);

const apiKey = import.meta.env.VITE_OCTOPUS_API_KEY
const listId = import.meta.env.VITE_OCTOPUS_LIST_ID
const baseUrl = import.meta.env.DEV ? '/email-api' : 'https://api.emailoctopus.com';

function App() {
  const [inputText, setInputText] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  

  const handleEmailSubmit = async() => {
    await fetch(`${baseUrl}/lists/${listId}/contacts`, {
      method: "POST",
      body: JSON.stringify({
        email_address: inputText,
        status: "subscribed"
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    }).then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("Fetch failed:", err));
  }

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
            onClick={handleEmailSubmit}
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
