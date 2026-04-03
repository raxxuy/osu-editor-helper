import { useEffect, useState } from "react";
import type { Beatmap as BeatmapType } from "@/types/beatmap";
import type { BeatmapFile } from "@/types/file";
import { parseBeatmap } from "@/utils/parser";

interface BeatmapProps {
  file: BeatmapFile;
}

export default function Beatmap({ file }: BeatmapProps) {
  const [beatmap, setBeatmap] = useState<BeatmapType | null>(null);

  useEffect(() => {
    setBeatmap(parseBeatmap(file.content));
  }, [file]);

  return (
    <div className="h-full w-full">
      <pre>
        <code>{JSON.stringify(beatmap, null, 2)}</code>
      </pre>
    </div>
  );
}
