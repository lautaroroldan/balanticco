import { TransferType } from "@/components/transfer-item";
import { create } from "zustand";
import { v4 as uuid } from 'uuid';

export interface Transfer {
    id: string
    amount: number
    description: string
    type: TransferType
    date: Date
}


interface TransferActions {
    transfers: Transfer[]
    addTransfer: (amount: number, description: string, type: TransferType) => Promise<void>
    removeTransfer: (id: string) => void
    getTotalIncome: () => number
    getTotalExpense: () => number
    getBalance: () => number
    getFirstTransferDate: (month: number, year: number) => Date
    getLastTransferDate: (month: number, year: number) => Date
}

interface TransferState {
    transfers: Transfer[]
}

const useTransferStore = create<TransferState & TransferActions>()((set, get) => ({
    transfers: [{
        id: uuid(),
        amount: 5422,
        description: 'Otro ingreso',
        type: 'income',
        date: new Date('2024-10-04')
    }, {
        id: uuid(),
        amount: 10,
        description: 'Netflix',
        type: 'expense',
        date: new Date('2024-10-04')
    }, {
        id: uuid(),
        amount: 10,
        description: 'Amazon',
        type: 'expense',
        date: new Date('2024-10-22')
    }, {
        id: uuid(),
        amount: 1000,
        description: 'Comida',
        type: 'expense',
        date: new Date('2024-10-20')
    }, {
        id: uuid(),
        amount: 10000,
        description: 'Sueldo',
        type: 'income',
        date: new Date('2024-10-02')
    }],
    addTransfer: async (amount, description, type) => {
        // Agregar luego conexion a base de datos
        await new Promise((resolve) => setTimeout(resolve, 1000))
        set((state) => ({ transfers: [...state.transfers, { id: uuid(), amount, description, type, date: new Date() }] }))
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
    }
}))

export default useTransferStore
