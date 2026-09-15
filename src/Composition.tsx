import { useCallback, useEffect, useState } from "react";
import { AbsoluteFill, staticFile, useDelayRender } from "remotion";
import { Video } from "@remotion/media";
import type { Caption } from "@remotion/captions";
import { Captions } from "./Captions";

export const SubtitledVideo: React.FC = () => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Cargando subtítulos"));

  const fetchCaptions = useCallback(async () => {
    try {
      const response = await fetch(staticFile("captions.json"));
      setCaptions(await response.json());
      continueRender(handle);
    } catch (e) {
      cancelRender(e);
    }
  }, [continueRender, cancelRender, handle]);

  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Video src={staticFile("video.mp4")} />
      {captions ? <Captions captions={captions} /> : null}
    </AbsoluteFill>
  );
};
