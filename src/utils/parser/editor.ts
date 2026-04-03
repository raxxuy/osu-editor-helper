import type { BeatmapEditor } from "@/types/beatmap";
import { arr, num, type Parser } from "../helpers";

const EDITOR_PARSERS: Partial<Record<string, Parser<BeatmapEditor>>> = {
  Bookmarks: arr("bookmarks", Number),
  DistanceSpacing: num("distanceSpacing"),
  BeatDivisor: num("beatDivisor"),
  GridSize: num("gridSize"),
  TimelineZoom: num("timelineZoom"),
};

export const parseEditor = (lines: string[]): BeatmapEditor => {
  const result = {} as BeatmapEditor;

  for (const line of lines) {
    const [key, value] = line.split(":").map((s) => s.trim());
    EDITOR_PARSERS[key]?.(value, result);
  }

  return result;
};
