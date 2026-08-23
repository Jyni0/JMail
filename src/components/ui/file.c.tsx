import { fromBytes } from "@tsmx/human-readable"

// ? Icons
import { File as FileLogo, Image, Code2, Film, AudioLines } from "lucide-react";

interface FileProps {
  title: string;
  type: "photo" | "file" | "code" | "video" | "audio";
  size: number;
  url: string;
  mimeType?: string;
  onClick?: () => void;
}

export function File({ title, type, size, onClick }: FileProps) {

  return (
    <button
      className="min-w-36 w-fit bg-secondary/25 flex flex-row items-center rounded-lg px-2 py-1 gap-1 transition-colors hover:cursor-pointer hover:text-primary"
      onClick={onClick}
      title={fromBytes(size, {})}
    >
      <span className="[&_>svg]:size-4">
        {type === "photo" && <Image />}
        {type === "file" && <FileLogo />}
        {type === "code" && <Code2 />}
        {type === "video" && <Film />}
        {type === "audio" && <AudioLines />}
      </span>
      <p>{title}</p>
    </button>
  );
}
