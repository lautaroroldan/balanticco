import React from 'react'
import SkeletonBalanceCard from '@/components/skeletons/balance-card'
import { Skeleton } from '@/components/ui/skeleton'
import SkeletonTransferItem from '@/components/skeletons/transfer-item'

function Loading() {
    return (
        <div>
            <SkeletonBalanceCard className='mt-24' />
            <Skeleton className="w-[100px] h-6 mt-12" />
            <div className="flex flex-col gap-2.5 mt-5">
                <SkeletonTransferItem />
                <SkeletonTransferItem />
                <SkeletonTransferItem />
                <SkeletonTransferItem />
            </div>
        </div>
    )
}

export default Loading