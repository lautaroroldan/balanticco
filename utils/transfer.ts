import { Transfer } from "@/app/db/schema/transfer";
import { formatDate } from "./format";

export const getTotalIncome = (transfers: Transfer[]): number => {
    const total = transfers.filter((transfer) => transfer.type === 'income').reduce((acc, transfer) => acc + transfer.amount, 0);
    return total;
};

export const getTotalExpense = (transfers: Transfer[]): number => {
    const total = transfers.filter((transfer) => transfer.type === 'expense').reduce((acc, transfer) => acc + transfer.amount, 0);
    return total;
};

export const getBalance = (transfers: Transfer[]): number => {
    return getTotalIncome(transfers) - getTotalExpense(transfers);
};

export const getFirstTransferDate = (transfers: Transfer[], month: number, year: number): Date => {
    const firstTransfer = transfers.sort((a, b) => a.date.getTime() - b.date.getTime()).find((transfer) => transfer.date.getMonth() + 1 >= month && transfer.date.getFullYear() === year);
    return firstTransfer?.date || new Date();
};

export const getLastTransferDate = (transfers: Transfer[], month: number, year: number): Date => {
    const lastTransfer = transfers.sort((a, b) => b.date.getTime() - a.date.getTime()).find((transfer) => transfer.date.getMonth() + 1 <= month && transfer.date.getFullYear() === year);
    return lastTransfer?.date || new Date();
};

export const getTransfersByMonth = (transfers: Transfer[], month: number, year: number): Transfer[] => {
    return transfers.filter((transfer) => transfer.date.getMonth() + 1 === month && transfer.date.getFullYear() === year);
};

export const getBalanceByMonth = (transfers: Transfer[], month: number, year: number): number => {
    const monthlyTransfers = getTransfersByMonth(transfers, month, year);
    const income = monthlyTransfers.filter((transfer) => transfer.type === 'income').reduce((acc, transfer) => acc + transfer.amount, 0);
    const expense = monthlyTransfers.filter((transfer) => transfer.type === 'expense').reduce((acc, transfer) => acc + transfer.amount, 0);
    return income - expense;
};

export const getFirstTransferDateByYear = (transfers: Transfer[], year: number): Date => {
    const firstTransfer = transfers.sort((a, b) => a.date.getTime() - b.date.getTime()).find((transfer) => transfer.date.getFullYear() === year);
    return firstTransfer?.date || new Date();
};

export const getLastTransferDateByYear = (transfers: Transfer[], year: number): Date => {
    const lastTransfer = transfers.sort((a, b) => b.date.getTime() - a.date.getTime()).find((transfer) => transfer.date.getFullYear() === year);
    return lastTransfer?.date || new Date();
};

export const getTotalIncomeByMonth = (transfers: Transfer[], month: number, year: number): number => {
    const monthlyTransfers = getTransfersByMonth(transfers, month, year);
    return monthlyTransfers.filter((transfer) => transfer.type === 'income').reduce((acc, transfer) => acc + transfer.amount, 0);
};

export const getTotalExpenseByMonth = (transfers: Transfer[], month: number, year: number): number => {
    const monthlyTransfers = getTransfersByMonth(transfers, month, year);
    return monthlyTransfers.filter((transfer) => transfer.type === 'expense').reduce((acc, transfer) => acc + transfer.amount, 0);
};

export const getBalanceForEveryMonth = (transfers: Transfer[], year: number): { month: string, income: number, expense: number }[] => {
    const balances: { month: string, income: number, expense: number }[] = [];
    for (let month = 1; month <= 12; month++) {
        const income = getTotalIncomeByMonth(transfers, month, year);
        const expense = getTotalExpenseByMonth(transfers, month, year);
        if (income || expense) {
            balances.push({ month: formatDate(new Date(year, month - 1, 1), { month: 'long' }), income, expense });
        }
    }
    return balances;
};