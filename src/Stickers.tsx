import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  IconChat,
  IconCoins,
  IconDocument,
  IconMoney,
  IconReturn,
  IconScales,
  IconSearch,
  IconProtection,
  IconVoid,
} from "./icons";
import {
  STICKERS,
  STICKER_OFFSET_X,
  STICKER_SIZE,
  type Sticker,
  type StickerName,
} from "./stickers";

const ICONS: Record<StickerName, React.FC> = {
  document: IconDocument,
  scales: IconScales,
  void: IconVoid,
  money: IconMoney,
  return: IconReturn,
  coins: IconCoins,
  stroller: IconProtection,
  search: IconSearch,
  chat: IconChat,
};

const ACCENT = "#FFD60A";
const BADGE = "rgba(12, 14, 18, 0.82)";

const StickerBadge: React.FC<{ sticker: Sticker }> = ({ sticker }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const Icon = ICONS[sticker.icon];

  const enter = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 170 },
    durationInFrames: 16,
  });

  const exitFrame = (sticker.durationMs / 1000) * fps - 8;
  const exit = interpolate(frame, [exitFrame, exitFrame + 8], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // flotación suave mientras se mantiene en pantalla
  const float = Math.sin((frame / fps) * 2.4) * 7;
  const dir = sticker.side === "left" ? -1 : 1;

  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "flex-start" }}
    >
      <div
        style={{
          position: "absolute",
          top: sticker.y - STICKER_SIZE / 2,
          left: 540 + dir * STICKER_OFFSET_X - STICKER_SIZE / 2,
          width: STICKER_SIZE,
          height: STICKER_SIZE,
          borderRadius: 46,
          background: BADGE,
          border: `4px solid ${ACCENT}`,
          color: ACCENT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 42,
          opacity: enter * exit,
          scale: interpolate(enter, [0, 1], [0.45, 1]),
          rotate: `${interpolate(enter, [0, 1], [dir * 14, dir * 3])}deg`,
          translate: `0px ${interpolate(enter, [0, 1], [26, float])}px`,
          boxShadow: "0 18px 44px rgba(0,0,0,0.45)",
          filter: "drop-shadow(0 0 26px rgba(255,214,10,0.30))",
        }}
      >
        <Icon />
      </div>
    </AbsoluteFill>
  );
};

export const Stickers: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      {STICKERS.map((sticker) => (
        <Sequence
          key={sticker.atMs}
          from={Math.round((sticker.atMs / 1000) * fps)}
          durationInFrames={Math.round((sticker.durationMs / 1000) * fps)}
        >
          <StickerBadge sticker={sticker} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
