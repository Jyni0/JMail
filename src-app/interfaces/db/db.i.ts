// ? Interfaces
import type { Account, Folder, Email, EmailFolders, Attachment } from "./index.ts";

export interface Db {
  accounts: Account[];
  folders: Folder[];
  emails: Email[];
  email_folders: EmailFolders[];
  attachments: Attachment[];
};
