import { Sequence, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { ZOOMS } from "./zooms";
import { BIG_WORDS } from "./bigWords";
import { STICKERS } from "./stickers";
import { IMPACTS, POP, WHOOSHES, type SfxClip } from "./sfxPalette";

const WHOOSH_VOLUME = 0.3;
const IMPACT_VOLUME = 0.26;
const POP_VOLUME = 0.38;

type Event = { atMs: number; clip: SfxClip; volume: number };

export const Sfx: React.FC = () => {
  const { fps } = useVideoConfig();

  const events: Event[] = [
    // los barridos van rotando para que ninguno suene dos veces seguidas
    ...ZOOMS.filter((zoom) => zoom.hit).map((zoom, index) => ({
      atMs: zoom.atMs,
      clip: WHOOSHES[index % WHOOSHES.length],
      volume: WHOOSH_VOLUME,
    })),
    ...BIG_WORDS.filter((word) => word.hit).map((word, index) => ({
      atMs: word.atMs,
      clip: IMPACTS[index % IMPACTS.length],
      volume: IMPACT_VOLUME,
    })),
    ...STICKERS.map((sticker) => ({
      atMs: sticker.atMs,
      clip: POP,
      volume: POP_VOLUME,
    })),
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
