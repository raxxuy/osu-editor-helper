import { DEFAULT_GENERAL } from "@/constants/defaults";
import type { BeatmapGeneral } from "@/types/beatmap";
import { bool, num, type Parser, str } from "../helpers";

const GENERAL_PARSERS: Partial<Record<string, Parser<BeatmapGeneral>>> = {
  AudioFilename: str("audioFilename"),
  AudioLeadIn: num("audioLeadIn"),
  PreviewTime: num("previewTime"),
  Countdown: num("countdown"),
  SampleSet: str("sampleSet"),
  StackLeniency: num("stackLeniency"),
  Mode: num("mode"),
  LetterboxInBreaks: bool("letterboxInBreaks"),
  UseSkinSprites: bool("useSkinSprites"),
  OverlayPosition: str("overlayPosition"),
  SkinPreference: str("skinPreference"),
  EpilepsyWarning: bool("epilepsyWarning"),
  CountdownOffset: num("countdownOffset"),
  SpecialStyle: bool("specialStyle"),
  WidescreenStoryboard: bool("widescreenStoryboard"),
  SamplesMatchPlaybackRate: bool("samplesMatchPlaybackRate"),
};

export const parseGeneral = (lines: string[]): BeatmapGeneral => {
  const result = { ...DEFAULT_GENERAL };

  for (const line of lines) {
    const [key, value] = line.split(":").map((s) => s.trim());
    GENERAL_PARSERS[key]?.(value, result);
  }

  return result;
};
