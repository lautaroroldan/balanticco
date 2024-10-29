"use client"
import React, { useState } from 'react'
import IncomeSwitch from './income-switch'
import { formatDate } from '@/utils/format'
import TransferBalanceCard from './transfer-balance-card'
import Transfers from './transfers'
import { Transfer, TransferType } from '@/app/db/schema/transfer'

interface FilteredTransfersProps {
    transfers: Transfer[]
}

function FilteredTransfers({ transfers }: FilteredTransfersProps) {
    const [activeSwitch, setActiveSwitch] = useState<TransferType>('income')
    const filteredTransfers = transfers.filter((transfer) => transfer.type === activeSwitch)
    const firstDateRange = filteredTransfers.sort((a, b) => a.date.getTime() - b.date.getTime())[0].date
    const lastDateRange = filteredTransfers.sort((a, b) => b.date.getTime() - a.date.getTime())[0].date
    return (
        <>
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
                className='mt-5 max-h-[calc(100vh-48px-24px-158px-24px-52px-36px-80px-48px-20px-105px)]'
                data={filteredTransfers}
            />
        </>
    )
}

export default FilteredTransfers