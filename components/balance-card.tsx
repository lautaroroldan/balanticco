import { CircleArrowDown, CircleArrowUp } from 'lucide-react'
import React from 'react'
import BalanceItem from '@/components/balance-item'
import { formatCurrency, formatDate } from '@/utils/format'
import { getFirstTransferDate, getLastTransferDate, getTotalExpenseByMonth, getTotalIncomeByMonth, getTransfers } from '@/utils/transfer'

interface BalanceCardProps {
    className?: string
}

async function BalanceCard({ className }: BalanceCardProps) {
    const data = await getTransfers()
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()

    const totalExpense = getTotalExpenseByMonth(data, month, year)
    const totalIncome = getTotalIncomeByMonth(data, month, year)
    const getBalance = () => totalIncome - totalExpense

    const firstTransferDate = getFirstTransferDate(data, month, year)
    const lastTransferDate = getLastTransferDate(data, month, year)

    const initialDate = formatDate(firstTransferDate, { day: '2-digit', month: 'short', year: 'numeric' })
    const finalDate = formatDate(lastTransferDate, { day: '2-digit', month: 'short', year: 'numeric' })

    return (
        <section className={`bg-gradient-to-r from-blue-gradient via-purple-gradient via-53% to-orange-gradient to-92% px-3.5 pt-3 pb-5 rounded-2xl text-white flex flex-col items-center gap-8 drop-shadow-lg ${className}`}>
            <article className='flex flex-col items-center gap-2.5'>
                <h2 className='text-xs font-semibold'>{initialDate} - {finalDate}</h2>
                <h1 className={`font-semibold text-2xl ${getBalance() < 0 && 'text-primary'}`}>{formatCurrency(getBalance())}</h1>
            </article>
            <article className='flex justify-between w-full'>
                <BalanceItem type='income' amount={totalIncome} icon={<CircleArrowUp size={30} color='#379137' />} />
                <BalanceItem type='expense' amount={totalExpense} icon={<CircleArrowDown size={30} color='#db3535' />} />
            </article>
        </section>
    )
}


export default BalanceCard