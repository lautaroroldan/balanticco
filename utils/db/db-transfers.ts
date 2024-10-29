"use server"
import { Transfer } from "@/app/db/schema/transfer"
import { transferTable } from "@/app/db/schema/transfer"
import { db } from "@/app/db/client"
import { revalidateTag } from "next/cache"

export const addTransferDB = async (transfer: Omit<Transfer, 'date'>) => {
    try {
        await db.insert(transferTable).values({
            ...transfer,
        })
        revalidateTag('get-transfers')
        return {
            id: transfer.id,
        }
    } catch (error) {
        console.error(error)
    }
}
export const getTransfersDB = async (): Promise<Transfer[]> => {
    const transfers = await db.select().from(transferTable)

    return transfers.map((transfer) => ({
        ...transfer,
        date: new Date(transfer.date)
    }))
}
