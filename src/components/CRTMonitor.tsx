import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import styles from "./CRTMonitor.module.css";

const width = 1280;
const height = 720;

export const BlurredText = ({
  blur,
  rgbOffset,
  text,
  style,
}: {
  blur: number;
  rgbOffset: number;
  text: string;
  style?: CSSProperties;
}) => (
  <motion.div
    className={styles.text}
    style={{
      filter: `blur(${
        3 + (1 / blur) * 0.5
      }px) drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))`,
      textShadow: `
           
                ${(rgbOffset * 1.5) / 15}vw ${rgbOffset / 15}vw 15px rgba(255, 0, 0, 0.5),
                ${-rgbOffset / 15}vw -${rgbOffset / 30}vw 15px rgba(0, 255, 255, 0.5)
              `,
      opacity: 0.6 + rgbOffset * 1,
      ...style,
    }}
  >
    {text}
  </motion.div>
);

export const TypedText = ({
  text,
  rgbOffset,
  blur,
  onComplete,
}: {
  text: string;
  rgbOffset: number;
  blur: number;
  onComplete?: () => void;
}) => {
  const [typedText, setTypedText] = useState("");

  // Typing effect for text
  useEffect(() => {
    const interval = setInterval(() => {
      setTypedText((prev) => {
        if (prev.length < text.length) {
          return text.substring(0, prev.length + 1);
        }
        onComplete?.();
        clearInterval(interval);
        return prev;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [text, typedText.length, onComplete]);
  return (
    <div className={styles.textContainer}>
      <BlurredText text={typedText} rgbOffset={rgbOffset} blur={blur} />
    </div>
  );
};

const STRINGS = [
  "HELLO",
  "WORLD",
  "LOOKING",
  "FOR",
  "SOMETHING",
  "TO",
  "BELIEVE",
  "IN",
];

const TextTyper = ({
  strings = STRINGS,
  rgbOffset,
  blur,
}: {
  strings?: string[];
  rgbOffset: number;
  blur: number;
}) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);

  const handleComplete = () =>
    setCurrentStringIndex((prev) =>
      prev === strings.length - 1 ? 0 : prev + 1,
    );

  return (
    <TypedText
      text={strings[currentStringIndex]}
      rgbOffset={rgbOffset}
      blur={blur}
      onComplete={handleComplete}
      key={strings[currentStringIndex]}
    />
  );
};

export function CRTMonitor({ active = false }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
  const [blur, setBlur] = useState(80);
  const [noiseOpacity, setNoiseOpacity] = useState(2.5);
  const [rgbOffset, setRgbOffset] = useState(10);
  const [layerOffset, setLayerOffset] = useState(100);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const [displayText, setDisplayText] = useState("JETLAG");
  const [animationKey, setAnimationKey] = useState(0);
  const [tearIntensity, setTearIntensity] = useState(100);

  const fullText = displayText;

  // Draw SMPTE color bars on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // SMPTE color bars - top section (75% height)
    const topHeight = height * 0.75;
    const barWidth = width / 7;

    const topColors = [
      "#c0c0c0", // 75% White
      "#c0c000", // 75% Yellow
      "#00c0c0", // 75% Cyan
      "#00c000", // 75% Green
      "#c000c0", // 75% Magenta
      "#c00000", // 75% Red
      "#0000c0", // 75% Blue
    ];

    // Draw top color bars
    topColors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(i * barWidth, 0, barWidth, topHeight);
    });

    // Middle section - reverse bars (7% height)
    const middleY = topHeight;
    const middleHeight = height * 0.07;

    const middleColors = [
      "#0000c0", // Blue
      "#000000", // Black
      "#c000c0", // Magenta
      "#000000", // Black
      "#00c0c0", // Cyan
      "#000000", // Black
      "#c0c0c0", // White
    ];

    middleColors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(i * barWidth, middleY, barWidth, middleHeight);
    });

    // Bottom section - PLUGE and -I/+Q (remaining height)
    const bottomY = middleY + middleHeight;
    const bottomHeight = height - bottomY;

    // Left side - PLUGE pattern
    const plugeWidth = width * (5 / 28);
    ctx.fillStyle = "#001a33"; // -I
    ctx.fillRect(0, bottomY, plugeWidth, bottomHeight);

    // White section
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(plugeWidth, bottomY, plugeWidth, bottomHeight);

    // +I section
    ctx.fillStyle = "#331a00";
    ctx.fillRect(plugeWidth * 2, bottomY, plugeWidth, bottomHeight);

    // Black reference
    ctx.fillStyle = "#000000";
    ctx.fillRect(plugeWidth * 3, bottomY, plugeWidth * (8 / 5), bottomHeight);

    // Pluge bars (right side)
    const plugeBarWidth = width * (3 / 28);
    const plugeStartX = width - plugeBarWidth * 3;

    ctx.fillStyle = "#030303"; // Below black
    ctx.fillRect(plugeStartX, bottomY, plugeBarWidth, bottomHeight);

    ctx.fillStyle = "#000000"; // Black
    ctx.fillRect(
      plugeStartX + plugeBarWidth,
      bottomY,
      plugeBarWidth,
      bottomHeight,
    );

    ctx.fillStyle = "#0a0a0a"; // Above black
    ctx.fillRect(
      plugeStartX + plugeBarWidth * 2,
      bottomY,
      plugeBarWidth,
      bottomHeight,
    );
  }, []);

  // Animate noise
  useEffect(() => {
    const noiseCanvas = noiseCanvasRef.current;
    if (!noiseCanvas) return;

    const ctx = noiseCanvas.getContext("2d");
    if (!ctx) return;

    const width = noiseCanvas.width;
    const height = noiseCanvas.height;

    let animationId: number;

    const drawNoise = () => {
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // RGB noise - each channel gets its own random value
        data[i] = Math.random() * 255; // R
        data[i + 1] = Math.random() * 255; // G
        data[i + 2] = Math.random() * 255; // B
        data[i + 3] = 255; // A
      }

      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(drawNoise);
    };

    drawNoise();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Animate blur and noise over time
  useEffect(() => {
    const interval = setInterval(() => {
      const time = Date.now() / 1000;

      // Increased blur range (0 to 8px)
      const blurValue = 5 + Math.abs(Math.sin(time * 0.3) * 12);
      setBlur(blurValue);

      // Noise opacity (0.1 to 0.33)
      const noiseValue = 0.3 + Math.abs(Math.sin(time * 0.5) * 0.23);
      setNoiseOpacity(noiseValue);

      // RGB offset for chromatic aberration (0 to 6px)
      const rgbOffsetValue = Math.abs(Math.sin(time * 0.4) * 6);
      setRgbOffset(rgbOffsetValue);

      // Layer offset (0 to 5px)
      const layerOffsetValue = Math.abs(Math.sin(time * 0.6) * 5);
      // setLayerOffset(layerOffsetValue);

      // VHS tear intensity (occasionally triggers tear effect)
      const tearValue =
        Math.sin(time * 0.8) > -0.8 && Math.sin(time * 0.8) < 0.6
          ? Math.random() * 100
          : 0;

      setTearIntensity(tearValue);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Typing effect for text
  useEffect(() => {
    setTypedText(""); // Reset typed text
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [fullText, animationKey]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={styles.container}>
        {/* CRT Frame */}
        <div className={styles.crtFrame}>
          {/* Red Channel Layer - offset and blurred */}
          <motion.canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={styles.canvas}
            style={{
              filter: `blur(${blur * 1.2}px) brightness(1.2)`,
              transform: `translate(${-rgbOffset}px, ${-layerOffset * 0.5}px)`,
              opacity: 0.7,
            }}
          />

          {/* Green Channel Layer - base layer with medium blur */}
          <motion.canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={styles.canvas}
            style={{
              filter: `blur(${blur}px) brightness(1.1)`,
              transform: `translate(0px, ${layerOffset}px)`,
              opacity: 0.8,
            }}
          />

          {/* Blue Channel Layer - offset opposite direction */}
          <motion.canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={styles.canvas}
            style={{
              filter: `blur(${blur * 0.8}px) brightness(1.15)`,
              transform: `translate(${rgbOffset}px, ${layerOffset * 0.7}px)`,
              opacity: 0.75,
            }}
          />

          {/* Noise Overlay */}
          <motion.canvas
            ref={noiseCanvasRef}
            width={width}
            height={height}
            className={styles.noiseCanvas}
            style={{
              opacity: noiseOpacity,
            }}
          />

          {/* Scanlines */}
          <div className={styles.scanlines} />

          {/* Screen curvature effect */}
          <div className={styles.curvature} />

          {/* Vignette */}
          <div className={styles.vignette} />

          {/* Screen reflection/glare */}
          <div className={styles.glare} />

          {/* VHS Tear Effect */}

          <div className={styles.vhsTear} style={{ opacity: tearIntensity }}>
            <div
              className={styles.tearEffect}
              style={{
                top: `${Math.random() * 60 + 20}%`,
                opacity: tearIntensity * 0.7,
              }}
            />
            <div
              className={styles.scanlineTear}
              style={{
                top: `${Math.random() * 80}%`,
                opacity: tearIntensity * 0.5,
              }}
            />
          </div>
        </div>
      </div>

      {active && <TextTyper rgbOffset={rgbOffset} blur={blur} />}
    </>
  );
}
