"use client"
import TransferItem from '@/components/transfer-item'
import useTransferStore from '@/app/store/transfer-store'

function Transfers() {
    const transfers = useTransferStore((state) => state.transfers)
    return (
        <main className='flex flex-col gap-[22px]'>
            <h2 className='text-base font-semibold text-black capitalize'>Transferencias</h2>
            <section className='flex flex-col gap-2.5'>
                {transfers.map((transfer) => (
                    <TransferItem key={transfer.id} title={transfer.description} date={transfer.date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', })} amount={`$${transfer.amount}`} type={transfer.type} />
                ))}
            </section>
        </main>
    )
}

export default Transfers