import BalanceCard from '@/components/balance-card'
import { getTransfers } from '@/utils/transfer'
import FilteredTransfers from '@/components/filtered-transfers'

export default async function Page() {
    const transfers = await getTransfers()

    return (
        <main className='flex flex-col'>
            <h2 className='text-base font-semibold mt-12'>Transferencias</h2>
            <BalanceCard
                className='mt-6'
            />
            <FilteredTransfers
                transfers={transfers}
            />
        </main>
    )
}

