import StatisticsChart from '@/components/statistics-chart'
import React from 'react'

function Page() {
    return (
        <div className='mt-12'>
            <h2 className='text-base font-semibold'>Estadísticas</h2>
            <StatisticsChart className='mt-6' />
        </div>
    )
}

export default Page