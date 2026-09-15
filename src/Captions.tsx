import { useMemo } from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption, TikTokPage } from "@remotion/captions";
import { fitTextOnNLines } from "@remotion/layout-utils";
import { fontFamily } from "./font";

const SWITCH_CAPTIONS_EVERY_MS = 800;

const ACTIVE_COLOR = "#FFD60A";
const BASE_COLOR = "#FFFFFF";
const MAX_FONT_SIZE = 98;
const MAX_BOX_WIDTH = 800;
const LETTER_SPACING = "-0.02em";

const Word: React.FC<{
  text: string;
  isActive: boolean;
  enterFrame: number;
}> = ({ text, isActive, enterFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 200, mass: 0.4 },
    durationInFrames: 5,
  });

  const pop = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 11, mass: 0.35, stiffness: 190 },
    durationInFrames: 14,
  });

  return (
    <span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        color: isActive ? ACTIVE_COLOR : BASE_COLOR,
        opacity: enter,
        scale: isActive
          ? interpolate(pop, [0, 1], [1.15, 1])
          : interpolate(enter, [0, 1], [0.85, 1]),
        translate: isActive
          ? `0px ${interpolate(pop, [0, 1], [-14, 0])}px`
          : "0px 0px",
      }}
    >
      {text}
    </span>
  );
};

const CaptionPage: React.FC<{ page: TikTokPage }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const absoluteTimeMs = page.startMs + (frame / fps) * 1000;

  const fontSize = useMemo(() => {
    const { fontSize: fitted } = fitTextOnNLines({
      text: page.text.toUpperCase(),
      maxLines: 2,
      maxBoxWidth: MAX_BOX_WIDTH,
      fontFamily,
      fontWeight: "900",
      letterSpacing: LETTER_SPACING,
      validateFontIsLoaded: false,
    });
    return Math.min(fitted, MAX_FONT_SIZE);
  }, [page.text]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 440,
        paddingLeft: 100,
        paddingRight: 100,
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize,
          lineHeight: 1.12,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: LETTER_SPACING,
          WebkitTextStroke: "9px #000000",
          paintOrder: "stroke fill",
          filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.6))",
        }}
      >
        {page.tokens.map((token) => {
          const isActive =
            token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;
          const enterFrame = ((token.fromMs - page.startMs) / 1000) * fps;

          return (
            <Word
              key={`${token.fromMs}-${token.text}`}
              text={token.text}
              isActive={isActive}
              enterFrame={enterFrame}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Captions: React.FC<{ captions: Caption[] }> = ({ captions }) => {
  const { fps } = useVideoConfig();

  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions,
        combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
      }),
    [captions],
  );

  return (
    <AbsoluteFill>
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = (page.startMs / 1000) * fps;
        const endFrame = Math.min(
          nextPage ? (nextPage.startMs / 1000) * fps : Infinity,
          startFrame + (SWITCH_CAPTIONS_EVERY_MS / 1000) * fps,
        );
        const durationInFrames = endFrame - startFrame;

        if (durationInFrames <= 0) {
          return null;
        }

        return (
          <Sequence
            key={page.startMs}
            from={startFrame}
            durationInFrames={durationInFrames}
          >
            <CaptionPage page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
