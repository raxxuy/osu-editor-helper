import { convertFileSrc } from "@tauri-apps/api/core";
import { openPath } from "@tauri-apps/plugin-opener";
import { useEffect, useMemo, useState } from "react";
import type { Events, Metadata } from "../../types/osu";

interface BeatmapInfoProps {
  metadata: Metadata;
  events: Events;
}

const InfoField = ({
  label,
  value,
  title,
}: {
  label: string;
  value: string;
  title?: string;
}) => (
  <div>
    <label className="text-xs tracking-wide text-gray-400 uppercase">
      {label}
    </label>
    <p className="truncate text-gray-300" title={title || value}>
      {value || "Unknown"}
    </p>
  </div>
);

const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <h2 className="border-b border-gray-600 pb-2 text-lg font-semibold text-white">
      {title}
    </h2>
    <div className="space-y-2">{children}</div>
  </div>
);

export default function BeatmapInfo({ metadata, events }: BeatmapInfoProps) {
  const [imagePath, setImagePath] = useState<string>("");
  const fullImagePath = useMemo(() => {
    if (!metadata.fileDirectory || !events.background.filename) return "";
    return `${metadata.fileDirectory}/${events.background.filename}`;
  }, [metadata.fileDirectory, events.background.filename]);

  useEffect(() => {
    setImagePath(convertFileSrc(fullImagePath));
  }, [fullImagePath]);

  const handleImageClick = async () => {
    if (!metadata.fileDirectory) return;
    await openPath(metadata.fileDirectory.replace(/[/\\]/g, "\\"));
  };

  return (
    <div className="flex h-full w-1/5 flex-col overflow-hidden bg-[#2a2226] shadow-lg">
      {imagePath && (
        <div className="group relative overflow-hidden">
          <img
            className="h-48 w-full cursor-pointer object-cover transition-transform duration-200 group-hover:scale-105"
            src={imagePath}
            alt={`Background for ${metadata.title}`}
            title="Click to open folder"
            onClick={handleImageClick}
            loading="lazy"
          />
        </div>
      )}

      <div className="flex-1 space-y-6 p-6">
        <InfoSection title="Song Information">
          <InfoField label="Title" value={metadata.title || "Untitled"} />
          <InfoField label="Artist" value={metadata.artist} />
          {metadata.source && (
            <InfoField label="Source" value={metadata.source} />
          )}
        </InfoSection>

        <InfoSection title="Beatmap Details">
          <InfoField label="Creator" value={metadata.creator} />
          <InfoField label="Difficulty" value={metadata.version} />
          <div className="grid grid-cols-2 gap-4">
            <InfoField
              label="Beatmap ID"
              value={String(metadata.beatmapID || "N/A")}
            />
            <InfoField
              label="Set ID"
              value={String(metadata.beatmapSetID || "N/A")}
            />
          </div>
        </InfoSection>

        {process.env.NODE_ENV === "development" && metadata.fileDirectory && (
          <div className="space-y-2 border-t border-gray-600 pt-4">
            <label className="text-xs tracking-wide text-gray-400 uppercase">
              File Path
            </label>
            <p
              className="font-mono text-xs break-all text-gray-500"
              title={metadata.fileDirectory}
            >
              {metadata.fileDirectory}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
