// ? Models
export interface Attachment {
  id: string;
  messageId: string;
  filename: string;
  contentType: string;
  sizeBytes: string;
  contentId?: string;

  // * Local
  localPath?: string;
  isDownloaded: boolean;

  updatedAt: Date;
  createdAt: Date;
};
