"use client"
import BalanceCard from '@/components/balance-card'
import IncomeSwitch from '@/components/income-switch'
import TransferBalanceCard from '@/components/transfer-balance-card'
import { TransferType } from '@/components/transfer-item'
import React, { useState } from 'react'
import useTransferStore from '@/store/transfer-store'
import Transfers from '@/components/transfers'
import { formatDate } from '@/utils/format'

function Page() {
    const [activeSwitch, setActiveSwitch] = useState<TransferType>('income')
    const transfers = useTransferStore((state) => state.transfers)
    const filteredTransfers = transfers.filter((transfer) => transfer.type === activeSwitch)
    const firstDateRange = filteredTransfers.sort((a, b) => a.date.getTime() - b.date.getTime())[0].date
    const lastDateRange = filteredTransfers.sort((a, b) => b.date.getTime() - a.date.getTime())[0].date
    return (
        <main className='flex flex-col'>
            <h2 className='text-base font-semibold mt-12'>Transferencias</h2>
            <BalanceCard
                className='mt-6'
            />
            <IncomeSwitch
                className='mt-9'
                activeSwitch={activeSwitch}
                setActiveSwitch={setActiveSwitch}
            />
            <TransferBalanceCard
                className='mt-12'
                initialDate={formatDate(firstDateRange, { day: '2-digit', month: 'short', year: 'numeric', })}
                finalDate={formatDate(lastDateRange, { day: '2-digit', month: 'short', year: 'numeric', })}
                amount={filteredTransfers.reduce((acc, transfer) => acc + transfer.amount, 0)}
            />
            <Transfers
                className='mt-5'
                data={filteredTransfers}
            />
        </main>
    )
}

export default Page