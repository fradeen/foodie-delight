'use client'
import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function HamburgerMenu() {
    const links = [{ title: 'Dashboard', src: '/dashboard' }]
    const pathname = usePathname()
    return (
        <Sheet>
            <SheetTrigger asChild className='sm:hidden'>
                <button><MenuIcon size={40} /></button>
            </SheetTrigger>
            <SheetContent side={'left'} className='border-0 pt-20 text-2xl flex flex-col gap-5 items-center w-fit'>
                {links.map(link => (
                    <SheetClose asChild key={link.title}>
                        {
                            pathname === link.src ?
                                (<span className='text-3xl text-muted-foreground'>{link.title}</span>)
                                :
                                (<Link href={link.src}>{link.title}</Link>)
                        }
                    </SheetClose>))}
            </SheetContent>
        </Sheet>
    )
}
