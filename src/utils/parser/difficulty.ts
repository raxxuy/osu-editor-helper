import type { BeatmapDifficulty } from "@/types/beatmap";
import { num, type Parser } from "../helpers";

const DIFFICULTY_PARSERS: Partial<Record<string, Parser<BeatmapDifficulty>>> = {
  HPDrainRate: num("hpDrainRate"),
  CircleSize: num("circleSize"),
  OverallDifficulty: num("overallDifficulty"),
  ApproachRate: num("approachRate"),
  SliderMultiplier: num("sliderMultiplier"),
  SliderTickRate: num("sliderTickRate"),
};

export const parseDifficulty = (lines: string[]): BeatmapDifficulty => {
  const result = {} as BeatmapDifficulty;

  for (const line of lines) {
    const [key, value] = line.split(":").map((s) => s.trim());
    DIFFICULTY_PARSERS[key]?.(value, result);
  }

  return result;
};
