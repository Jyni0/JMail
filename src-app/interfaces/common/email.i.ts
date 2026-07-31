import { Attachment } from "./attachment.i";

export interface EmailAddress {
  displayName: string;
  email: string;
}

// ? Models
export interface Email {
  id: string;
  accountId: string;
  date: Date;

  // * Server
  remoteId: string;
  threadId?: string;
  messageIdHeader?: string;

  // * Metadata
  sender: EmailAddress;
  recipientTo: EmailAddress[]
  subject?: string;
  snippet?: string;

  // * States
  isRead: boolean;
  isFlagged: boolean;
  isDraft: boolean;
  hasAttachments: boolean;

  updatedAt: Date;
  createdAt: Date;
};

export interface EmailDetail extends Email {
  folderIds: string[]

  // * Metadata
  recipientCc?: EmailAddress[];
  recipientBcc?: EmailAddress[];

  // * Content
  bodyHtml?: string;
  bodyPlain?: string;
  attachments: Attachment[];
};
