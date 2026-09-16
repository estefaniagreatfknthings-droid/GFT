import { BIG_WORDS } from "./bigWords";

/** Amplitud máxima del temblor, en píxeles de composición */
const AMPLITUDE = 14;
/** Fotogramas que tarda en apagarse */
const DECAY_FRAMES = 3.4;

export type ShakeOffset = { x: number; y: number; rotate: number };

const NONE: ShakeOffset = { x: 0, y: 0, rotate: 0 };

/**
 * Sacudida de cámara en cada golpe grave: arranca fuerte y se apaga en unos
 * 10 fotogramas, como el retroceso de una cámara al recibir un impacto.
 */
export const getShake = (frame: number, fps: number): ShakeOffset => {
  for (const word of BIG_WORDS.filter((w) => w.hit)) {
    const start = (word.atMs / 1000) * fps;
    const t = frame - start;
    if (t < 0 || t > 14) {
      continue;
    }
    const decay = Math.exp(-t / DECAY_FRAMES);
    return {
      x: Math.sin(t * 2.7) * AMPLITUDE * decay,
      y: Math.cos(t * 3.9) * AMPLITUDE * 0.65 * decay,
      rotate: Math.sin(t * 3.1) * 0.45 * decay,
    };
  }
  return NONE;
};
