import BalanceCard from '@/components/balance-card'
import FilteredTransfers from '@/components/filtered-transfers'
import { TransferType } from '@/app/db/schema/transfer'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Page({ searchParams }: { searchParams: { type: TransferType } }) {
    const session = await auth()
    if (!session) {
        redirect('/login')
    }
    return (
        <main className='flex flex-col'>
            <h2 className='text-base font-semibold mt-12'>Transferencias</h2>
            <BalanceCard
                userId={session.user.id}
                className='mt-6'
            />
            <FilteredTransfers
                userId={session.user.id}
                activeSwitch={searchParams.type}
            />
        </main>
    )
}

