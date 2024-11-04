'use client'
import { Loader2, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import CheckboxGroup from '@/components/checkbox-group'
import { TransferType } from '@/app/db/schema/transfer'
import { Button } from '@/components/ui/button'
import { addTransfer } from '@/utils/actions'
import { TransferSchema } from '@/lib/zod'
import { toast } from "sonner"

interface AddTransferDialogProps {
    size: number
    userId: string
}

function AddTransferDialog({ size, userId }: AddTransferDialogProps) {

    const [transferType, setTransferType] = useState<TransferType>('income')
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)
        const newTransfer = {
            amount: Number(formData.get('amount')),
            description: formData.get('description'),
            transferType,
            userId
        }
        const result = TransferSchema.safeParse(newTransfer)
        if (!result.success) {
            toast.error('Error al agregar la operación', { description: result.error.issues.map(issue => issue.message).join(', ') })
            setIsLoading(false)
            return
        }
        try {
            const { amount, description, transferType } = result.data
            await addTransfer(amount, description, transferType, userId)
        } catch (error) {
            toast.error('Error al agregar la operación')
        } finally {
            setIsLoading(false)
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className='bg-gradient-to-r from-blue-gradient via-purple-gradient via-53% to-orange-gradient to-92% rounded-full p-1.5 flex items-center justify-center'>
                    <Plus size={size} color='#FFF' />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-w-sm">
                <DialogHeader>
                    <DialogTitle className='font-semibold text-lg'>Agregar operación</DialogTitle>
                    <DialogDescription>
                        Completa los campos para agregar una operación
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className='flex flex-col gap-4'>
                    <div className="grid flex-1 gap-4">
                        <Input
                            id="description"
                            name='description'
                            placeholder='Descripción'
                        />
                        <Input
                            id="amount"
                            name='amount'
                            placeholder='Monto'
                        />
                        <CheckboxGroup
                            value={transferType}
                            onChange={setTransferType}
                        />
                    </div>
                    <Button type="submit" className='w-full bg-gradient-to-r from-blue-gradient via-purple-gradient via-53% to-orange-gradient to-92% rounded-lg py-2.5 px-4 text-white' disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 size={20} className='animate-spin' />
                                {'Guardando...'}
                            </>
                        ) : 'Guardar'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default AddTransferDialog
