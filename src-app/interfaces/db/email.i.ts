import { type Generated } from 'kysely';

// ? Shared
import { type Timestamp, type BooleanInt } from "./shared.ts";

export interface Email {
  id: string; // UUID
  account_id: string;
  date: string; // ISO date

  remote_id: string;
  thread_id: string | null;
  message_id_header: string | null;

  // Хранятся как JSON строки (TEXT)
  sender: string;
  recipient_to: string;
  recipient_cc: string | null;
  recipient_bcc: string | null;

  subject: string | null;
  snippet: string | null;
  body_html: string | null;
  body_plain: string | null;

  is_read: BooleanInt;
  is_flagged: BooleanInt;
  is_draft: BooleanInt;
  has_attachments: BooleanInt;

  created_at: Generated<string>;
  updated_at: Timestamp;
}
