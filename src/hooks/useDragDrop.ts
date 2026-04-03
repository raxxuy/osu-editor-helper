import { getCurrentWebview } from "@tauri-apps/api/webview";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { useEffect } from "react";
import type { BeatmapFile } from "@/types/file";

export const useDragDrop = (setFile: (file: BeatmapFile) => void) => {
  useEffect(() => {
    let unlisten: (() => void) | undefined;

    getCurrentWebview()
      .onDragDropEvent((event) => {
        if (event.payload.type !== "drop") return;

        const path = event.payload.paths[0];
        if (!path?.endsWith(".osu")) return;

        readTextFile(path).then((content) => {
          const name = path.split("\\").pop() ?? "";
          setFile({ name, path, content });
        });
      })
      .then((fn) => {
        unlisten = fn;
      });

    return () => unlisten?.();
  }, [setFile]);
};
