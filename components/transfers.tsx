import TransferItem from '@/components/transfer-item'
import { Transfer } from '@/store/transfer-store'
import { formatDate } from '@/utils/format'

interface TransfersProps {
    data: Transfer[]
    className?: string
    showTitle?: boolean
}

function Transfers({ className, showTitle = false, data }: TransfersProps) {
    return (
        <main className={`flex flex-col gap-[22px] ${className}`}>
            {showTitle && <h2 className='text-base font-semibold text-black capitalize'>Transferencias</h2>}
            <section className='flex flex-col gap-2.5 overflow-y-auto'>
                {data?.map((transfer) => (
                    <TransferItem key={transfer.id} title={transfer.description} date={formatDate(transfer.date, { day: '2-digit', month: 'short', year: 'numeric', })} amount={transfer.amount} type={transfer.type} />
                ))}
            </section>
        </main>
    )
}

export default Transfers