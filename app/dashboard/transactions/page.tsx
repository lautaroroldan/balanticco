import BalanceCard from '@/components/balance-card'
import FilteredTransfers from '@/components/filtered-transfers'
import { TransferType } from '@/app/db/schema/transfer'

export default async function Page({searchParams}: {searchParams: {type: TransferType}}) {
    return (
        <main className='flex flex-col'>
            <h2 className='text-base font-semibold mt-12'>Transferencias</h2>
            <BalanceCard
                className='mt-6'
            />
            <FilteredTransfers
                activeSwitch={searchParams.type}
            />
        </main>
    )
}

