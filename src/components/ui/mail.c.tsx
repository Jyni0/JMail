import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

const propsMail = {
  sizes: {
    big: "",
    normal: "",
    small: "",
  },
};

interface MailProps {
  title: string;
  desc: string;
  time: Date;
  link: string;
  isRead?: boolean;
  size?: keyof typeof propsMail.sizes;
}

export function Mail({ className, title, desc, time, link, isRead, size, ...props }: MailProps & React.ComponentProps<"button">) {
  const accountId = useParams();

  return (
    <Link to={`/u/${accountId}/mail/${link}`}>
      <button className={cn("w-full h-10 flex flex-row items-center text-start border-b *:px-3 hover:bg-secondary/25 transition-colors", propsMail.sizes[size ?? "small"], className)} {...props}>
        <h3 className="min-w-64 max-w-64 w-full flex flex-row items-center select-text gap-2">{isRead && <div className="bg-primary size-2 rounded-full"></div>}{title}</h3>
        <p className="w-full select-text">{desc}</p>
        <span className="min-w-24">{time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
        {/*<span>{time.toUTCString()}</span>*/}
      </button>
    </Link>
  );
}
