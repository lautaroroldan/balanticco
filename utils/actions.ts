"use server"
import { unstable_cache as cache } from 'next/cache'
import { db } from "@/app/db/client"
import { transferTable } from "@/app/db/schema/transfer"

export const getTransfers = cache(async () => {
    const transfers = await db.select().from(transferTable).all()
    return transfers.map((transfer) => ({
        ...transfer,
        date: new Date(transfer.date)
    }))
}, ['get-transfers'], { revalidate: 3600, tags: ['get-transfers'] })