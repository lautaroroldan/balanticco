import { formatCurrency } from "@/utils/format"


interface TransferBalanceCardProps {
    className?: string
    initialDate: string
    finalDate: string
    amount: number
}

function TransferBalanceCard({ className, initialDate, finalDate, amount }: TransferBalanceCardProps) {
    return (
        <div className={`flex flex-col gap-2 bg-white rounded-lg py-3 items-center ${className}`}>
            <h2 className='font-medium text-xs text-[#6A6A6A]'>{initialDate} - {finalDate}</h2>
            <h3 className='font-semibold text-2xl'>{formatCurrency(amount)}</h3>
        </div>
    )
}

export default TransferBalanceCard