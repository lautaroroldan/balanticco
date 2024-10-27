import BalanceCard from '@/components/balance-card'
import IncomeSwitch from '@/components/income-switch'
import React from 'react'

function page() {
    return (
        <div className='mt-12'>
            <h2 className='text-base font-semibold'>Transferencias</h2>
            <BalanceCard
                initialDate='1 Jun. 2024'
                finalDate='4 Jun. 2024'
                amount='$41.000,00'
                className='mt-3.5'
            />
            <IncomeSwitch className='mt-9' />
        </div>
    )
}

export default page