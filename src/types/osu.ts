export type Metadata = {
  title: string;
  titleUnicode: string;
  artist: string;
  artistUnicode: string;
  creator: string;
  version: string;
  source: string;
  tags: string[];
  beatmapID: number;
  beatmapSetID: number;
  fileDirectory?: string;
};

export type TimingPoint = {
  time: number;
  beatLength: number;
  meter: number;
  sampleSet: number;
  sampleIndex: number;
  volume: number;
  uninherited: 0 | 1;
  effects: number;
};

export type HitObject = {
  x: number;
  y: number;
  time: number;
  type: number;
  hitSound: number;
  objectParams: number[];
  hitSample: number[];
};

export type Events = {
  background: {
    filename: string;
    xOffset: number;
    yOffset: number;
  };
};

export type BeatmapData = {
  metadata: Metadata;
  events: Events;
  hitObjects: HitObject[];
  timingPoints: TimingPoint[];
};
