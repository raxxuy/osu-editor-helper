import type { Events, HitObject, Metadata, TimingPoint } from "../types/osu";

export function splitSections(content: string): Record<string, string[]> {
  const sections: Record<string, string[]> = {};
  let currentSection = "";

  content.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\[(.+)\]$/);
    if (match) {
      currentSection = match[1];
      sections[currentSection] = [];
    } else if (currentSection) {
      sections[currentSection].push(line);
    }
  });

  return sections;
}

export function parseKeyValue(lines: string[]): Record<string, string> {
  return Object.fromEntries(
    lines
      .filter((line) => line.trim())
      .map((line) => {
        const [key, ...rest] = line.split(":");
        return [key?.trim(), rest.join(":").trim()];
      })
      .filter(([key, value]) => key && value),
  );
}

export function parseMetadata(section: Record<string, string>): Metadata {
  return {
    title: section.Title || "",
    titleUnicode: section.TitleUnicode || "",
    artist: section.Artist || "",
    artistUnicode: section.ArtistUnicode || "",
    creator: section.Creator || "",
    version: section.Version || "",
    source: section.Source || "",
    tags:
      section.Tags?.split(",")
        .map((t) => t.trim())
        .filter(Boolean) || [],
    beatmapID: Number(section.BeatmapID) || 0,
    beatmapSetID: Number(section.BeatmapSetID) || 0,
  };
}

export function parseTimingPoints(lines: string[]): TimingPoint[] {
  return lines
    .filter((line) => line.trim())
    .map((line) => line.split(","))
    .filter((parts) => parts.length >= 8)
    .map((parts) => ({
      time: Number(parts[0]),
      beatLength: Number(parts[1]),
      meter: Number(parts[2]),
      sampleSet: Number(parts[3]),
      sampleIndex: Number(parts[4]),
      volume: Number(parts[5]),
      uninherited: Number(parts[6]) as 0 | 1,
      effects: Number(parts[7]),
    }));
}

export function parseHitObjects(lines: string[]): HitObject[] {
  return lines
    .filter((line) => line.trim())
    .map((line) => line.split(","))
    .filter((parts) => parts.length >= 5)
    .map((parts) => ({
      x: Number(parts[0]),
      y: Number(parts[1]),
      time: Number(parts[2]),
      type: Number(parts[3]),
      hitSound: Number(parts[4]),
      objectParams: parts.slice(5, -1).map(Number),
      hitSample: parts[parts.length - 1].split(":").map(Number),
    }));
}

export function parseEvents(lines: string[]): Events {
  const backgroundLine = lines
    .filter((line) => line.trim() && !line.trim().startsWith("//"))
    .map((line) => line.split(","))
    .find((parts) => parts.length >= 3 && parts[0] === "0");

  if (!backgroundLine) {
    return { background: { filename: "", xOffset: 0, yOffset: 0 } };
  }

  let filename = backgroundLine[2].trim();
  if (filename.startsWith('"') && filename.endsWith('"')) {
    filename = filename.slice(1, -1);
  }

  return {
    background: {
      filename,
      xOffset: Number(backgroundLine[3]) || 0,
      yOffset: Number(backgroundLine[4]) || 0,
    },
  };
}

export function parseBeatmap(content: string) {
  const sections = splitSections(content);

  return {
    metadata: parseMetadata(parseKeyValue(sections["Metadata"] || [])),
    timingPoints: parseTimingPoints(sections["TimingPoints"] || []),
    hitObjects: parseHitObjects(sections["HitObjects"] || []),
    events: parseEvents(sections["Events"] || []),
  };
}