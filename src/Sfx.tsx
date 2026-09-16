import { Sequence, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { ZOOMS } from "./zooms";
import { BIG_WORDS } from "./bigWords";
import { STICKERS } from "./stickers";
import { IMPACTS, POPS, WHOOSHES, type SfxClip } from "./sfxPalette";

const WHOOSH_VOLUME = 0.3;
const IMPACT_VOLUME = 0.26;
const POP_VOLUME = 0.38;

type Event = { atMs: number; clip: SfxClip; volume: number };

/**
 * Reparte los clips en rotación: con cuatro variantes y diez zooms, ninguna
 * suena dos veces seguidas y cada una aparece dos o tres veces en todo el vídeo.
 */
const rotate = (
  times: number[],
  clips: SfxClip[],
  volume: number,
): Event[] =>
  times.map((atMs, index) => ({
    atMs,
    clip: clips[index % clips.length],
    volume,
  }));

export const Sfx: React.FC = () => {
  const { fps } = useVideoConfig();

  const events: Event[] = [
    ...rotate(ZOOMS.map((z) => z.atMs), WHOOSHES, WHOOSH_VOLUME),
    ...rotate(BIG_WORDS.map((w) => w.atMs), IMPACTS, IMPACT_VOLUME),
    ...rotate(STICKERS.map((s) => s.atMs), POPS, POP_VOLUME),
  ];

  return (
    <>
      {events.map((event) => {
        // se lanza con adelanto para que el golpe del archivo caiga en el fotograma exacto
        const startMs = event.atMs - event.clip.leadMs;
        return (
          <Sequence
            key={`${event.clip.file}-${event.atMs}`}
            from={Math.max(0, Math.round((startMs / 1000) * fps))}
            durationInFrames={Math.round(event.clip.durationSec * fps)}
          >
            <Audio src={staticFile(event.clip.file)} volume={event.volume} />
          </Sequence>
        );
      })}
    </>
  );
};
