"use client"
import React from 'react'
import StatisticsCardMonth from './statistics-card-month'
import useTransferStore from '@/store/transfer-store'

function StatisticsList() {
    const getBalanceForEveryMonth = useTransferStore((state) => state.getBalanceForEveryMonth)
    const balances = getBalanceForEveryMonth(new Date().getFullYear())
    return (
        <div className='flex flex-col gap-4 mt-9'>
            {balances.map((balance) => (
                <StatisticsCardMonth
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