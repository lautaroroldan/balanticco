import { CircleArrowDown, CircleArrowUp } from 'lucide-react'
import React from 'react'
import BalanceItem from '@/components/balance-item'

interface BalanceCardProps {
    initialDate: string
    finalDate: string
    amount: string
    className?: string
}

function BalanceCard({ initialDate, finalDate, amount, className }: BalanceCardProps) {
    return (
        <section className={`bg-gradient-to-r from-blue-gradient via-purple-gradient via-53% to-orange-gradient to-92% px-3.5 pt-3 pb-5 rounded-2xl text-white flex flex-col items-center gap-8 drop-shadow-lg ${className}`}>
            <article className='flex flex-col items-center gap-2.5'>
                <h2 className='text-xs font-semibold'>{initialDate} - {finalDate}</h2>
                <h1 className='font-semibold text-2xl'>{amount}</h1>
            </article>
            <article className='flex justify-between w-full'>
                <BalanceItem type='income' amount='$55.422,00' icon={<CircleArrowUp size={30} color='#379137' />} />
                <BalanceItem type='expense' amount='$14.422,00' icon={<CircleArrowDown size={30} color='#db3535' />} />
            </article>
        </section>
    )
}

export default BalanceCard