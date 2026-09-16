import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontFamily = "Anton";

await loadFont({
  family: fontFamily,
  url: staticFile("Anton-Regular.ttf"),
  weight: "400",
});
