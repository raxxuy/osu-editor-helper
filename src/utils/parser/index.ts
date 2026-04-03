import type { Beatmap } from "@/types/beatmap";
import { parseColours } from "./colours";
import { parseDifficulty } from "./difficulty";
import { parseEditor } from "./editor";
import { parseEvents } from "./events";
import { parseGeneral } from "./general";
import { parseHitObjects } from "./hit-objects";
import { parseMetadata } from "./metadata";
import { parseTimingPoints } from "./timing-points";

export const parseBeatmap = (content: string): Beatmap => {
  const sections = splitSections(content);

  return {
    general: parseGeneral(sections.General),
    editor: parseEditor(sections.Editor),
    metadata: parseMetadata(sections.Metadata),
    events: parseEvents(sections.Events),
    difficulty: parseDifficulty(sections.Difficulty),
    timingPoints: parseTimingPoints(sections.TimingPoints),
    colours: parseColours(sections.Colours),
    hitObjects: parseHitObjects(sections.HitObjects),
  };
};

const splitSections = (content: string): Record<string, string[]> => {
  const sections: Record<string, string[]> = {};
  let currentSection = "";

  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();

    if (!line || line.startsWith("//")) continue;

    if (line.startsWith("[") && line.endsWith("]")) {
      currentSection = line.slice(1, -1);
      sections[currentSection] = [];
      continue;
    }

    if (currentSection) {
      sections[currentSection].push(line);
    }
  }

  return sections;
};
