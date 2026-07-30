import { useState } from "react";

// ? Icons
import { ALargeSmall, Braces, Paperclip, Send, Trash2, X } from "lucide-react";

// ? Components
import { Button } from "@/components/ui/button.c";
import { Input } from "@/components/ui/input.c";
import { Textarea } from "@/components/ui/textarea.c";
import { EmailInput } from "@/components/ui/email-input.c";

export interface DraftMailValues {
  from: string[];
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  content: string;
}

interface DraftMailProps {
  values: DraftMailValues;
  onChange: (newValues: DraftMailValues) => void;
  onSend?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
}

export function DraftMail({ values, onChange, onSend, onDelete, onClose }: DraftMailProps) {
  const [cc, setCc] = useState<boolean>(false);
  const [bcc, setBcc] = useState<boolean>(false);

  const updateField = <K extends keyof DraftMailValues>(
      field: K,
      value: DraftMailValues[K]
    ) => {
      onChange({
        ...values,
        [field]: value,
      });
    };

  return (
    <div className="border rounded-2xl shadow-[0px_0px_24px_0px_var(--foreground)]/5 overflow-hidden">
      <div className="border-b px-4 py-2">
        <div className="flex flex-row">
          <EmailInput variant="ghost" onChange={(emails) => updateField("from", emails)} value={values.from} limit={1} placeholder="Choose an email to send from..." comment="From" />
          <Button size="small" variant="ghost" className="hover:bg-transparent hover:text-primary" onClick={onClose}><X className="size-4.5" /></Button>
        </div>
        <div className="flex flex-row">
          <EmailInput variant="ghost" onChange={(emails) => updateField("to", emails)} value={values.to} placeholder="Enter primary recipient(s)..." comment="To" />
          {!cc && <Button variant="ghost" onClick={() => setCc(true)}>Cc</Button>}
          {!bcc && <Button variant="ghost" onClick={() => setBcc(true)}>Bcc</Button>}
        </div>
        {cc && <EmailInput variant="ghost" onChange={(emails) => updateField("cc", emails)} value={values.cc} placeholder="Who else should be kept in the loop?" comment="Cc" />}
        {bcc && <EmailInput variant="ghost" onChange={(emails) => updateField("bcc", emails)} value={values.bcc} placeholder="Add hidden recipients..." comment="Bcc" />}
        <Input placeholder="Subject" onChange={(e) => updateField("subject", e.currentTarget.value)} value={values.subject} className="rounded-none border-none resize-none p-0 hover:bg-transparent" />
      </div>
      <div className="p-4 pb-0">
        <Textarea placeholder="Write your message here..." onChange={(e) => updateField("content", e.currentTarget.value)} value={values.content} className="h-52 rounded-none border-none resize-none p-0" />
      </div>
      <div className="flex flex-row justify-between gap-2 p-4">
        <div className="flex flex-row">
          <Button className="px-2" onClick={onDelete} variant="ghost"><Trash2 className="size-4.5" /></Button>
          <Button className="px-2" variant="ghost"><ALargeSmall className="size-4.5" /></Button>
          <Button className="px-2" variant="ghost"><Paperclip className="size-4.5" /></Button>
          <Button className="px-2" variant="ghost"><Braces className="size-4.5" /></Button>
        </div>
        <Button className="flex flex-row items-center gap-2" onClick={onSend}>Send<Send className="size-4.5" /></Button>
      </div>
    </div>
  );
}
