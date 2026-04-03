import type { BeatmapColours, RGB } from "@/types/beatmap";

export const parseColours = (lines: string[]): BeatmapColours => {
  const result = {} as BeatmapColours;

  if (!lines) return result;

  for (const line of lines) {
    const [key, value] = line.split(":").map((s) => s.trim());
    const rgb = value.split(",").map(Number) as RGB;

    if (key.startsWith("Combo")) {
      const index = Number(key.replace("Combo", ""));
      result.combo ??= {};
      result.combo[index] = rgb;
    } else if (key === "SliderTrackOverride") {
      result.sliderTrackOverride = rgb;
    } else if (key === "SliderBorder") {
      result.sliderBorder = rgb;
    }
  }

  return result;
};
