import { getCurrentWebview } from "@tauri-apps/api/webview";
import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { useEffect, useState } from "react";
import type { File, FileHistory } from "../types/editor";
import {
  getFileHistory,
  addToFileHistory,
  removeFromFileHistory,
} from "../utils/storage";

interface FilePickerProps {
  setFile: (file: File) => void;
}

export default function FilePicker({ setFile }: FilePickerProps) {
  const [recentFiles, setRecentFiles] = useState<FileHistory[]>([]);

  useEffect(() => {
    setRecentFiles(getFileHistory());
  }, []);

  useEffect(() => {
    const waitForDrop = async () => {
      const unlisten = await getCurrentWebview().onDragDropEvent((event) => {
        if (event.payload.type === "drop") {
          const filePath = event.payload.paths[0];

          if (filePath.endsWith(".osu")) {
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
    setFile({ directory: directory, content: content, absolutePath: filePath });
    addToFileHistory(filePath);
    setRecentFiles(getFileHistory());
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

  const handleRecentFileClick = async (filePath: string) => {
    try {
      await handleFileSelect(filePath);
    } catch (error) {
      // File might not exist anymore, remove from history
      removeFromFileHistory(filePath);
      setRecentFiles(getFileHistory());
    }
  };

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-20 p-8">
      <div className="border-1 border-dashed border-[#382e32] bg-[#2a2226] shadow-md hover:border-[#42373b] hover:bg-[#2b2326]">
        <button
          className="px-24 py-4 text-[#e9d6e0] hover:cursor-pointer hover:text-white"
          onClick={handleClick}
        >
          Drop an osu! file
        </button>
      </div>

      {recentFiles.length > 0 && (
        <div className="w-full max-w-md">
          <h3 className="mb-3 text-sm font-medium text-[#c9a2b2]">
            Recent Files
          </h3>
          <div className="space-y-2">
            {recentFiles.map((file) => (
              <button
                key={file.absolutePath}
                className="w-full rounded-md bg-[#2a2226] p-3 text-left text-sm text-[#e9d6e0] hover:bg-[#2b2326] hover:text-white"
                onClick={() => handleRecentFileClick(file.absolutePath)}
              >
                <div className="truncate font-medium">{file.filename}</div>
                <div className="text-xs text-[#8a7a7a]">
                  {new Date(file.lastOpened).toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
