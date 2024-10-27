import React from 'react'

type TransferType = 'income' | 'expense'

interface TransferItemProps {
  title: string;
  date: string;
  amount: string
  type: TransferType
}

function transferItem({ title, date, amount, type }: TransferItemProps) {

  const amountColor = type === 'income' ? 'text-secondary' : 'text-primary'
  const amountSign = type === 'income' ? '+' : '-'

  return (
    <article className='bg-white rounded-lg flex py-1.5 pl-2 pr-3.5 justify-between items-center'>
      <section className='flex gap-2.5'>
        <img src="/Ellipse.png" alt="transfer" />
        <div className='flex flex-col justify-center'>
          <h2 className='text-xs font-semibold text-black capitalize'>{title}</h2>
          <h3 className='text-[10px] text-dark-gray font-normal'>{date}</h3>
        </div>
      </section>
      <section>
        <h3 className={`text-xs font-bold ${amountColor}`}>{amountSign}{amount}</h3>
      </section>
    </article>
  )
}

export default transferItem