// ? Icons
import { Minus, Minimize, X, Inbox } from "lucide-react"

export function Navbar() {

  return (
    <div className="h-13 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center [&_>svg]:size-5.5 pl-4 gap-2">
        <Inbox />
        <p>Inbox</p>
      </div>
      <div className="flex flex-row">
        <button className="p-1.75 hover:bg-secondary/25"><Minus className="size-4.5" /></button>
        <button className="p-1.75 hover:bg-secondary/25"><Minimize className="size-4.5" /></button>
        <button className="p-1.75 hover:bg-primary/25"><X className="size-4.5" /></button>
      </div>
    </div>
  );
};
