import { Kysely, sql } from 'kysely';
import type { Db } from '../interfaces/db/db.i.ts';

export async function initDatabase(db: Kysely<Db>) {
  // ? Accounts
  await db.schema
    .createTable('accounts')
    .ifNotExists()
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('email', 'text', (col) => col.notNull().unique())
    .addColumn('displayName', 'text', (col) => col.notNull())
    .addColumn('providerType', 'text', (col) => col.notNull())
    .addColumn('authType', 'text', (col) => col.notNull())
    .addColumn('secretKeyRef', 'text', (col) => col.notNull())
    .addColumn('status', 'text', (col) => col.notNull().defaultTo('active'))
    .addColumn('isSyncEnabled', 'integer', (col) => col.notNull().defaultTo(1))
    .addColumn('syncIntervalMinutes', 'integer', (col) => col.notNull().defaultTo(15))
    .addColumn('lastSyncedAt', 'text')
    .addColumn('lastErrorMessage', 'text')
    .addColumn('providerSettings', 'text', (col) => col.notNull()) // JSON
    .addColumn('createdAt', 'text', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updatedAt', 'text', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // ? Folders
  await db.schema
    .createTable('folders')
    .ifNotExists()
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('accountId', 'text', (col) => col.notNull().references('accounts.id').onDelete('cascade'))
    .addColumn('remoteId', 'text', (col) => col.notNull())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('type', 'text', (col) => col.notNull())
    .addColumn('delimiter', 'text')
    .addColumn('parentId', 'text')
    .addColumn('uidValidity', 'integer')
    .addColumn('highestModSeq', 'integer')
    .addColumn('unreadCount', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('totalCount', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('createdAt', 'text', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updatedAt', 'text', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addUniqueConstraint('unique_folder_remote_id_per_account', ['accountId', 'remoteId'])
    .execute();

  // ? Emails
  await db.schema
    .createTable('emails')
    .ifNotExists()
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('accountId', 'text', (col) => col.notNull().references('accounts.id').onDelete('cascade'))
    .addColumn('remoteId', 'text', (col) => col.notNull())
    .addColumn('threadId', 'text')
    .addColumn('messageIdHeader', 'text')
    .addColumn('date', 'text', (col) => col.notNull())
    .addColumn('sender', 'text', (col) => col.notNull()) // JSON
    .addColumn('recipientTo', 'text', (col) => col.notNull()) // JSON
    .addColumn('recipientCc', 'text') // JSON
    .addColumn('recipientBcc', 'text') // JSON
    .addColumn('subject', 'text')
    .addColumn('snippet', 'text')
    .addColumn('bodyHtml', 'text')
    .addColumn('bodyPlain', 'text')
    .addColumn('isRead', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('isFlagged', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('isDraft', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('hasAttachments', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('createdAt', 'text', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updatedAt', 'text', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addUniqueConstraint('unique_message_remote_id_per_account', ['accountId', 'remoteId'])
    .execute();

  // ? M:N Email <-> Folder
  await db.schema
    .createTable('email_folders')
    .ifNotExists()
    .addColumn('messageId', 'text', (col) => col.notNull().references('emails.id').onDelete('cascade'))
    .addColumn('folderId', 'text', (col) => col.notNull().references('folders.id').onDelete('cascade'))
    .addPrimaryKeyConstraint('pk_email_folders', ['messageId', 'folderId'])
    .execute();

  // ? Attachments
  await db.schema
    .createTable('attachments')
    .ifNotExists()
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('messageId', 'text', (col) => col.notNull().references('emails.id').onDelete('cascade'))
    .addColumn('filename', 'text', (col) => col.notNull())
    .addColumn('contentType', 'text', (col) => col.notNull())
    .addColumn('sizeBytes', 'integer', (col) => col.notNull())
    .addColumn('contentId', 'text')
    .addColumn('localPath', 'text')
    .addColumn('isDownloaded', 'integer', (col) => col.notNull().defaultTo(0))
    .execute();

  // ? Indexes
  await db.schema.createIndex('idx_messages_account_date').on('emails').columns(['accountId', 'date']).ifNotExists().execute();
  await db.schema.createIndex('idx_messages_thread').on('emails').column('threadId').ifNotExists().execute();
  await db.schema.createIndex('idx_folders_account').on('folders').column('accountId').ifNotExists().execute();
  await db.schema.createIndex('idx_msg_folders_folderId').on('email_folders').column('folderId').ifNotExists().execute();
}
