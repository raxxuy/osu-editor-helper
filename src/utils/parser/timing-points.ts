import type { BeatmapTimingPoint } from "@/types/beatmap";

export const parseTimingPoints = (lines: string[]): BeatmapTimingPoint[] => {
  return lines.map((line) => {
    const [
      time,
      beatLength,
      meter,
      sampleSet,
      sampleIndex,
      volume,
      uninherited,
      effects,
    ] = line.split(",").map(Number);

    return {
      time,
      beatLength,
      meter,
      sampleSet: sampleSet as 0 | 1 | 2 | 3,
      sampleIndex,
      volume,
      uninherited: uninherited === 1,
      effects,
    } satisfies BeatmapTimingPoint;
  });
};
