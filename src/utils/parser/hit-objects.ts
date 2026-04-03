import type { BeatmapHitObject } from "@/types/beatmap";

const parseHitSample = (raw: string): BeatmapHitObject["hitSample"] => {
  const [normalSet, additionSet, index, volume, filename] = raw.split(":");
  return [
    Number(normalSet),
    Number(additionSet),
    Number(index),
    Number(volume),
    filename ?? "",
  ];
};

const parseObjectParams = (
  type: number,
  params: string[],
): BeatmapHitObject["objectParams"] => {
  if (!params.length) return undefined;

  // spinner / hold — endTime
  if (type & 8 || type & 128) return [Number(params[0])];

  // slider — leave as raw strings for now
  return params as never;
};

export const parseHitObjects = (lines: string[]): BeatmapHitObject[] => {
  return lines.map((line) => {
    const [x, y, time, type, hitSound, ...rest] = line.split(",");

    const lastParam = rest.at(-1) ?? "";
    const hasHitSample = lastParam.includes(":");
    const hitSample = hasHitSample ? parseHitSample(lastParam) : undefined;
    const objectParams = parseObjectParams(
      Number(type),
      hasHitSample ? rest.slice(0, -1) : rest,
    );

    return {
      x: Number(x),
      y: Number(y),
      time: Number(time),
      type: Number(type),
      hitSound: Number(hitSound),
      objectParams,
      hitSample,
    } satisfies BeatmapHitObject;
  });
};
