'use client'
import { Loader2, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import CheckboxGroup from '@/components/checkbox-group'
import { TransferType } from '@/app/db/schema/transfer'
import { Button } from '@/components/ui/button'
import { addTransfer } from '@/utils/actions'

interface AddTransferDialogProps {
    size: number
}

function AddTransferDialog({ size }: AddTransferDialogProps) {

    const [transferType, setTransferType] = useState<TransferType>('income')
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.target as HTMLFormElement)
        const amount = formData.get('amount') as string
        const description = formData.get('description') as string
        await addTransfer(Number(amount), description, transferType)
        setIsLoading(false)
        setOpen(false)
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
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
