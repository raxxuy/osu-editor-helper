import type {
  BeatmapEvents,
  EventBackground,
  EventBreak,
  EventVideo,
} from "@/types/beatmap";

const parseBackground = (params: string[]): EventBackground => {
  return {
    fileName: params[1].replace(/^"|"$/g, ""),
    xOffset: Number(params[2]) || 0,
    yOffset: Number(params[3]) || 0,
  };
};

const parseVideo = (params: string[]): EventVideo => {
  return {
    startTime: Number(params[0]),
    fileName: params[1].replace(/^"|"$/g, ""),
    xOffset: Number(params[2]) || 0,
    yOffset: Number(params[3]) || 0,
  };
};

const parseBreak = (params: string[]): EventBreak => {
  return {
    startTime: Number(params[0]),
    endTime: Number(params[1]),
  };
};

export const parseEvents = (lines: string[]): BeatmapEvents => {
  const result = {} as BeatmapEvents;

  for (const line of lines) {
    const [type, ...params] = line.split(",");

    switch (type) {
      case "0":
        result.background = parseBackground(params);
        break;
      case "1":
      case "Video":
        result.video = parseVideo(params);
        break;
      case "2":
      case "Break":
        result.breaks ??= [];
        result.breaks.push(parseBreak(params));
        break;
    }
  }

  return result;
};
