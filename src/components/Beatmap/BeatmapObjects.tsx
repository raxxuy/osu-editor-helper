import { useMemo, useState } from "react";
import type { HitObject, TimingPoint } from "../../types/osu";

interface BeatmapObjectsProps {
  hitObjects: HitObject[];
  timingPoints: TimingPoint[];
}

const formatNumber = (value: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 }).format(value);

const formatTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;
  return `${minutes}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
};

const formatBpm = (beatLength: number) =>
  beatLength !== 0 ? 60000 / beatLength : 0;
const formatSV = (beatLength: number) => Math.round(10000 / -beatLength) / 100;

// Generic search hook
const useSearch = (
  items: (HitObject | TimingPoint)[],
  query: string,
  getSearchFields: (item: HitObject | TimingPoint) => (string | undefined)[],
) =>
  useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((item) =>
      getSearchFields(item).filter(Boolean).join("|").toLowerCase().includes(q),
    );
  }, [items, query, getSearchFields]);

// Icons
const HitObjectIcon = () => <circle cx="8" cy="8" r="8" />;
const TimingPointIcon = () => (
  <>
    <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2" />
    <path fillRule="evenodd" d="M9 3v10H8V3z" />
    <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5z" />
  </>
);

// View configurations
const viewConfigs = {
  hitObjects: {
    icon: HitObjectIcon,
    title: "Hit Objects",
    placeholder: "Search time, position, type…",
    columns: ["Time", "X", "Y", "Type", "HitSound", "Params", "Sample"],
    getSearchFields: (item: HitObject | TimingPoint) => {
      const o = item as HitObject;
      return [
        String(o.time),
        String(o.x),
        String(o.y),
        String(o.type),
        String(o.hitSound),
        o.objectParams?.join(","),
        o.hitSample?.join(","),
      ];
    },
    renderRow: (item: HitObject) => [
      formatTime(item.time),
      item.x,
      item.y,
      item.type,
      item.hitSound,
      item.objectParams?.join(", "),
      item.hitSample?.join(", "),
    ],
  },
  timingPoints: {
    icon: TimingPointIcon,
    title: "Timing Points",
    placeholder: "Search time, bpm, meter…",
    columns: [
      "Time",
      "Beat length",
      "BPM/SV",
      "Meter",
      "Volume",
      "Inherited",
      "Effects",
    ],
    getSearchFields: (item: HitObject | TimingPoint) => {
      const t = item as TimingPoint;
      const bpm =
        t.uninherited === 1 ? formatBpm(t.beatLength) : formatSV(t.beatLength);
      return [
        String(t.time),
        String(t.beatLength),
        String(bpm),
        String(t.meter),
        String(t.volume),
        String(t.uninherited),
        String(t.effects),
      ];
    },
    renderRow: (item: TimingPoint) => {
      const isRedLine = item.uninherited === 1;
      const formattedBeat = isRedLine
        ? formatBpm(item.beatLength)
        : formatSV(item.beatLength);
      return [
        formatTime(item.time),
        formatNumber(item.beatLength),
        isRedLine
          ? `${formatNumber(formattedBeat ?? 0)} BPM`
          : `x${(formattedBeat ?? 0).toFixed(2)}`,
        item.meter,
        item.volume,
        isRedLine ? "Yes (uninherited)" : "No (green)",
        item.effects,
      ];
    },
  },
} as const;

// Components
const ViewTabs = ({
  view,
  onViewChange,
}: {
  view: keyof typeof viewConfigs;
  onViewChange: (view: keyof typeof viewConfigs) => void;
}) => (
  <div className="flex w-fit gap-2 rounded bg-[#382e32] p-2">
    {Object.entries(viewConfigs).map(([key, cfg]) => (
      <button
        key={key}
        onClick={() =>
          view !== key && onViewChange(key as keyof typeof viewConfigs)
        }
        className={`rounded p-2 ${view === key ? "bg-[#46393f] hover:cursor-default" : "hover:cursor-pointer"}`}
        title={cfg.title}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className={view === key ? "text-white" : "text-[#ff66ab]"}
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <cfg.icon />
        </svg>
      </button>
    ))}
  </div>
);

const SearchInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-72 rounded bg-[#231b1e] px-3 py-2 text-sm text-[#e9d6e0] outline-none placeholder:text-[#9a808f] focus:ring-2 focus:ring-[#ff66ab]/40"
  />
);

const DataTable = ({
  config,
  items,
}: {
  config: (typeof viewConfigs)[keyof typeof viewConfigs];
  items: (HitObject | TimingPoint)[];
}) => (
  <table className="w-full text-left text-sm text-[#e9d6e0]">
    <thead className="sticky top-0 bg-[#2b2025] text-[#f3e6ec]">
      <tr>
        {config.columns.map((col) => (
          <th key={col} className="px-4 py-3">
            {col}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {items.length === 0 ? (
        <tr>
          <td
            className="px-4 py-4 text-[#9a808f]"
            colSpan={config.columns.length}
          >
            No {config.title.toLowerCase()}
          </td>
        </tr>
      ) : (
        items.map((item, idx) => (
          <tr
            key={`${item.time}-${idx}`}
            className={idx % 2 === 0 ? "bg-[#231b1e]" : "bg-[#261e22]"}
          >
            {config.renderRow(item as any).map((cell, cellIdx) => (
              <td key={cellIdx} className="px-4 py-2 tabular-nums">
                {cell}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default function BeatmapObjects({
  hitObjects,
  timingPoints,
}: BeatmapObjectsProps) {
  const [view, setView] = useState<keyof typeof viewConfigs>("hitObjects");
  const [query, setQuery] = useState<string>("");

  const data = { hitObjects, timingPoints };
  const config = viewConfigs[view];
  const items = data[view];
  const filteredItems = useSearch(items, query, config.getSearchFields);

  return (
    <div className="flex h-full w-full flex-col bg-[#2a2226] shadow-lg">
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <ViewTabs view={view} onViewChange={setView} />
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder={config.placeholder}
          />
        </div>

        <div className="mt-4 max-h-[600px] overflow-auto rounded bg-[#231b1e]">
          <DataTable config={config} items={filteredItems} />
        </div>
      </div>
    </div>
  );
}
