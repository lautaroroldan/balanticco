import Transfers from '@/components/transfers'
import BalanceCard from '@/components/balance-card'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
    const session = await auth()
    if (!session) {
        redirect('/login')
    }
    return (
        <main className='flex flex-col gap-9'>
            <BalanceCard
                userId={session.user.id}
                className='mt-24'
            />
            <Transfers
                userId={session.user.id}
                showTitle />
        </main>
    )
}