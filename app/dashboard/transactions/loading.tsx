import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import SkeletonTransferItem from '@/components/skeletons/transfer-item'
import SkeletonBalanceCard from '@/components/skeletons/balance-card'


function Loading() {
    return (
        <div>
            <Skeleton className="w-[100px] h-6 mt-12" />
            <SkeletonBalanceCard />
            <Skeleton className="w-full h-14 rounded-lg mt-9" />
            <Skeleton className="w-full h-20 rounded-lg mt-12" />
            <div className="flex flex-col gap-2.5 mt-5">
                <SkeletonTransferItem />
                <SkeletonTransferItem />
            </div>
        </div>
    )
}

export default Loading