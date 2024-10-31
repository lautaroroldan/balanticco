"use client"
import { TransferType } from "@/app/db/schema/transfer"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

interface IncomeSwitchProps {
    className?: string
}

const options: TransferType[] = ['income', 'expense']

function IncomeSwitch({ className }: IncomeSwitchProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [activeSwitch, setActiveSwitch] = useState<TransferType>(
        (searchParams.get('type') as TransferType) || 'income'
    )
    const isActive = (type: TransferType) => activeSwitch === type
    const getTitle = (type: TransferType) => type === 'income' ? 'Ingresos' : 'Gastos'

    const handleSwitchChange = (option: TransferType) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('type', option)
        router.push(`?${params.toString()}`)
        setActiveSwitch(option)
    }

    return (
        <div className={`flex items-center justify-between p-1 gap-1 bg-white rounded-lg ${className}`}>
            {options.map((option, index) => (
                <button 
                    key={index} 
                    className={`text-sm font-semibold w-full py-3 rounded-lg ${isActive(option as TransferType) ? 'bg-gradient-to-r from-blue-gradient via-purple-gradient to-orange-gradient text-white' : 'bg-custom-white text-dark-gray'}`} 
                    onClick={() => handleSwitchChange(option as TransferType)}
                >
                    {getTitle(option as TransferType)}
                </button>
            ))}
        </div>
    )
}

export default IncomeSwitch