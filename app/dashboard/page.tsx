import React from 'react'
import Transfers from '@/components/transfers'
import BalanceCard from '@/components/balance-card'
function page() {
    return (
        <main className='mt-24 flex flex-col gap-9'>
            <BalanceCard />
            <Transfers />
        </main>
    )
}

export default page