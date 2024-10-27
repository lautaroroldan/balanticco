import { CircleArrowDown, CircleArrowUp } from 'lucide-react'
import React from 'react'

function balanceCard() {
    return (
        <section className='bg-gradient-to-r from-blue-gradient via-purple-gradient via-53% to-orange-gradient to-92% px-3.5 pt-3 pb-5 rounded-2xl text-white flex flex-col items-center gap-8 drop-shadow-sm'>
            <article className='flex flex-col items-center gap-2.5'>
                <h2 className='text-xs font-semibold'>1 Jun. 2024 - 4 Jun. 2024</h2>
                <h1 className='font-semibold text-2xl'>$41.000,00</h1>
            </article>
            <article className='flex justify-between w-full'>
                <div className='flex items-center gap-2'>
                    <CircleArrowUp size={30} color='#379137' />
                    <div className='flex flex-col'>
                        <h3 className='text-xs font-normal capitalize'>Ingresos</h3>
                        <h3 className='text-sm font-semibold'>$55.422,00</h3>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <CircleArrowDown size={30} color='#db3535' />
                    <div className='flex flex-col'>
                        <h3 className='text-xs font-normal capitalize'>Gastos</h3>
                        <h3 className='text-sm font-semibold'>$14.422,00</h3>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default balanceCard