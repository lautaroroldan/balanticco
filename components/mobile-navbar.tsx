"use client"
import { ArrowRightLeft, Home, ChartNoAxesColumn, Bolt } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import AddTransferDialog from '@/components/add-transfer-dialog'

interface MobileNavbarProps {
    userId: string
}

function MobileNavbar({ userId }: MobileNavbarProps) {

    const pathname = usePathname()
    const isActive = (path: string) => pathname === path

    const size = 30
    return (
        <footer className='fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-full drop-shadow-lg w-[350px] mb-4'>
            <nav className='flex justify-between items-center px-5 pt-3 pb-2'>
                <Link href='/dashboard/home'>
                    <Home size={size} color={isActive('/dashboard/home') ? '#956EDB' : '#ABABAB'} />
                </Link>
                <Link href='/dashboard/transactions'>
                    <ArrowRightLeft size={size} color={isActive('/dashboard/transactions') ? '#956EDB' : '#ABABAB'} />
                </Link>
                <AddTransferDialog size={size} userId={userId} />
                <Link href='/dashboard/statistics'>
                    <ChartNoAxesColumn size={size} color={isActive('/dashboard/statistics') ? '#956EDB' : '#ABABAB'} />
                </Link>
                <Link href='/dashboard/settings'>
                    <Bolt size={size} color={isActive('/dashboard/settings') ? '#956EDB' : '#ABABAB'} />
                </Link>
            </nav>
        </footer>
    )
}

export default MobileNavbar