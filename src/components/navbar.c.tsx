// ? Icons
import { Minus, Minimize, X } from "lucide-react"

export function Navbar() {
  return (
    <div className="absolute h-13 flex flex-row top-0 right-0 opacity-0 hover:opacity-100 transition-opacity">
      <button onClick={() => window.app.minimize()} className="p-1.75 hover:bg-secondary/25"><Minus className="size-4.5" /></button>
      <button onClick={() => window.app.maximize()} className="p-1.75 hover:bg-secondary/25"><Minimize className="size-4.5" /></button>
      <button onClick={() => window.app.close()} className="p-1.75 hover:bg-primary/25"><X className="size-4.5" /></button>
    </div>
  );
};
