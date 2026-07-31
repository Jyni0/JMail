export type FolderType = 'inbox' | 'sent' | 'drafts' | 'trash' | 'spam' | 'archive' | 'custom';

// ? Models
export interface Folder {
  id: string;
  accountId: string;
  remoteId: string;
  name: string;
  type: FolderType;
  delimiter?: string;
  parentId?: string;

  // ? Sync
  uidValidity?: number;
  highestModSeq?: number;
  unreadCount?: number;
  totalCount?: number;

  updatedAt: Date;
  createdAt: Date;
};
