"use server"
import { unstable_cache as cache, revalidatePath } from 'next/cache'
import { db } from "@/app/db/client"
import { transferTable, TransferType } from "@/app/db/schema/transfer"
import { asc, eq, and, sql, desc } from 'drizzle-orm'
import { v4 as uuid } from 'uuid'
import { headers } from 'next/headers'
import { formatDate } from './format'

export const addTransfer = async (amount: number, description: string, type: TransferType, userId: string) => {
    const headersList = headers()
    const pathname = headersList.get('x-invoke-path') || '/dashboard/home'

    if (type == 'expense') {
        amount = -amount
    }

    const transfer = await db.insert(transferTable).values({ id: uuid(), amount, description, type, userId }).returning()
    revalidatePath(pathname)
    return transfer[0].id
}

export const getTransfers = cache(async (userId: string) => {
    const transfers = await db.select().from(transferTable).where(eq(transferTable.userId, userId))
    const transfersFormatted = transfers.map((transfer) => ({
        ...transfer,
        date: formatDate(new Date(transfer.date), { day: '2-digit', month: 'short', year: 'numeric' })
    }))
    return transfersFormatted
}, ['get-transfers'], { revalidate: 3600, tags: ['get-transfers'] })

export const getTotalExpenseByMonth = async (userId: string, month: number, year: number) => {
    const totalExpense = await db.select({ amount: sql<number>`sum(${transferTable.amount})` }).from(transferTable).where(and(
        eq(sql`strftime('%m', ${transferTable.date})`, month.toString().padStart(2, '0')),
        eq(sql`strftime('%Y', ${transferTable.date})`, year.toString()),
        eq(transferTable.type, 'expense'),
        eq(transferTable.userId, userId)
    )).groupBy(transferTable.type)
    if (totalExpense.length === 0) {
        return 0
    }
    return totalExpense[0].amount
}

export const getTotalIncomeByMonth = async (userId: string, month: number, year: number) => {
    const totalIncome = await db.select({ amount: sql<number>`sum(${transferTable.amount})` })
        .from(transferTable)
        .where(and(
            eq(sql`strftime('%m', ${transferTable.date})`, month.toString().padStart(2, '0')),
            eq(sql`strftime('%Y', ${transferTable.date})`, year.toString()),
            eq(transferTable.type, 'income'),
            eq(transferTable.userId, userId)
        )).groupBy(transferTable.type)
    if (totalIncome.length === 0) {
        return 0
    }
    return totalIncome[0].amount
}

export const getBalanceByMonth = async (userId: string, month: number, year: number) => {
    const data = await db.select({ type: transferTable.type, amount: sql<number>`sum(${transferTable.amount})` })
        .from(transferTable)
        .where(and(
            eq(sql`strftime('%m', ${transferTable.date})`, month.toString().padStart(2, '0')),
            eq(sql`strftime('%Y', ${transferTable.date})`, year.toString()),
            eq(transferTable.userId, userId)
        ))
        .groupBy(sql`strftime('%m', ${transferTable.date})`)
    if (data.length === 0) {
        return 0
    }
    return data[0].amount
}

export const getFirstTransferDate = async (userId: string, month: number, year: number) => {
    const [firstTransfer] = await db.select({ date: transferTable.date }).from(transferTable).where(and(
        eq(sql`strftime('%m', ${transferTable.date})`, month.toString().padStart(2, '0')),
        eq(sql`strftime('%Y', ${transferTable.date})`, year.toString()),
        eq(transferTable.userId, userId)
    )).orderBy(asc(transferTable.date)).limit(1)
    if (!firstTransfer) {
        return null
    }
    return firstTransfer.date
}

export const getLastTransferDate = async (userId: string, month: number, year: number) => {
    const [lastTransfer] = await db.select({ date: transferTable.date }).from(transferTable).where(and(
        eq(sql`strftime('%m', ${transferTable.date})`, month.toString().padStart(2, '0')),
        eq(sql`strftime('%Y', ${transferTable.date})`, year.toString()),
        eq(transferTable.userId, userId)
    )).orderBy(desc(transferTable.date)).limit(1)
    if (!lastTransfer) {
        return null
    }
    return lastTransfer.date
}

