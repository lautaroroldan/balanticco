import React from 'react'
import TransferItem from '@/components/transfer-item'

function transfers() {
    return (
        <main className='flex flex-col gap-[22px]'>
            <h2 className='text-base font-semibold text-black capitalize'>Transferencias</h2>
            <section className='flex flex-col gap-2.5'>
                <TransferItem title='Otro ingreso' date='Domingo, 4 Jun. 2024' amount='5.422,00' type='income' />
                <TransferItem title='Netflix' date='Domingo, 4 Jun. 2024' amount='10,00' type='expense' />
                <TransferItem title='Amazon' date='Domingo, 4 Jun. 2024' amount='10,00' type='expense' />
                <TransferItem title='Comida' date='Domingo, 4 Jun. 2024' amount='1000,00' type='expense' />
                <TransferItem title='Sueldo' date='Domingo, 4 Jun. 2024' amount='10.000,00' type='income' />
            </section>
        </main>
    )
}

export default transfers