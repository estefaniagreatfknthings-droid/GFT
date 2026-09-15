import "./index.css";
import { Composition } from "remotion";
import { SubtitledVideo } from "./Composition";

const FPS = 30;
const DURATION_SECONDS = 44.652;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SubtitulosDinamicos"
      component={SubtitledVideo}
      durationInFrames={Math.round(DURATION_SECONDS * FPS)}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