export const fetchBalanceCardData = async (userId: string, month: number, year: number) => {
    return Promise.all([
        getTotalExpenseByMonth(userId, month, year),
        getTotalIncomeByMonth(userId, month, year),
        getBalanceByMonth(userId, month, year),
        getFirstTransferDate(userId, month, year),
        getLastTransferDate(userId, month, year)
    ]).then(([totalExpense, totalIncome, balance, firstTransferDate, lastTransferDate]) => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' }
        if (firstTransferDate == null || lastTransferDate == null) {
            firstTransferDate = formatDate(new Date(), options)
            lastTransferDate = formatDate(new Date(), options)
        }
        const firstTransferDateFormatted = formatDate(new Date(firstTransferDate), options)
        const lastTransferDateFormatted = formatDate(new Date(lastTransferDate), options)
        return { totalExpense, totalIncome, balance, firstTransferDate: firstTransferDateFormatted, lastTransferDate: lastTransferDateFormatted }
    })
}


export const getFilteredTransfers = cache(async (type: TransferType, userId: string) => {
    if (type == null) {
        type = 'income'
    }
    const transfers = await db.select().from(transferTable).where(and(
        eq(transferTable.type, type),
        eq(transferTable.userId, userId)
    )).orderBy(asc(transferTable.date))
    return transfers.map((transfer) => ({
        ...transfer,
        date: formatDate(new Date(transfer.date), { day: '2-digit', month: 'short', year: 'numeric' })
    }))
}, ['get-filtered-transfers'], { revalidate: 3600, tags: ['get-filtered-transfers'] })


export const fetchFilteredTransfers = async (type: TransferType, userId: string) => {
    if (type == null) {
        type = 'income'
    }
    const transfers = await db.select().from(transferTable).where(and(
        eq(transferTable.type, type),
        eq(transferTable.userId, userId)
    )).orderBy(asc(transferTable.date))
    if (transfers.length === 0) {
        const firstDate = formatDate(new Date(), { day: '2-digit', month: 'short', year: 'numeric' })
        const lastDate = formatDate(new Date(), { day: '2-digit', month: 'short', year: 'numeric' })
        return { transfers: [], firstDate, lastDate, amount: 0 }
    }
    const amount = transfers.reduce((acc, transfer) => acc + transfer.amount, 0)
    const formattedTransfers = transfers.map((transfer) => ({
        ...transfer,
        date: formatDate(new Date(transfer.date), { day: '2-digit', month: 'short', year: 'numeric' })
    }))
    return { transfers: formattedTransfers, firstDate: formattedTransfers[0].date, lastDate: formattedTransfers[formattedTransfers.length - 1].date, amount }
}

export const getBalanceForEveryMonth = cache(async (userId: string, year: number) => {
    const getUniqueMonths = async () => {
        const transfers = await db.select({ date: transferTable.date }).from(transferTable).where(and(
            eq(sql`strftime('%Y', ${transferTable.date})`, year.toString()),
            eq(transferTable.userId, userId)
        ))
        const months = transfers.map((transfer) => new Date(transfer.date).getMonth() + 1)
        return [...new Set(months)]
    }
    const uniqueMonths = await getUniqueMonths()
    const balances: { month: string, income: number, expense: number }[] = []
    for (let month = 1; month <= uniqueMonths.length; month++) {
        const income = await getTotalIncomeByMonth(userId, uniqueMonths[month - 1], year)
        const expense = await getTotalExpenseByMonth(userId, uniqueMonths[month - 1], year)
        balances.push({ month: formatDate(new Date(year, uniqueMonths[month - 1] - 1, 1), { month: 'long' }), income, expense })
    }
    return balances
}, ['get-balance-for-every-month'], { revalidate: 3600, tags: ['get-balance-for-every-month'] })


export const fetchStatisticsChartData = async (userId: string, year: number) => {
    const data = await db.select({ date: transferTable.date, income: sql<number>`sum(${transferTable.amount}) filter (where ${transferTable.type} = 'income')`, expense: sql<number>`sum(${transferTable.amount}) filter (where ${transferTable.type} = 'expense')` }).from(transferTable).where(and(
        eq(sql`strftime('%Y', ${transferTable.date})`, year.toString()),
        eq(transferTable.userId, userId)
    )).groupBy(sql`strftime('%m', ${transferTable.date})`)
    const formattedData = data.map((item) => ({
        month: formatDate(new Date(item.date), { month: 'long' }),
        income: item.income,
        expense: item.expense
    }))
    return formattedData
}


