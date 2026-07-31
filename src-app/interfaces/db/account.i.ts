import { type Generated } from "kysely";

// ? Shared
import { type Timestamp, type BooleanInt } from "./shared.ts";

export interface Account {
  id: string; // UUID
  email: string;
  display_name: string;
  provider_type: 'imap' | 'google' | 'outlook';

  auth_type: 'password' | 'oauth2';
  secret_key_ref: string;

  status: 'active' | 'auth_error' | 'disabled' | 'syncing';
  is_sync_enabled: BooleanInt;
  sync_interval_minutes: number;
  last_synced_at: string | null;
  last_error_message: string | null;

  // JSON string: ImapProviderSettings | GoogleProviderSettings
  provider_settings: string;

  created_at: Generated<string>;
  updated_at: Timestamp;
}
