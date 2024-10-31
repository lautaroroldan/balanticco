import { Transfer } from '@/app/db/schema/transfer'
import TransferItem from '@/components/transfer-item'
import { getTransfers } from '@/utils/actions'

export type TransferWithFormattedDate = Transfer & { date: string }

interface TransfersProps {
    data?: TransferWithFormattedDate[]
    className?: string
    showTitle?: boolean
}

async function Transfers({ className, showTitle = false, data }: TransfersProps) {

    const transfers = data ?? await getTransfers()
    return (
        <main className={`flex flex-col gap-[22px] ${className}`}>
            {showTitle && <h2 className='text-base font-semibold text-black capitalize'>Transferencias</h2>}
            <section className='flex flex-col gap-2.5 overflow-y-auto'>
                {transfers?.map((transfer) => (
                    <TransferItem key={transfer.id} title={transfer.description} date={transfer.date} amount={transfer.amount} type={transfer.type} />
                ))}
            </section>
        </main>
    )
}

export default Transfers