import Transfers from '@/components/transfers'
import BalanceCard from '@/components/balance-card'

export default async function Page() {
    return (
        <main className='flex flex-col gap-9'>
            <BalanceCard
                className='mt-24'
            />
            <Transfers
                showTitle />
        </main>
    )
}