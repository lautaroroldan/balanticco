"use client"
import { CircleArrowDown, CircleArrowUp } from 'lucide-react'
import React from 'react'
import BalanceItem from '@/components/balance-item'
import useTransferStore from '@/app/store/transfer-store'

interface BalanceCardProps {
    className?: string
}

function BalanceCard({ className }: BalanceCardProps) {
    const getTotalExpense = useTransferStore((state) => state.getTotalExpense)
    const getFirstTransferDate = useTransferStore((state) => state.getFirstTransferDate)
    const getLastTransferDate = useTransferStore((state) => state.getLastTransferDate)
    const getBalance = useTransferStore((state) => state.getBalance)
    const getTotalIncome = useTransferStore((state) => state.getTotalIncome)

    const initialDate = getFirstTransferDate(new Date().getMonth() + 1, new Date().getFullYear()).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
    const finalDate = getLastTransferDate(new Date().getMonth() + 1, new Date().getFullYear()).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })

    return (
        <section className={`bg-gradient-to-r from-blue-gradient via-purple-gradient via-53% to-orange-gradient to-92% px-3.5 pt-3 pb-5 rounded-2xl text-white flex flex-col items-center gap-8 drop-shadow-lg ${className}`}>
            <article className='flex flex-col items-center gap-2.5'>
                <h2 className='text-xs font-semibold'>{initialDate} - {finalDate}</h2>
                <h1 className='font-semibold text-2xl'>{`$${getBalance()}`}</h1>
            </article>
            <article className='flex justify-between w-full'>
                <BalanceItem type='income' amount={`$${getTotalIncome()}`} icon={<CircleArrowUp size={30} color='#379137' />} />
                <BalanceItem type='expense' amount={`$${getTotalExpense()}`} icon={<CircleArrowDown size={30} color='#db3535' />} />
            </article>
        </section>
    )
}

export default BalanceCard