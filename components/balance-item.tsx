import { formatCurrency } from '@/utils/format'
import React from 'react'

interface BalanceItemProps {
    type: 'income' | 'expense'
    amount: number
    icon: React.ReactNode
}

function BalanceItem({ type, amount, icon }: BalanceItemProps) {

    const text = type === 'income' ? 'Ingresos' : 'Gastos'
    return (
        <div className='flex items-center gap-2'>
            {icon}
            <div className='flex flex-col'>
                <h3 className='text-xs font-normal capitalize'>{text}</h3>
                <h3 className='text-sm font-semibold'>{formatCurrency(amount)}</h3>
            </div>
        </div>
    )
}

export default BalanceItem