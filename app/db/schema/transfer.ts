
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export type TransferType = 'income' | 'expense'

export interface Transfer {
    id: string
    amount: number
    description: string
    type: TransferType
    date: Date
}

export const transferTable = sqliteTable('transfer', {
    id: text('id').primaryKey(),
    amount: integer('amount').notNull(),
    description: text('description').notNull(),
    type: text('type', { enum: ['income', 'expense'] }).notNull(),
    date: text('date').default(sql`CURRENT_TIMESTAMP`).notNull()
})