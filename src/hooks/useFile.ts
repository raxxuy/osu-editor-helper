import { useState } from "react";
import type { BeatmapFile } from "../types/file";

export const useFile = () => {
  const [file, setFile] = useState<BeatmapFile | null>(null);
  return { file, setFile };
};
