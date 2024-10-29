import React from 'react'
import Transfers from '@/components/transfers'
import BalanceCard from '@/components/balance-card'
import { getTransfers } from '@/utils/transfer'

async function Page() {
    const transfers = await getTransfers()
    return (
        <main className='flex flex-col gap-9'>
            <BalanceCard
                data={transfers}
                className='mt-24'
            />
            <Transfers
                data={transfers}
                showTitle />
        </main>
    )
}

export default Page