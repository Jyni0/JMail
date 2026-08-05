import { Button } from "@/components/ui/button.c";

export function Sidebar() {
  return (
    <div className="min-w-56 bg-sidebar flex flex-col border-r p-4">
      <Button variant="ghost">Send</Button>
    </div>
  );
}
