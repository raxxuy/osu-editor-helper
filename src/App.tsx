import { useState } from "react";
import "./App.css";
import FilePicker from "./components/FilePicker";
import type { File } from "./types/editor";

export default function App() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#1c1719] text-white">
      {file ? <></> : <FilePicker setFile={setFile} />}
    </div>
  );
}
