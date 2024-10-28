import React from 'react'
import BalanceItem from './balance-item'
import { CircleArrowDown } from 'lucide-react'
import { CircleArrowUp } from 'lucide-react'
import { formatCurrency } from '@/utils/format'

function StatisticsCardMonth({ month, balance, income, expense }: { month: string, balance: number, income: number, expense: number }) {
    return (
        <div className='rounded-2xl pt-4 px-5 pb-3 bg-white flex flex-col gap-2.5 shadow'>
            <h3 className='text-xs font-medium'>{month}</h3>
            <h2 className='text-xl font-semibold mb-2'>{formatCurrency(balance)}</h2>
            <div className='flex justify-between w-full'>
                <BalanceItem type='income' amount={income} icon={<CircleArrowUp size={30} color='#379137' />} />
                <BalanceItem type='expense' amount={expense} icon={<CircleArrowDown size={30} color='#db3535' />} />
            </div>
        </div>
    )
}

export default StatisticsCardMonth