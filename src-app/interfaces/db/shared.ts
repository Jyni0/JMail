import { type ColumnType } from 'kysely';

export type Timestamp = ColumnType<string, string | undefined, string>;
export type BooleanInt = 0 | 1;
