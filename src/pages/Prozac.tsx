import { useState } from "react";
import "../App.css";
import { BlurredText, CRTMonitor } from "../components/CRTMonitor";
import styles from "../components/CRTMonitor.module.css";
import ProzacPill from "../assets/prozac_pill.png";
import prozacNation from '../assets/ProzacNation.wav';


const Intro = ({ onClick }: { onClick: () => void }) => (
  <div className={styles.textContainer} onClick={onClick}>
    <BlurredText
      text="Press me"
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
      text="To Download"
      blur={1000}
      rgbOffset={10}
      style={{ fontSize: "8vw", lineHeight: 1 }}
    />
  </div>
);

const handleDownload = async (): Promise<void> => {
  try {
    // Fetch the file as a blob
    const response: Response = await fetch(prozacNation);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const blob: Blob = await response.blob();

    // Create the download link
    const url: string = window.URL.createObjectURL(blob);
    const link: HTMLAnchorElement = document.createElement('a');
    
    link.href = url;
    link.download = 'prozac-nation.wav'; // Suggest the filename

    // Append to body, trigger click, and cleanup
    document.body.appendChild(link);
    link.click();
    
    // Cleanup DOM and memory
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error instanceof Error ? error.message : error);
  }
};

function Prozac() {
  const [showIntro, setShowIntro] = useState(true);
  const [audio] = useState(new Audio(prozacNation));


  const startAudio = () => {
    audio.play()
      .then(() => {
        setShowIntro(false)
        handleDownload();
      })
      .catch(error => console.log("Autoplay blocked:", error));
  };


  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <CRTMonitor active={!showIntro} strings={["Enjoy"]}/>
      {showIntro && <Intro onClick={startAudio} />}
    </div>
  );
}

export default Prozac;
