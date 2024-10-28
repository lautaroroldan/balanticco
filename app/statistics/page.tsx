import StatisticsChart from '@/components/statistics-chart'
import StatisticsList from '@/components/statistics-list'
import React from 'react'

function Page() {
    return (
        <div className='flex flex-col'>
            <h2 className='text-base font-semibold mt-12'>Estadísticas</h2>
            <StatisticsChart className='mt-6 rounded-xl' />
            <StatisticsList />
        </div>
    )
}

export default Page