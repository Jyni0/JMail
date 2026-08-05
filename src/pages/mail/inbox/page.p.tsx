// ? Icons
import { Inbox } from "lucide-react";

// ? Components
import { Mail } from "@/components/ui/mail.c";
import { ContentNavbar } from "@/components/ui/content-navbar.c";

export function InboxPage() {
  return (
    <div className="w-full flex flex-col">
      <ContentNavbar title="Inbox" icon={<Inbox />} />
      <Mail link="7yh3ujfn8767g7h" title="Admin contact" desc="Here are deteils about your issue" time={new Date("2027-01-01T12:53:12")} />
      <Mail link="7yh3ujfn8767g7h" title="Admin contact" desc="Here are deteils about your issue" time={new Date("2027-01-01T12:53:12")} isRead />
    </div>
  );
}
