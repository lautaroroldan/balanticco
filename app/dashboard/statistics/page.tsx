import { auth } from '@/auth'
import StatisticsChart from '@/components/statistics-chart'
import { redirect } from 'next/navigation'
import StatisticsList from '@/components/statistics-list'

export default async function Page() {
    const session = await auth()
    if (!session) {
        redirect('/login')
    }
    return (
        <div className='flex flex-col'>
            <h2 className='text-base font-semibold mt-12'>Estadísticas</h2>
            <StatisticsChart userId={session.user.id} className='mt-6 rounded-xl' />
            <StatisticsList userId={session.user.id} />
        </div>
    )
}