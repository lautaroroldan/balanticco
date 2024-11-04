import { fetchStatisticsChartData } from '@/utils/actions'
import React from 'react'
import StatisticsChart from './statistics-chart'

async function StatisticsChartContainer({ userId }: { userId: string }) {
    const data = await fetchStatisticsChartData(userId, new Date().getFullYear())
    return (
        <StatisticsChart data={data} className='mt-6 rounded-xl' />
    )
}

export default StatisticsChartContainer