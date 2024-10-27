import React from 'react'
import Transfers from '@/components/transfers'
import BalanceCard from '@/components/balance-card'
function page() {
    return (
        <main className='flex flex-col gap-9'>
            <BalanceCard
                className='mt-24'
            />
            <Transfers />
        </main>
    )
}

export default page