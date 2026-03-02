import "./App.css";

import { BlurredText, CRTMonitor } from "./components/CRTMonitor";
import styles from "./components/CRTMonitor.module.css";
import ProzacPill from "./assets/prozac_pill.png";
import { useMemo, useState } from "react";

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



function App() {
  const [inputText, setInputText] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleEmailSubmit = async() => {
    setLoading(true)

    await fetch(`/api/subscribe`, {
      method: "POST",
      body: JSON.stringify({
        email: inputText,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => res.json())
      .then(() => {
        setInputText("")
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.error("Fetch failed:", err)
      });
  }

  const strings = useMemo(() => {
    if (!success && !error && !loading) {
      return undefined
    }

    if (loading) {
      return ["Loading"]
    }

    return success ? ["Thank you", "We'll be in touch"] : ["Whoops something went wrong"]
  }, [success, error, loading])

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* <Cover /> */}
      <CRTMonitor active={!showIntro} strings={strings}/>
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
            disabled={loading}
          />
          <button
            onClick={handleEmailSubmit}
            className={styles.button}
            disabled={loading}
          >
           {loading ? "..." : "JOIN"   } 
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
