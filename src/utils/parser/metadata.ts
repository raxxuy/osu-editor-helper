import type { BeatmapMetadata } from "@/types/beatmap";
import { arr, num, type Parser, str } from "../helpers";

const METADATA_PARSERS: Partial<Record<string, Parser<BeatmapMetadata>>> = {
  Title: str("title"),
  TitleUnicode: str("titleUnicode"),
  Artist: str("artist"),
  ArtistUnicode: str("artistUnicode"),
  Creator: str("creator"),
  Version: str("version"),
  Source: str("source"),
  Tags: arr("tags", String, " "),
  BeatmapID: num("beatmapId"),
  BeatmapSetID: num("beatmapSetId"),
};

export const parseMetadata = (lines: string[]): BeatmapMetadata => {
  const result = {} as BeatmapMetadata;

  for (const line of lines) {
    const [key, value] = line.split(":").map((s) => s.trim());
    METADATA_PARSERS[key]?.(value, result);
  }

  return result;
};
