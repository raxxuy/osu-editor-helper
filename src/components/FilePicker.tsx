import { getCurrentWebview } from "@tauri-apps/api/webview";
import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { useEffect } from "react";
import type { File } from "../types/editor";

interface FilePickerProps {
  setFile: (file: File) => void;
}

export default function FilePicker({ setFile }: FilePickerProps) {
  useEffect(() => {
    const waitForDrop = async () => {
      const unlisten = await getCurrentWebview().onDragDropEvent((event) => {
        if (event.payload.type === "drop") {
          const filePath = event.payload.paths[0];

          if (
            filePath.slice(filePath.indexOf(".", filePath.length - 5)) ===
            ".osu"
          ) {
            handleFileSelect(filePath);
            unlisten();
          }
        }
      });
    };

    waitForDrop();
  }, []);

  const handleFileSelect = async (filePath: string) => {
    const directory = filePath.split("\\").slice(0, -1).join("/");
    const content = await readTextFile(filePath);
    setFile({ directory: directory, content: content, fullPath: filePath });
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const file = await open({
      multiple: false,
      directory: false,
      filters: [
        {
          name: "osu! Beatmap Files",
          extensions: ["osu"],
        },
      ],
    });

    if (file) {
      await handleFileSelect(file);
    }
  };

  return (
    <button className="hover:cursor-pointer" onClick={handleClick}>
      Drop
    </button>
  );
}
