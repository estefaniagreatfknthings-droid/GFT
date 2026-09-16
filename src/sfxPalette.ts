export type SfxClip = {
  file: string;
  /** Milisegundos desde el inicio del archivo hasta su golpe, medidos sobre la onda */
  leadMs: number;
  durationSec: number;
};

/** Barridos de aire para los tres zooms sonorizados */
export const WHOOSHES: SfxClip[] = [
  { file: "sfx/whoosh-a.mp3", leadMs: 237, durationSec: 0.6 },
  { file: "sfx/whoosh-b.mp3", leadMs: 20, durationSec: 0.57 },
  { file: "sfx/whoosh-c.mp3", leadMs: 289, durationSec: 0.73 },
];

/** Golpes graves para los tres remates */
export const IMPACTS: SfxClip[] = [
  { file: "sfx/impact-a.mp3", leadMs: 83, durationSec: 1.0 },
  { file: "sfx/impact-b.mp3", leadMs: 228, durationSec: 2.0 },
  { file: "sfx/impact-c.mp3", leadMs: 1, durationSec: 0.78 },
];

/** Tic de los iconos: siempre el mismo, para que sea un gesto reconocible */
export const POP: SfxClip = {
  file: "sfx/pop-a.mp3",
  leadMs: 1,
  durationSec: 0.16,
};
