import StatisticsChart from '@/components/statistics-chart'
import StatisticsList from '@/components/statistics-list'
import { getTransfers } from '@/utils/transfer'

async function Page() {
    const transfers = await getTransfers()
    return (
        <div className='flex flex-col'>
            <h2 className='text-base font-semibold mt-12'>Estadísticas</h2>
            <StatisticsChart className='mt-6 rounded-xl' transfers={transfers} />
            <StatisticsList />
        </div>
    )
}

export default Page