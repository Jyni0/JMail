import { Mail } from "@/components/ui/mail.c";

export function InboxPage() {
  return (
    <div className="w-full flex flex-col">
      <Mail title="Admin contact" desc="Here are deteils about your issue" time={new Date("2027-01-01T12:53:12")} isRead />
      <Mail title="Admin contact" desc="Here are deteils about your issue" time={new Date("2027-01-01T12:53:12")} />
    </div>
  );
}
