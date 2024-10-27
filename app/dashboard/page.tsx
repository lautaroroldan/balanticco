import React from 'react'
import Transfers from '@/components/transfers'
import BalanceCard from '@/components/balance-card'
function page() {
    return (
        <main className='flex flex-col gap-9'>
            <BalanceCard
                initialDate='1 Jun. 2024'
                finalDate='4 Jun. 2024'
                amount='$41.000,00'
                className='mt-24'
            />
            <Transfers />
        </main>
    )
}

export default page