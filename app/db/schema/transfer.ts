
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { users } from "./user";

export type TransferType = 'income' | 'expense'
export enum TransferTypeEnum {
    INCOME = 'income',
    EXPENSE = 'expense'
}

export interface Transfer {
    id: string
    amount: number
    description: string
    type: TransferType
    date: Date
    userId: string
}

export const transferTable = sqliteTable('transfer', {
    id: text('id').primaryKey(),
    amount: integer('amount').notNull(),
    description: text('description').notNull(),
    type: text('type', { enum: ['income', 'expense'] }).notNull(),
    date: text('date').default(sql`CURRENT_TIMESTAMP`).notNull(),
    // date: timestamp("date",{withTimezone: true}).notNull().defaultNow()
    userId: text('userId').notNull().references(() => users.id, { onDelete: "cascade" }),
})