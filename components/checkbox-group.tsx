import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
import { TransferType } from './transfer-item'

interface CheckboxGroupProps {
    value: TransferType
    onChange: (type: TransferType) => void
}


function CheckboxGroup({ value, onChange }: CheckboxGroupProps) {

    const handleChange = (type: TransferType) => {
        onChange(type)
    }

    const isChecked = (type: TransferType) => {
        return value === type
    }

    const options = [
        {
            id: 'income',
            label: 'Ingreso',
            checked: isChecked('income')
        },
        {
            id: 'expense',
            label: 'Gasto',
            checked: isChecked('expense')
        }
    ]

    return (
        <div className='flex justify-evenly items-center gap-2'>
            {options.map((option) => (
                <div className='flex items-center gap-2' key={option.id}>
                    <Checkbox
                        id={option.id}
                        checked={option.checked}
                        onCheckedChange={() => handleChange(option.id as TransferType)}
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                </div>
            ))}
        </div>
    )
}

export default CheckboxGroup