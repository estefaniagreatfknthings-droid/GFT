import { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fitText } from "@remotion/layout-utils";
import { displayFontFamily } from "./font";
import {
  BIG_WORDS,
  BIG_WORD_CENTER_Y,
  BIG_WORD_MAX_SIZE,
  BIG_WORD_MAX_WIDTH,
  type BigWord,
} from "./bigWords";

const COLOR = "#FFD60A";
const LETTER_SPACING = "0.005em";

const Word: React.FC<{ word: BigWord }> = ({ word }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeMs = (frame / fps) * 1000;

  const fontSize = useMemo(() => {
    const { fontSize: fitted } = fitText({
      text: word.text.toUpperCase(),
      withinWidth: BIG_WORD_MAX_WIDTH,
      fontFamily: displayFontFamily,
      fontWeight: "400",
      letterSpacing: LETTER_SPACING,
      validateFontIsLoaded: false,
    });
    return Math.min(fitted, BIG_WORD_MAX_SIZE);
  }, [word.text]);

  // entrada seca con rebote, para que golpee a la vez que la palabra hablada
  const enter = spring({
    frame,
    fps,
    config: { damping: 11, mass: 0.5, stiffness: 240 },
    durationInFrames: 18,
  });
  const exit = interpolate(
    timeMs,
    [word.durationMs - 320, word.durationMs],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: BIG_WORD_CENTER_Y - fontSize * 0.5,
      }}
    >
      <div
        style={{
          fontFamily: displayFontFamily,
          fontWeight: 400,
          fontSize,
          lineHeight: 0.9,
          color: COLOR,
          textTransform: "uppercase",
          letterSpacing: LETTER_SPACING,
          textAlign: "center",
          whiteSpace: "pre",
          // borde oscuro suave: el amarillo tiene poco contraste sobre el cristal claro
          WebkitTextStroke: "7px rgba(0,0,0,0.5)",
          paintOrder: "stroke fill",
          opacity: enter * exit,
          scale: interpolate(enter, [0, 1], [1.18, 1]),
          translate: `0px ${interpolate(enter, [0, 1], [26, 0])}px`,
          filter:
            "drop-shadow(0 0 38px rgba(255,214,10,0.38)) drop-shadow(0 14px 38px rgba(0,0,0,0.5))",
        }}
      >
        {word.text}
      </div>
    </AbsoluteFill>
  );
};

export const BigWords: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      {BIG_WORDS.map((word) => (
        <Sequence
          key={word.atMs}
          from={Math.round((word.atMs / 1000) * fps)}
          durationInFrames={Math.round((word.durationMs / 1000) * fps)}
        >
          <Word word={word} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
