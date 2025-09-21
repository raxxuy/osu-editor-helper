import type { BeatmapData } from "../../types/osu";
import BeatmapInfo from "./BeatmapInfo";

interface BeatmapProps {
  beatmapData: BeatmapData;
}

export default function Beatmap({ beatmapData }: BeatmapProps) {
  const metadata = beatmapData.metadata;
  const events = beatmapData.events;

  return (
    <div className="flex h-full w-full gap-8">
      <BeatmapInfo metadata={metadata} events={events} />
    </div>
  );
}
