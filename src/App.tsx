import Beatmap from "@/components/composed/Beatmap";
import FilePicker from "@/components/composed/FilePicker";
import { useFile } from "@/hooks/useFile";

export default function App() {
  const { file, setFile } = useFile();

  return (
    <div className="flex h-screen items-center justify-center">
      {file ? <Beatmap file={file} /> : <FilePicker setFile={setFile} />}
    </div>
  );
}
