import { TransferType } from '@/app/db/schema/transfer';
import { formatCurrency } from '@/utils/format'
import Image from 'next/image';
import React from 'react'

export interface TransferItemProps {
  title: string;
  date: string;
  amount: number
  type: TransferType
}

function TransferItem({ title, date, amount, type }: TransferItemProps) {

  const amountColor = type === 'income' ? 'text-secondary' : 'text-primary'
  const amountSign = type === 'income' ? '+' : '-'

  return (
    <article className='bg-white rounded-lg flex py-1.5 pl-2 pr-3.5 justify-between items-center'>
      <section className='flex gap-2.5'>
        <Image src="/Ellipse.png" alt="transfer" unoptimized width={40} height={40}/>
        <div className='flex flex-col justify-center'>
          <h2 className='text-xs font-semibold text-black capitalize'>{title}</h2>
          <h3 className='text-[10px] text-dark-gray font-normal'>{date}</h3>
        </div>
      </section>
      <section>
        <h3 className={`text-xs font-bold ${amountColor}`}>{amountSign}{formatCurrency(amount)}</h3>
      </section>
    </article>
  )
}

export default TransferItem