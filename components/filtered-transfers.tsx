import IncomeSwitch from '@/components/income-switch'
import TransferBalanceCard from '@/components/transfer-balance-card'
import Transfers, { TransferWithFormattedDate } from '@/components/transfers'
import { TransferType } from '@/app/db/schema/transfer'
import { fetchFilteredTransfers } from '@/utils/actions'

interface FilteredTransfersProps {
    activeSwitch: TransferType
    userId: string
}

async function FilteredTransfers({ activeSwitch, userId }: FilteredTransfersProps) {

    const { transfers, firstDate, lastDate, amount } = await fetchFilteredTransfers(activeSwitch)
    return (
        <>
            <IncomeSwitch
                className='mt-9'
            />
            <TransferBalanceCard
                className='mt-12'
                initialDate={firstDate}
                finalDate={lastDate}
                amount={amount}
            />
            <Transfers
                userId={userId}
                className='mt-5 max-h-[calc(100vh-48px-24px-158px-24px-52px-36px-80px-48px-20px-105px)]'
                data={transfers as TransferWithFormattedDate[]}
            />
        </>
    )
}

export default FilteredTransfers