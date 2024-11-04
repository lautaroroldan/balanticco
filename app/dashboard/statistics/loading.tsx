import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loading() {
    return (
        <div>
            <Skeleton className="w-[100px] h-6 mt-12" />
            <Skeleton className="w-full h-[280px] rounded-2xl mt-6" />
            <div className='flex flex-col gap-4 mt-9'>
                <Skeleton className="w-full h-36 rounded-lg" />
                <Skeleton className="w-full h-36 rounded-lg" />
            </div>
        </div>
    )
}

export default Loading