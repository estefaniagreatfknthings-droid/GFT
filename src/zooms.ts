export type Zoom = {
  /** Momento de la palabra clave, en milisegundos */
  atMs: number;
  /** Cuánto se mantiene el zoom antes de volver */
  holdMs: number;
  /** Cuánto acerca: 1.12 = 12% más cerca */
  scale: number;
  /** Palabra que dispara el zoom */
  word: string;
};

export const ZOOMS: Zoom[] = [
  { atMs: 2480, holdMs: 1200, scale: 1.14, word: "despiden" },
  { atMs: 6640, holdMs: 1300, scale: 1.12, word: "represalia" },
  { atMs: 10400, holdMs: 1500, scale: 1.15, word: "nulidad" },
  { atMs: 16880, holdMs: 1300, scale: 1.12, word: "reincorporar" },
  { atMs: 20000, holdMs: 1500, scale: 1.13, word: "salarios" },
  { atMs: 22800, holdMs: 1200, scale: 1.11, word: "indemnización" },
  { atMs: 26960, holdMs: 1300, scale: 1.13, word: "embarazada" },
  { atMs: 30080, holdMs: 1000, scale: 1.11, word: "nulo" },
  { atMs: 34560, holdMs: 1100, scale: 1.12, word: "demostrarlo" },
  { atMs: 41440, holdMs: 1700, scale: 1.15, word: "escríbenos" },
];

/** Cuánto tarda en acercarse / alejarse, en milisegundos */
export const ZOOM_IN_MS = 150;
export const ZOOM_OUT_MS = 320;
