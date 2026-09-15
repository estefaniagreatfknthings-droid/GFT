import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

/** Subtítulos */
export const fontFamily = "Montserrat Black";
/** Palabras grandes detrás del sujeto */
export const displayFontFamily = "Anton";

await Promise.all([
  loadFont({
    family: fontFamily,
    url: staticFile("Montserrat-Black.ttf"),
    weight: "900",
  }),
  loadFont({
    family: displayFontFamily,
    url: staticFile("Anton-Regular.ttf"),
    weight: "400",
  }),
]);
