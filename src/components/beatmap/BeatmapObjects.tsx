import { useState } from "react";
import type { HitObject, TimingPoint } from "../../types/osu";

interface BeatmapObjectsProps {
  hitObjects: HitObject[];
  timingPoints: TimingPoint[];
}

const ViewToggle = ({
  view,
  onViewChange,
}: {
  view: "hitObjects" | "timingPoints";
  onViewChange: (view: "hitObjects" | "timingPoints") => void;
}) => {
  const buttons = [
    {
      id: "hitObjects" as const,
      label: "Hit Objects",
      icon: <circle cx="8" cy="8" r="8" />,
    },
    {
      id: "timingPoints" as const,
      label: "Timing Points",
      icon: (
        <>
          <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2" />
          <path fillRule="evenodd" d="M9 3v10H8V3z" />
          <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5z" />
        </>
      ),
    },
  ];

  return (
    <div className="m-4 flex justify-start">
      <div className="flex gap-2 rounded-lg">
        {buttons.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={`flex items-center space-x-2 rounded-md px-4 py-2 text-white transition-all duration-200 ${
              view === id
                ? "bg-[#ff66ab] shadow-sm"
                : "bg-[#54454c] hover:bg-[#705c65]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              {icon}
            </svg>
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function BeatmapObjects({
  hitObjects,
  timingPoints,
}: BeatmapObjectsProps) {
  const [view, setView] = useState<"hitObjects" | "timingPoints">("hitObjects");

  return (
    <div className="flex w-full flex-col space-y-2 bg-[#2a2226] shadow-lg">
      <ViewToggle view={view} onViewChange={setView} />
      <div className="m-4 overflow-auto rounded-lg bg-[#382e32] p-4">
        {view === "hitObjects"
          ? hitObjects.map((hitObject) => (
              <pre>{JSON.stringify(hitObject)}</pre>
            ))
          : timingPoints.map((timingPoint) => (
              <pre>{JSON.stringify(timingPoint)}</pre>
            ))}
      </div>
    </div>
  );
}
