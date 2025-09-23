import type { BeatmapData } from "../../types/osu";
import BeatmapInfo from "./BeatmapInfo";
import BeatmapObjects from "./BeatmapObjects";

interface BeatmapProps {
  beatmapData: BeatmapData;
}

export default function Beatmap({ beatmapData }: BeatmapProps) {
  const { metadata, events, hitObjects, timingPoints } = beatmapData;

  return (
    <div className="flex h-full w-full gap-8">
      <BeatmapInfo metadata={metadata} events={events} />
      <BeatmapObjects hitObjects={hitObjects} timingPoints={timingPoints} />
    </div>
  );
}
