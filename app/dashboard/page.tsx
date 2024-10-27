"use client"
import React from 'react'
import Transfers from '@/components/transfers'
import BalanceCard from '@/components/balance-card'
import useTransferStore from '../store/transfer-store'
function page() {
    const transfers = useTransferStore((state) => state.transfers)
    return (
        <main className='flex flex-col gap-9'>
            <BalanceCard
                className='mt-24'
            />
            <Transfers
                data={transfers}
                showTitle />
        </main>
    )
}

export default page