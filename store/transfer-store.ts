import { TransferType } from "@/app/db/schema/transfer";
import { create } from "zustand";
import { v4 as uuid } from 'uuid';
import { formatDate } from "@/utils/format";
import { Transfer } from "@/app/db/schema/transfer";


interface TransferActions {
    transfers: Transfer[]
    addTransfer: (amount: number, description: string, type: TransferType) => Promise<void>
    getTransfers: () => void
    removeTransfer: (id: string) => void
    getTotalIncome: () => number
    getTotalExpense: () => number
    getBalance: () => number
    getFirstTransferDate: (month: number, year: number) => Date
    getLastTransferDate: (month: number, year: number) => Date
    getTransfersByMonth: (month: number, year: number) => Transfer[]
    getBalanceByMonth: (month: number, year: number) => number
    getFirstTransferDateByYear: (year: number) => Date
    getLastTransferDateByYear: (year: number) => Date
    getBalanceForEveryMonth: (year: number) => { month: string, income: number, expense: number }[]
    getTotalIncomeByMonth: (month: number, year: number) => number
    getTotalExpenseByMonth: (month: number, year: number) => number
}

interface TransferState {
    transfers: Transfer[]
}

const useTransferStore = create<TransferState & TransferActions>()((set, get) => ({
    transfers: [],
    addTransfer: async (amount, description, type) => {
        const transfer: Transfer = {
            id: uuid(),
            amount,
            description,
            type,
            date: new Date()
        }
        try {
            await fetch('/api/transfer', {
                method: 'POST',
                body: JSON.stringify(transfer)
            })
            set((state) => ({ transfers: [...state.transfers, transfer] }))
        } catch (error) {
            console.error(error)
        }
    },
    getTransfers: async () => {
        const transfers = await fetch('/api/transfer')
        const transfersData = await transfers.json()
        const transfersFormatted = transfersData.transfers.map((transfer: Transfer) => ({
            ...transfer,
            date: new Date(transfer.date)
        }))
        set(({ transfers: transfersFormatted }))
    },
    removeTransfer: (id) => set((state) => ({ transfers: state.transfers.filter((transfer) => transfer.id !== id) })),
    getTotalIncome: () => {
        const total = get().transfers.filter((transfer) => transfer.type === 'income').reduce((acc, transfer) => acc + transfer.amount, 0)
        return total
    },
    getTotalExpense: () => {
        const total = get().transfers.filter((transfer) => transfer.type === 'expense').reduce((acc, transfer) => acc + transfer.amount, 0)
        return total
    },
    getBalance: () => get().getTotalIncome() - get().getTotalExpense(),
    getFirstTransferDate: (month, year) => {
        const firstTransfer = get().transfers.sort((a, b) => a.date.getTime() - b.date.getTime()).find((transfer) => transfer.date.getMonth() + 1 >= month && transfer.date.getFullYear() === year)
        return firstTransfer?.date || new Date()
    },
    getLastTransferDate: (month, year) => {
        const lastTransfer = get().transfers.sort((a, b) => b.date.getTime() - a.date.getTime()).find((transfer) => transfer.date.getMonth() + 1 <= month && transfer.date.getFullYear() === year)
        return lastTransfer?.date || new Date()
    },
    getTransfersByMonth: (month, year) => {
        const transfers = get().transfers.filter((transfer) => transfer.date.getMonth() + 1 === month && transfer.date.getFullYear() === year)
        return transfers
    },
    getBalanceByMonth: (month, year) => {
        const transfers = get().getTransfersByMonth(month, year)
        const income = transfers.filter((transfer) => transfer.type === 'income').reduce((acc, transfer) => acc + transfer.amount, 0)
        const expense = transfers.filter((transfer) => transfer.type === 'expense').reduce((acc, transfer) => acc + transfer.amount, 0)
        return income - expense
    },
    getFirstTransferDateByYear: (year) => {
        const firstTransfer = get().transfers.sort((a, b) => a.date.getTime() - b.date.getTime()).find((transfer) => transfer.date.getFullYear() === year)
        return firstTransfer?.date || new Date()
    },
    getLastTransferDateByYear: (year) => {
        const lastTransfer = get().transfers.sort((a, b) => b.date.getTime() - a.date.getTime()).find((transfer) => transfer.date.getFullYear() === year)
        return lastTransfer?.date || new Date()
    },
    getTotalIncomeByMonth: (month, year) => {
        const transfers = get().getTransfersByMonth(month, year)
        const income = transfers.filter((transfer) => transfer.type === 'income').reduce((acc, transfer) => acc + transfer.amount, 0)
        return income
    },
    getTotalExpenseByMonth: (month, year) => {
        const transfers = get().getTransfersByMonth(month, year)
        const expense = transfers.filter((transfer) => transfer.type === 'expense').reduce((acc, transfer) => acc + transfer.amount, 0)
        return expense
    },
    getBalanceForEveryMonth: (year) => {
        const balances: { month: string, income: number, expense: number }[] = []
        for (let month = 1; month <= 12; month++) {
            const income = get().getTotalIncomeByMonth(month, year)
            const expense = get().getTotalExpenseByMonth(month, year)
            if (income || expense)
                balances.push({ month: formatDate(new Date(year, month - 1, 1), { month: 'long' }), income, expense })
        }
        return balances
    }
}))

export default useTransferStore
