"use client"
import { ArrowRightLeft, Home, Plus, ChartNoAxesColumn, Bolt } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


function MobileNavbar() {

    const pathname = usePathname()
    const isActive = (path: string) => pathname === path
    const PlusCircleIcon = () => {
        return (
            <div className='bg-gradient-to-r from-blue-gradient via-purple-gradient via-53% to-orange-gradient to-92% rounded-full p-1.5 flex items-center justify-center'>
                <Plus size={size} color='#FFF' />
            </div>
        )
    }

    const size = 30
    return (
        <footer className='fixed bottom-0 bg-white pt-3 pb-2 mb-4 rounded-full drop-shadow-lg w-[350px]'>
            <nav className='flex justify-between items-center px-5'>
                <Link href='/dashboard'>
                    <Home size={size} color={isActive('/dashboard') ? '#956EDB' : '#ABABAB'} />
                </Link>
                <Link href='/transactions'>
                    <ArrowRightLeft size={size} color={isActive('/transactions') ? '#956EDB' : '#ABABAB'} />
                </Link>
                <Link href='/new-transaction'>
                    <PlusCircleIcon />
                </Link>
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