import { CircleArrowDown, CircleArrowUp } from 'lucide-react'
import React from 'react'
import BalanceItem from '@/components/balance-item'
import { formatCurrency } from '@/utils/format'
import { fetchBalanceCardData } from '@/utils/actions'
interface BalanceCardProps {
    className?: string
}

async function BalanceCard({ className }: BalanceCardProps) {
    const currentDate = new Date()
    const month = currentDate.getMonth() + 1
    const year = currentDate.getFullYear()

    const { totalExpense, totalIncome, balance, firstTransferDate: initialDate, lastTransferDate: finalDate } = await fetchBalanceCardData(month, year)

    return (
        <section className={`bg-gradient-to-r from-blue-gradient via-purple-gradient via-53% to-orange-gradient to-92% px-3.5 pt-3 pb-5 rounded-2xl text-white flex flex-col items-center gap-8 drop-shadow-lg ${className}`}>
            <article className='flex flex-col items-center gap-2.5'>
                <h2 className='text-xs font-semibold'>{initialDate} - {finalDate}</h2>
                <h1 className={`font-semibold text-2xl ${balance < 0 && 'text-primary'}`}>
                    {formatCurrency(balance)}
                </h1>
            </article>
            <article className='flex justify-between w-full'>
                <BalanceItem type='income' amount={totalIncome} icon={<CircleArrowUp size={30} color='#379137' />} />
                <BalanceItem type='expense' amount={totalExpense} icon={<CircleArrowDown size={30} color='#db3535' />} />
            </article>
        </section>
    )
}


export default BalanceCard