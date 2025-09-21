import { readTextFile, watchImmediate } from "@tauri-apps/plugin-fs";
import { useEffect, useState } from "react";
import "./App.css";
import Beatmap from "./components/Beatmap";
import FilePicker from "./components/FilePicker";
import type { File } from "./types/editor";
import type { BeatmapData } from "./types/osu";
import { parseBeatmap } from "./utils/parsing";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [beatmapData, setBeatmapData] = useState<BeatmapData | null>(null);

  useEffect(() => {
    const callParsing = (file: File) => {
      const data = parseBeatmap(file.content);
      data.metadata.fileDirectory = file.directory;
      setBeatmapData(data);
    };

    if (file) {
      callParsing(file);
    }

    const waitForChange = async () => {
      if (file) {
        await watchImmediate(file.absolutePath, async (_event) => {
          const updatedContent = await readTextFile(file.absolutePath);
          const updatedFile = { ...file, content: updatedContent };
          setFile(updatedFile);
        });
      }
    };

    waitForChange();
  }, [file]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#1c1719] text-white">
      {beatmapData ? (
        <Beatmap beatmapData={beatmapData} />
      ) : (
        <FilePicker setFile={setFile} />
      )}
    </div>
  );
}
