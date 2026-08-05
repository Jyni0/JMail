// ? Icons
import { File } from "lucide-react";

// ? Components
import { Mail } from "@/components/ui/mail.c";
import { ContentNavbar } from "@/components/ui/content-navbar.c";

export function DraftsPage() {
  return (
    <div className="w-full flex flex-col">
      <ContentNavbar title="Drafts" icon={<File />} />
      <Mail link="7yh3ujfn8767g7h" title="Admin contact" desc="Here are deteils about your issue" time={new Date("2027-01-01T12:53:12")} />
      <Mail link="7yh3ujfn8767g7h" title="Admin contact" desc="Here are deteils about your issue" time={new Date("2027-01-01T12:53:12")} isRead />
    </div>
  );
}
