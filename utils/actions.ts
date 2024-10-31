"use server"
import { unstable_cache as cache, revalidatePath } from 'next/cache'
import { db } from "@/app/db/client"
import { transferTable, TransferType } from "@/app/db/schema/transfer"
import { asc, eq, and, sql, desc } from 'drizzle-orm'
import { v4 as uuid } from 'uuid'
import { headers } from 'next/headers'
import { formatDate } from './format'

export const addTransfer = async (amount: number, description: string, type: TransferType) => {
    const headersList = headers()
    const pathname = headersList.get('x-invoke-path') || '/dashboard/transactions'
    
    const transfer = await db.insert(transferTable).values({ id: uuid(), amount, description, type }).returning()
    revalidatePath(pathname)
    return transfer[0].id
}

export const getTransfers = cache(async () => {
    const transfers = await db.select().from(transferTable).all()
    const transfersFormatted = transfers.map((transfer) => ({
        ...transfer,
        date: formatDate(new Date(transfer.date), { day: '2-digit', month: 'short', year: 'numeric' })
    }))
    return transfersFormatted
}, ['get-transfers'], { revalidate: 3600, tags: ['get-transfers'] })

export const getTotalExpenseByMonth = async (month: number, year: number) => {
    const totalExpense = await db.select({ amount: transferTable.amount }).from(transferTable).where(and(
        eq(sql`strftime('%m', ${transferTable.date})`, month.toString().padStart(2, '0')),
        eq(sql`strftime('%Y', ${transferTable.date})`, year.toString()),
        eq(transferTable.type, 'expense')
    ))
    const totalExpenseFormatted = totalExpense.reduce((acc, transfer) => {
        return acc + transfer.amount
    }, 0)
    return totalExpenseFormatted
}

export const getTotalIncomeByMonth = async (month: number, year: number) => {
    const totalIncome = await db.select({ amount: transferTable.amount }).from(transferTable).where(and(
        eq(sql`strftime('%m', ${transferTable.date})`, month.toString().padStart(2, '0')),
        eq(sql`strftime('%Y', ${transferTable.date})`, year.toString()),
        eq(transferTable.type, 'income')
    ))
    const totalIncomeFormatted = totalIncome.reduce((acc, transfer) => {
        return acc + transfer.amount
    }, 0)
    return totalIncomeFormatted
}

export const getBalanceByMonth = async (month: number, year: number) => {
    const data = await db.select({ amount: transferTable.amount, type: transferTable.type }).from(transferTable).where(and(
        eq(sql`strftime('%m', ${transferTable.date})`, month.toString().padStart(2, '0')),
        eq(sql`strftime('%Y', ${transferTable.date})`, year.toString())
    ))
    const balance = data.reduce((acc, transfer) => {
        if(transfer.type === 'income') {
            return acc + transfer.amount
        } else {
            return acc - transfer.amount
        }
    }, 0)
    return balance
}

export const getFirstTransferDate = async (month: number, year: number) => {
    const firstTransfer = await db.select({ date: transferTable.date }).from(transferTable).where(and(
        eq(sql`strftime('%m', ${transferTable.date})`, month.toString().padStart(2, '0')),
        eq(sql`strftime('%Y', ${transferTable.date})`, year.toString())
    )).orderBy(asc(transferTable.date)).limit(1)
    return firstTransfer[0].date
}

export const getLastTransferDate = async (month: number, year: number) => {
    const lastTransfer = await db.select({ date: transferTable.date }).from(transferTable).where(and(
        eq(sql`strftime('%m', ${transferTable.date})`, month.toString().padStart(2, '0')),
        eq(sql`strftime('%Y', ${transferTable.date})`, year.toString())
    )).orderBy(desc(transferTable.date)).limit(1)
    return lastTransfer[0].date
}

export const fetchBalanceCardData = async (month: number, year: number) => {
    return Promise.all([
        getTotalExpenseByMonth(month, year),
        getTotalIncomeByMonth(month, year),
        getBalanceByMonth(month, year),
        getFirstTransferDate(month, year),
        getLastTransferDate(month, year)
    ]).then(([totalExpense, totalIncome, balance, firstTransferDate, lastTransferDate]) => {
        const firstTransferDateFormatted = formatDate(new Date(firstTransferDate), { day: '2-digit', month: 'short', year: 'numeric' })
        const lastTransferDateFormatted = formatDate(new Date(lastTransferDate), { day: '2-digit', month: 'short', year: 'numeric' })
        return { totalExpense, totalIncome, balance, firstTransferDate: firstTransferDateFormatted, lastTransferDate: lastTransferDateFormatted }
    })
}


export const getFilteredTransfers = cache(async (type: TransferType) => {
    if(type == null) {
        type = 'income'
    }
    const transfers = await db.select().from(transferTable).where(eq(transferTable.type, type))
    return transfers.map((transfer) => ({
        ...transfer,
        date: formatDate(new Date(transfer.date), { day: '2-digit', month: 'short', year: 'numeric' })
    }))
}, ['get-filtered-transfers'], { revalidate: 3600, tags: ['get-filtered-transfers'] })


export const fetchFilteredTransfers = async (type: TransferType) => {
    if(type == null) {
        type = 'income'
    }
    const transfers = await db.select().from(transferTable).where(eq(transferTable.type, type)).orderBy(asc(transferTable.date))
    const amount = transfers.reduce((acc, transfer) => acc + transfer.amount, 0)
    const formattedTransfers = transfers.map((transfer) => ({
        ...transfer,
        date: formatDate(new Date(transfer.date), { day: '2-digit', month: 'short', year: 'numeric' })
    }))
    return { transfers: formattedTransfers, firstDate: formattedTransfers[0].date, lastDate: formattedTransfers[formattedTransfers.length - 1].date, amount }
}

export const getBalanceForEveryMonth = cache(async (year: number) => {
    const getUniqueMonths = async () => {
        const transfers = await db.select({ date: transferTable.date }).from(transferTable).where(eq(sql`strftime('%Y', ${transferTable.date})`, year.toString()))
        const months = transfers.map((transfer) => new Date(transfer.date).getMonth() + 1)
        return [...new Set(months)]
    }
    const uniqueMonths = await getUniqueMonths()
    const balances: { month: string, income: number, expense: number }[] = []
    for (let month = 1; month <= uniqueMonths.length; month++) {
        const income = await getTotalIncomeByMonth(uniqueMonths[month - 1], year)
        const expense = await getTotalExpenseByMonth(uniqueMonths[month - 1], year)
        balances.push({ month: formatDate(new Date(year, uniqueMonths[month - 1] - 1, 1), { month: 'long' }), income, expense })
    }
    return balances
}, ['get-balance-for-every-month'], { revalidate: 3600, tags: ['get-balance-for-every-month'] })


export const fetchStatisticsChartData = async (year: number) => {
    const data = await db.select({ date: transferTable.date, income: sql<number>`sum(${transferTable.amount}) filter (where ${transferTable.type} = 'income')`, expense: sql<number>`sum(${transferTable.amount}) filter (where ${transferTable.type} = 'expense')` }).from(transferTable).where(eq(sql`strftime('%Y', ${transferTable.date})`, year.toString())).groupBy(sql`strftime('%m', ${transferTable.date})`)
    const formattedData = data.map((item) => ({
        month: formatDate(new Date(item.date), { month: 'long' }),
        income: item.income,
        expense: item.expense
    }))
    return formattedData
}


