import { z } from "zod"
import { TransferTypeEnum } from "@/app/db/schema/transfer"

export const transferTypeSchema = z.nativeEnum(TransferTypeEnum)

export const TransferSchema = z.object({
    description: z.string().min(1, { message: 'La descripción es requerida' }),
    amount: z.number().min(1, { message: 'El monto no puede ser menor a 1' }),
    transferType: transferTypeSchema,
})