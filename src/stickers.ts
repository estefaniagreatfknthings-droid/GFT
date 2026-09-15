export type StickerName =
  | "document"
  | "scales"
  | "void"
  | "money"
  | "return"
  | "coins"
  | "stroller"
  | "search"
  | "chat";

export type Sticker = {
  icon: StickerName;
  /** Cuándo entra, en milisegundos */
  atMs: number;
  durationMs: number;
  /** Lado del encuadre, para ir alternando */
  side: "left" | "right";
  /** Centro vertical en unidades de composición (1920 de alto) */
  y: number;
  /** Frase que apoya */
  supports: string;
};

export const STICKERS: Sticker[] = [
  { icon: "document", atMs: 700, durationMs: 1600, side: "left", y: 980, supports: "reclamas algo en tu empresa" },
  { icon: "scales", atMs: 7600, durationMs: 1700, side: "right", y: 960, supports: "la ley lo protege" },
  { icon: "void", atMs: 11200, durationMs: 1500, side: "left", y: 980, supports: "la nulidad del despido" },
  { icon: "money", atMs: 13400, durationMs: 1500, side: "right", y: 960, supports: "que te indemnicen" },
  { icon: "return", atMs: 17400, durationMs: 1600, side: "left", y: 980, supports: "reincorporar en la empresa" },
  { icon: "coins", atMs: 20600, durationMs: 1600, side: "right", y: 960, supports: "los salarios que perdiste" },
  { icon: "stroller", atMs: 27600, durationMs: 1700, side: "left", y: 980, supports: "si estás embarazada" },
  { icon: "search", atMs: 34900, durationMs: 1600, side: "right", y: 960, supports: "hay que demostrarlo" },
  { icon: "chat", atMs: 42000, durationMs: 1800, side: "left", y: 980, supports: "escríbenos por privado" },
];

/** Distancia del centro al centro del icono */
export const STICKER_OFFSET_X = 330;
export const STICKER_SIZE = 212;
