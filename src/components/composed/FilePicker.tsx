import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { useDragDrop } from "@/hooks/useDragDrop";
import type { BeatmapFile } from "@/types/file";
import Button from "../Button";

interface FilePickerProps {
  setFile: (file: BeatmapFile) => void;
}

export default function FilePicker({ setFile }: FilePickerProps) {
  useDragDrop(setFile);

  const handleFileSelect = async () => {
    const file = await open({
      multiple: false,
      directory: false,
      filters: [
        {
          name: "osu! files",
          extensions: ["osu"],
        },
      ],
    });

    if (!file) return;

    const name = file.split("\\").pop() ?? "";
    const content = await readTextFile(file);
    setFile({ name: name, path: file, content });
  };

  return <Button onClick={handleFileSelect}>Select File</Button>;
}
