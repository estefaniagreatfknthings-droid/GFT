import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontFamily = "Montserrat Black";

await loadFont({
  family: fontFamily,
  url: staticFile("Montserrat-Black.ttf"),
  weight: "900",
});
