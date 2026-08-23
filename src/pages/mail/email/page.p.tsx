import { useState } from "react";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";

// ? Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.c";
import { EmailInput } from "@/components/ui/email-input.c";
import { File } from "@/components/ui/file.c";

export function EmailPage() {
  const sampleHtml = `
    <h1>Hi there</h1>
    <p>HTML Example</p>
    <script>alert('Simple exploid')</script>
  `;

  return (
    <div className="w-full flex flex-col [&>div:last-child_[data-type=content]]:border-b-0">
      <Email
        subject="Email title"
        from={["dfsfg@spergdfgsd.fd"]}
        to={["user@fdg.sdfgd", "fssgdfg@fsdfd.dfds"]}
        cc={["user@fdg.sdfgd", "fssgdfg@fsdfd.dfds"]}
        htmlBody={sampleHtml}
        textBody="Raw text mail"
        isOpenned
      />
      <Email
        from={["dfsfg@spergdfgsd.fd"]}
        to={["user@fdg.sdfgd", "fssgdfg@fsdfd.dfds"]}
        htmlBody={sampleHtml}
        textBody="Raw text mail"
        isOpenned
      />
    </div>
  );
}

interface EmailProps {
  isOpenned?: boolean;
  subject?: string;
  from: string[];
  to?: string[];
  cc?: string[];
  bcc?: string[];
  textBody?: string;
  htmlBody?: string;
}

function Email({ isOpenned, subject, from, to, cc, bcc, textBody, htmlBody }: EmailProps) {
  const [open, setOpen] = useState<boolean>(isOpenned || false);
  const cleanHtml = htmlBody ? DOMPurify.sanitize(htmlBody) : "";

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setOpen(!open)}
        className={cn(open ? "items-start" : "items-center", "flex flex-row border-b gap-2 py-2")}
      >
        <Avatar className="size-12 ml-2">
          <AvatarImage src="https://raw.githubusercontent.com/Jyni0/.github/refs/heads/main/icon.svg"></AvatarImage>
          <AvatarFallback>J</AvatarFallback>
        </Avatar>

        <div className={cn("flex flex-col flex-1", open ? "gap-0.5" : "")}>
          <EmailInput variant="ghost" limit={1} placeholder="Choose an email to send from..." comment="From" value={from} disabled />
          {open ? (
            <>
              {to && <EmailInput variant="ghost" limit={1} placeholder="" comment="To" value={to} disabled />}
              {cc && <EmailInput variant="ghost" limit={1} placeholder="" comment="Cc" value={cc} disabled />}
              {bcc && <EmailInput variant="ghost" limit={1} placeholder="" comment="Bcc" value={bcc} disabled />}
            </>
          ) : (
            subject && <span className="h-6 text-muted text-start select-text truncate">
              {subject}
            </span>
          )}
        </div>
      </button>

      {open && (
        <div data-type="content" className="min-h-64 px-2 pb-2 border-b">
          {htmlBody ? (
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            />
          ) : (
            <div className="whitespace-pre-wrap font-sans">
              {textBody}
            </div>
          )}
          <div data-type="files" className="mt-2">
            <File title="file.zip" size={17238} type="file" url="" />
          </div>
        </div>
      )}
    </div>
  );
}
