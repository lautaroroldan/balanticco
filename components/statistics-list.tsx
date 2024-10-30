import React from 'react'
import StatisticsCardMonth from './statistics-card-month'
import { getBalanceForEveryMonth } from '@/utils/transfer'
import { getTransfers } from '@/utils/actions'

async function StatisticsList() {
    const transfers = await getTransfers()
    const currentYear = new Date().getFullYear()
    const balances = getBalanceForEveryMonth(transfers, currentYear)
    return (
        <div className='flex flex-col gap-4 mt-9'>
            {balances.map((balance, index) => (
                <StatisticsCardMonth
                    key={index}
                    month={balance.month}
                    balance={balance.income - balance.expense}
                    income={balance.income}
                    expense={balance.expense}
                />
            ))}
        </div>
    )
}

export default StatisticsList