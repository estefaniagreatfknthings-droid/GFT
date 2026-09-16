export type BigWord = {
  text: string;
  /** Cuándo entra, en milisegundos */
  atMs: number;
  /** Cuánto permanece en pantalla */
  durationMs: number;
  /**
   * Marca los tres momentos que llevan golpe sonoro y sacudida de cámara:
   * el gancho, el concepto central y la llamada a la acción. El resto entran
   * en silencio para que los remates no pierdan fuerza por repetición.
   */
  hit?: boolean;
};

/** Palabras que salen en grande, por detrás del sujeto */
export const BIG_WORDS: BigWord[] = [
  { text: "Te despiden", atMs: 2380, durationMs: 1500, hit: true },
  { text: "Represalia", atMs: 6540, durationMs: 1700 },
  { text: "Nulidad", atMs: 10300, durationMs: 1900, hit: true },
  { text: "Tus salarios", atMs: 19900, durationMs: 1800 },
  { text: "Embarazada", atMs: 26860, durationMs: 1700 },
  { text: "Escríbenos", atMs: 41340, durationMs: 2100, hit: true },
];

/** Centro vertical del bloque, en unidades de composición (1920 de alto) */
export const BIG_WORD_CENTER_Y = 225;
/** Ancho máximo que puede ocupar */
export const BIG_WORD_MAX_WIDTH = 980;
export const BIG_WORD_MAX_SIZE = 250;
