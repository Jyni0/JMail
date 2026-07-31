// ? Shared
import { type BooleanInt } from "./shared.ts";

export interface Attachment {
  id: string; // UUID
  message_id: string;
  filename: string;
  content_type: string;
  size_bytes: number;
  content_id: string | null;

  local_path: string | null;
  is_downloaded: BooleanInt;
}
