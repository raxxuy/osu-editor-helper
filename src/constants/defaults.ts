import type { BeatmapGeneral } from "@/types/beatmap";

export const DEFAULT_GENERAL: BeatmapGeneral = {
  audioFilename: "",
  audioLeadIn: 0,
  previewTime: -1,
  countdown: 1,
  sampleSet: "Normal",
  stackLeniency: 0.7,
  mode: 0,
  letterboxInBreaks: false,
  useSkinSprites: false,
  overlayPosition: "NoChange",
  epilepsyWarning: false,
  countdownOffset: 0,
  specialStyle: false,
  widescreenStoryboard: false,
  samplesMatchPlaybackRate: false,
};
