export type BeatmapGeneral = {
  audioFilename: string;
  audioLeadIn: number;
  audioHash?: string;
  previewTime: number;
  countdown: 0 | 1 | 2 | 3;
  sampleSet: "Normal" | "Soft" | "Drum";
  stackLeniency: number;
  mode: 0 | 1 | 2 | 3;
  letterboxInBreaks: boolean;
  storyFireInFront?: boolean;
  useSkinSprites?: boolean;
  alwaysShowPlayfield?: boolean;
  overlayPosition?: "NoChange" | "Below" | "Above";
  skinPreference?: string;
  epilepsyWarning?: boolean;
  countdownOffset?: number;
  specialStyle?: boolean;
  widescreenStoryboard: boolean;
  samplesMatchPlaybackRate?: boolean;
};

export type BeatmapEditor = {
  bookmarks?: number[];
  distanceSpacing: number;
  beatDivisor: number;
  gridSize: number;
  timelineZoom: number;
};

export type BeatmapMetadata = {
  title: string;
  titleUnicode?: string;
  artist: string;
  artistUnicode?: string;
  creator: string;
  version: string;
  source: string;
  tags: string[];
  beatmapId?: number;
  beatmapSetId?: number;
};

export type BeatmapDifficulty = {
  hpDrainRate: number;
  circleSize: number;
  overallDifficulty: number;
  approachRate: number;
  sliderMultiplier: number;
  sliderTickRate: number;
};

export type BeatmapEvents = {
  background?: EventBackground;
  video?: EventVideo;
  breaks?: EventBreak[];
  storyboards?: EventStoryboard[];
};

// 0,0,filename,xOffset,yOffset
export type EventBackground = {
  fileName: string;
  xOffset?: number;
  yOffset?: number;
};

// Video,startTime,filename,xOffset,yOffset
export type EventVideo = {
  startTime: number;
  fileName: string;
  xOffset?: number;
  yOffset?: number;
};

// Break,startTime,endTime
export type EventBreak = {
  startTime: number;
  endTime: number;
};

// biome-ignore lint/complexity/noBannedTypes: <will be implemented later>
type EventStoryboard = {};

export type BeatmapTimingPoint = {
  time: number;
  beatLength: number;
  meter: number;
  sampleSet: 0 | 1 | 2 | 3;
  sampleIndex: number;
  volume: number;
  uninherited: boolean;
  effects: number;
};

export type BeatmapColours = {
  combo?: Record<number, RGB>;
  sliderTrackOverride?: RGB;
  sliderBorder?: RGB;
};

export type RGB = [number, number, number];

export type BeatmapHitObject = {
  x: number;
  y: number;
  time: number;
  type: number;
  hitSound: number;
  objectParams?: number[];
  hitSample?: [number, number, number, number, string];
};

export type Beatmap = {
  general: BeatmapGeneral;
  editor: BeatmapEditor;
  metadata: BeatmapMetadata;
  difficulty: BeatmapDifficulty;
  events: BeatmapEvents;
  timingPoints: BeatmapTimingPoint[];
  colours: BeatmapColours;
  hitObjects: BeatmapHitObject[];
};
