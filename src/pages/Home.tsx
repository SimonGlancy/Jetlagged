import { useMemo, useState } from "react";
import "../App.css";
import { BlurredText, FullScreenCRTMonitor } from "../components/CRTMonitor";
import styles from "../components/CRTMonitor.module.css";
import ProzacPill from "../assets/prozac_pill.png";
import Layout from "../components/Layout";

export const Signup = ({
  setLoading,
  setSuccess,
  setError,
  loading,
}: {
  setLoading: (loading: boolean) => void;
  setSuccess: (success: boolean) => void;
  setError: (error: boolean) => void;
  loading?: boolean;
}) => {
  const [inputText, setInputText] = useState("");
  const handleEmailSubmit = async () => {
    setLoading(true);

    await fetch(`/api/subscribe`, {
      method: "POST",
      body: JSON.stringify({
        email: inputText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setInputText("");
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.error("Fetch failed:", err);
      });
  };

  return (
    <div className={styles.form}>
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
        {loading ? "..." : "JOIN"}
      </button>
    </div>
  );
};

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
      style={{ width: 500 }}
    />
    <BlurredText
      text="Pr0zac nation"
      blur={1000}
      rgbOffset={10}
      style={{ fontSize: "8vw", lineHeight: 1 }}
    />
  </div>
);

export const useApiSideEffects = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return {
    success,
    setSuccess,
    error,
    setError,
    loading,
    setLoading,
  };
};

function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const { success, setSuccess, loading, setLoading, error, setError } =
    useApiSideEffects();

  const strings = useMemo(() => {
    if (!success && !error && !loading) {
      return undefined;
    }

    if (loading) {
      return ["Loading"];
    }

    return success
      ? ["Thank you", "We'll be in touch"]
      : ["Whoops something went wrong"];
  }, [success, error, loading]);

  return (
    <Layout>
      <FullScreenCRTMonitor active={!showIntro} strings={strings} />
      {showIntro && <Intro onClick={() => setShowIntro(false)} />}

      {/* Controls */}
      {!showIntro && (
        <div className={styles.controls}>
          <Signup
            setError={setError}
            setLoading={setLoading}
            setSuccess={setSuccess}
            loading={loading}
          />
        </div>
      )}
    </Layout>
  );
}

export default Home;
