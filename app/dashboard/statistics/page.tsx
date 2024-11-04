import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import StatisticsList from '@/components/statistics-list'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import StatisticsChartContainer from '@/components/statistics-chart-container'
export default async function Page() {
    const session = await auth()
    if (!session) {
        redirect('/login')
    }
    return (
        <div className='flex flex-col'>
            <h2 className='text-base font-semibold mt-12'>Estadísticas</h2>
            <Suspense fallback={<Skeleton className="w-full h-[280px] rounded-2xl mt-6" />}>
                <StatisticsChartContainer userId={session.user.id} />
            </Suspense>
            <StatisticsList userId={session.user.id} />
        </div>
    )
}