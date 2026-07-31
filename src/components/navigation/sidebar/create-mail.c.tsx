import { useState } from "react";

// ? Icons
import { SquarePen } from "lucide-react";

// ? Components
import { Button } from "@/components/ui/button.c";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog.c";
import { DraftMail, type DraftMailValues } from "@/components/ui/draft-mail.c";

const defaultData: DraftMailValues = {
  from: ["support@jynio.eu"],
  to: [],
  cc: [],
  bcc: [],
  subject: "",
  content: "",
};

export function CreateMail() {
  const [open, setOpen] = useState<boolean>(false);
  const [mailData, setMailData] = useState<DraftMailValues>(defaultData);

  const handleSend = () => {
    console.log("Mail content:", mailData);
  };

  const handleClose = () => {
    setMailData(defaultData);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="max-h-9">
        <Button variant="ghost" className="hover:bg-transparent hover:text-primary p-0">
          <SquarePen className="size-4.5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        position="bottom-right"
        hideClose={true}
        hasOverlay={false}
        preventCloseOutside={true}
        className="p-0 border-none bg-transparent shadow-none"
      >
        <DraftMail
          values={mailData}
          onChange={setMailData}
          onSend={handleSend}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}
