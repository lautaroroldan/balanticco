"use client"
import { ArrowRightLeft, Home, ChartNoAxesColumn, Bolt } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import AddTransferDialog from '@/components/add-transfer-dialog'


function MobileNavbar() {

    const pathname = usePathname()
    const isActive = (path: string) => pathname === path

    const size = 30
    return (
        <footer className='fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-full drop-shadow-lg w-[350px] mb-4'>
            <nav className='flex justify-between items-center px-5 pt-3 pb-2'>
                <Link href='/dashboard'>
                    <Home size={size} color={isActive('/dashboard') ? '#956EDB' : '#ABABAB'} />
                </Link>
                <Link href='/transactions'>
                    <ArrowRightLeft size={size} color={isActive('/transactions') ? '#956EDB' : '#ABABAB'} />
                </Link>
                <AddTransferDialog size={size} />
                <Link href='/statistics'>
                    <ChartNoAxesColumn size={size} color={isActive('/statistics') ? '#956EDB' : '#ABABAB'} />
                </Link>
                <Link href='/settings'>
                    <Bolt size={size} color={isActive('/settings') ? '#956EDB' : '#ABABAB'} />
                </Link>
            </nav>
        </footer>
    )
}

export default MobileNavbar