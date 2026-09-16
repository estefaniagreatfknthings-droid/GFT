export type SfxClip = {
  file: string;
  /** Milisegundos desde el inicio del archivo hasta su golpe, medidos sobre la onda */
  leadMs: number;
  durationSec: number;
};

/** Barridos de aire para los zooms: dos originales y dos con el tono alterado */
export const WHOOSHES: SfxClip[] = [
  { file: "sfx/whoosh-a.mp3", leadMs: 237, durationSec: 0.6 },
  { file: "sfx/whoosh-b.mp3", leadMs: 20, durationSec: 0.57 },
  { file: "sfx/whoosh-c.mp3", leadMs: 289, durationSec: 0.73 },
  { file: "sfx/whoosh-d.mp3", leadMs: 17, durationSec: 0.48 },
];

/** Golpes graves para las palabras grandes */
export const IMPACTS: SfxClip[] = [
  { file: "sfx/impact-a.mp3", leadMs: 83, durationSec: 1.0 },
  { file: "sfx/impact-b.mp3", leadMs: 228, durationSec: 2.0 },
  { file: "sfx/impact-c.mp3", leadMs: 1, durationSec: 0.78 },
  { file: "sfx/impact-d.mp3", leadMs: 94, durationSec: 1.14 },
];

/** Tics secos para los iconos */
export const POPS: SfxClip[] = [
  { file: "sfx/pop-a.mp3", leadMs: 1, durationSec: 0.16 },
  { file: "sfx/pop-b.mp3", leadMs: 1, durationSec: 0.16 },
  { file: "sfx/pop-c.mp3", leadMs: 2, durationSec: 0.14 },
  { file: "sfx/pop-d.mp3", leadMs: 212, durationSec: 0.21 },
];
