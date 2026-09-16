import { Sequence, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { ZOOMS } from "./zooms";
import { BIG_WORDS } from "./bigWords";
import { STICKERS } from "./stickers";

/**
 * Cada sonido tiene su golpe en un punto distinto del archivo, así que se
 * lanzan con adelanto para que el impacto caiga justo en el fotograma clave.
 */
const WHOOSH_LEAD_MS = 240;
const IMPACT_LEAD_MS = 80;

const WHOOSH_VOLUME = 0.3;
const IMPACT_VOLUME = 0.42;
const POP_VOLUME = 0.38;

export const Sfx: React.FC = () => {
  const { fps } = useVideoConfig();
  const at = (ms: number) => Math.max(0, Math.round((ms / 1000) * fps));
  const len = (seconds: number) => Math.round(seconds * fps);

  return (
    <>
      {ZOOMS.map((zoom) => (
        <Sequence
          key={`zoom-${zoom.atMs}`}
          from={at(zoom.atMs - WHOOSH_LEAD_MS)}
          durationInFrames={len(0.65)}
        >
          <Audio src={staticFile("sfx/whoosh.mp3")} volume={WHOOSH_VOLUME} />
        </Sequence>
      ))}

      {BIG_WORDS.map((word) => (
        <Sequence
          key={`word-${word.atMs}`}
          from={at(word.atMs - IMPACT_LEAD_MS)}
          durationInFrames={len(1.05)}
        >
          <Audio src={staticFile("sfx/impact.mp3")} volume={IMPACT_VOLUME} />
        </Sequence>
      ))}

      {STICKERS.map((sticker) => (
        <Sequence
          key={`sticker-${sticker.atMs}`}
          from={at(sticker.atMs)}
          durationInFrames={len(0.25)}
        >
          <Audio src={staticFile("sfx/pop.mp3")} volume={POP_VOLUME} />
        </Sequence>
      ))}
    </>
  );
};
