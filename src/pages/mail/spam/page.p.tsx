// ? Icons
import { OctagonAlert } from "lucide-react";

// ? Components
import { Mail } from "@/components/ui/mail.c";
import { ContentNavbar } from "@/components/ui/content-navbar.c";

export function SpamPage() {
  return (
    <div className="w-full flex flex-col">
      <ContentNavbar title="Spam" icon={<OctagonAlert />} />
      <Mail title="Admin contact" desc="Here are deteils about your issue" time={new Date("2027-01-01T12:53:12")} />
      <Mail title="Admin contact" desc="Here are deteils about your issue" time={new Date("2027-01-01T12:53:12")} isRead />
    </div>
  );
}
