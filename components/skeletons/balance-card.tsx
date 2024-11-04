import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

function SkeletonBalanceCard({ className }: { className?: string }) {
    return (
        <Skeleton className={cn("w-full h-40 rounded-2xl mt-6", className)} />
    )
}

export default SkeletonBalanceCard