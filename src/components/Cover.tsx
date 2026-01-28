import { BlurredText } from "./CRTMonitor";
import ProzacPill from "../assets/prozac_pill.png";

const size = "600px";

const Cover = () => {
  return (
    <div
      style={{
        height: size,
        width: size,
        backgroundColor: "#E02A00",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 80,
        margin: "auto",
      }}
    >
      <BlurredText
        text="JETLAG"
        blur={80}
        rgbOffset={10}
        style={{ fontSize: 120, lineHeight: 1 }}
      />
      <img
        src={ProzacPill}
        alt="Prozac Pill"
        style={{ width: "320px", filter: "blur(2px)", marginBottom: 32 }}
      />
      <BlurredText
        text="Prozac nation"
        blur={1000}
        rgbOffset={10}
        style={{ fontSize: 62, lineHeight: 1 }}
      />
    </div>
  );
};

export default Cover;
