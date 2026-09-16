import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
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
  IconProtection,
  IconReturn,
  IconScales,
  IconSearch,
  IconVoid,
  type IconProps,
} from "./icons";
import {
  STICKERS,
  STICKER_OFFSET_X,
  STICKER_SIZE,
  type Sticker,
  type StickerName,
} from "./stickers";

const ICONS: Record<StickerName, React.FC<IconProps>> = {
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

const ACCENT = "#A8C7F9";
const BADGE = "rgba(12, 14, 18, 0.84)";
const RADIUS = 46;

const StickerBadge: React.FC<{ sticker: Sticker }> = ({ sticker }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const Icon = ICONS[sticker.icon];
  const dir = sticker.side === "left" ? -1 : 1;

  // Entrada seca: rebota por encima del 100% antes de asentarse
  const punch = spring({
    frame,
    fps,
    config: { damping: 9.5, mass: 0.42, stiffness: 280 },
    durationInFrames: 20,
  });

  // El trazo del icono se dibuja justo después de que aterrice la placa
  const draw = interpolate(frame, [2, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Onda de impacto que sale despedida en el golpe
  const burst = interpolate(frame, [0, 13], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Destello del borde en el instante del impacto
  const flash = interpolate(frame, [0, 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitFrame = (sticker.durationMs / 1000) * fps - 7;
  const exit = interpolate(frame, [exitFrame, exitFrame + 7], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad),
  });

  const float = Math.sin((frame / fps) * 2.2) * 6;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: sticker.y - STICKER_SIZE / 2,
          left: 540 + dir * STICKER_OFFSET_X - STICKER_SIZE / 2,
          width: STICKER_SIZE,
          height: STICKER_SIZE,
          opacity: exit,
          scale:
            interpolate(punch, [0, 1], [0.25, 1]) *
            interpolate(exit, [0, 1], [0.7, 1]),
          rotate: `${interpolate(punch, [0, 1], [dir * 16, dir * 3])}deg`,
          translate: `0px ${interpolate(punch, [0, 1], [34, float])}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: RADIUS,
            border: `5px solid ${ACCENT}`,
            opacity: (1 - burst) * 0.85,
            scale: interpolate(burst, [0, 1], [1, 1.75]),
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: RADIUS,
            background: BADGE,
            border: `4px solid ${interpolateColors(flash, [0, 1], [ACCENT, "#FFFFFF"])}`,
            color: ACCENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 42,
            boxShadow: "0 18px 46px rgba(0,0,0,0.5)",
            filter: `drop-shadow(0 0 ${interpolate(flash, [0, 1], [26, 60])}px rgba(168,199,249,${interpolate(flash, [0, 1], [0.3, 0.7])}))`,
          }}
        >
          <Icon draw={draw} />
        </div>
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
