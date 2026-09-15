import { useCallback, useEffect, useState } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";
import type { Caption } from "@remotion/captions";
import { Captions } from "./Captions";
import { BigWords } from "./BigWords";
import { ZOOMS, ZOOM_IN_MS, ZOOM_OUT_MS } from "./zooms";

const useZoomScale = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeMs = (frame / fps) * 1000;

  return ZOOMS.reduce((current, zoom) => {
    const progress = interpolate(
      timeMs,
      [
        zoom.atMs - ZOOM_IN_MS * 0.55,
        zoom.atMs + ZOOM_IN_MS * 0.45,
        zoom.atMs + zoom.holdMs,
        zoom.atMs + zoom.holdMs + ZOOM_OUT_MS,
      ],
      [0, 1, 1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      },
    );
    return Math.max(current, 1 + (zoom.scale - 1) * progress);
  }, 1);
};

/**
 * El fondo y el recorte del sujeto comparten el mismo zoom para que encajen;
 * las palabras grandes van entre medias y sin zoom, lo que da sensación de capas.
 */
const ZoomLayer: React.FC<{ src: string; scale: number }> = ({
  src,
  scale,
}) => (
  <AbsoluteFill style={{ overflow: "hidden" }}>
    <AbsoluteFill style={{ scale, transformOrigin: "50% 42%" }}>
      <Video src={staticFile(src)} />
    </AbsoluteFill>
  </AbsoluteFill>
);

export const SubtitledVideo: React.FC = () => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Cargando subtítulos"));
  const scale = useZoomScale();

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
      <ZoomLayer src="video.mp4" scale={scale} />
      <BigWords />
      <ZoomLayer src="person.webm" scale={scale} />
      {captions ? <Captions captions={captions} /> : null}
    </AbsoluteFill>
  );
};
