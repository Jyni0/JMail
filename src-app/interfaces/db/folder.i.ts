import { type Generated } from 'kysely';

// ? Shared
import { type Timestamp } from "./shared.ts";

export interface Folder {
  id: string; // UUID
  account_id: string;
  remote_id: string;
  name: string;
  type: string; // 'inbox' | 'sent' | 'drafts' | etc
  delimiter: string | null;
  parent_id: string | null;

  uid_validity: number | null;
  highest_mod_seq: number | null;
  unread_count: number;
  total_count: number;

  created_at: Generated<string>;
  updated_at: Timestamp;
}
