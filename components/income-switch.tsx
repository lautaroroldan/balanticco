import { TransferType } from "./transfer-item"

interface IncomeSwitchProps {
    className?: string
    activeSwitch: TransferType
    setActiveSwitch: React.Dispatch<React.SetStateAction<TransferType>>
}

function IncomeSwitch({ className, activeSwitch, setActiveSwitch }: IncomeSwitchProps) {
    const isActive = (type: TransferType) => activeSwitch === type
    const options = ['income', 'expense']
    const getTitle = (type: TransferType) => type === 'income' ? 'Ingresos' : 'Gastos'

    return (
        <div className={`flex items-center justify-between p-1 gap-1 bg-white rounded-lg ${className}`}>
            {options.map((option, index) => (
                <button key={index} className={`text-sm font-semibold w-full py-3 rounded-lg ${isActive(option as TransferType) ? 'bg-gradient-to-r from-blue-gradient via-purple-gradient to-orange-gradient text-white' : 'bg-custom-white text-dark-gray'}`} onClick={() => setActiveSwitch(option as TransferType)}>{getTitle(option as TransferType)}</button>
            ))}
        </div>
    )
}

export default IncomeSwitch