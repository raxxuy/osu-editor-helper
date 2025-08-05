import type { BeatmapData } from "../../types/osu";
import BeatmapInfo from "./BeatmapInfo";
import BeatmapObjects from "./BeatmapObjects";

interface BeatmapEditorProps {
  beatmapData: BeatmapData;
}

export default function BeatmapEditor({ beatmapData }: BeatmapEditorProps) {
  const hitObjects = beatmapData.hitObjects;
  const timingPoints = beatmapData.timingPoints;
  const metadata = beatmapData.metadata;
  const events = beatmapData.events;

  return (
    <div className="flex h-full w-full gap-8">
      <BeatmapInfo metadata={metadata} events={events} />
      <BeatmapObjects hitObjects={hitObjects} timingPoints={timingPoints} />
    </div>
  );
}
