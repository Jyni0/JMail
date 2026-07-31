export type ProviderType = 'imap' | 'google' | 'outlook';
export type SecurityType = 'ssl_tls' | 'starttls' | 'none';
export type AccountStatus = 'active' | 'auth_error' | 'disabled' | 'syncing';
export type AuthType = 'password' | 'oauth2';

export interface ServerConfig {
  host: string;
  port: number;
  security: SecurityType;
}

// ? Providers
export interface ImapProviderSettings {
  providerType: 'imap';
  imap: ServerConfig;
  smtp: ServerConfig;
  username: string;
}

export interface GoogleProviderSettings {
  providerType: 'google';
  scopes: string[];
  historyId?: string;
  providerAccountId?: string;
}

export interface OutlookProviderSettings {
  providerType: 'outlook';
  deltaLink?: string;
  tenantId?: string;
}

export type ProviderSettings = ImapProviderSettings | GoogleProviderSettings | OutlookProviderSettings;

// ? Models
export interface Account {
  id: string;
  email: string;
  displayName: string;
  providerType: ProviderType;
  providerSettings: ProviderSettings;

  // * Auth
  authType: AuthType;
  secretKeyRef: string

  // * Settings
  status: AccountStatus;
  isSyncEnabled: boolean;
  syncIntervalMinutes?: number;
  lastSyncedAt?: string;
  lastErrorMessage?: string;

  createdAt: Date;
  updatedAt: Date;
}
