import IncomeSwitch from './income-switch'
import TransferBalanceCard from './transfer-balance-card'
import Transfers, { TransferWithFormattedDate } from './transfers'
import { TransferType } from '@/app/db/schema/transfer'
import { fetchFilteredTransfers } from '@/utils/actions'

interface FilteredTransfersProps {
    activeSwitch: TransferType
}

async function FilteredTransfers({ activeSwitch, }: FilteredTransfersProps) {

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
                className='mt-5 max-h-[calc(100vh-48px-24px-158px-24px-52px-36px-80px-48px-20px-105px)]'
                data={transfers as TransferWithFormattedDate[]}
            />
        </>
    )
}

export default FilteredTransfers