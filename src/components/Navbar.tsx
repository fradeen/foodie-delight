import React from 'react'
import HamburgerMenu from './HamburgerMenu'
import SearchBox from './SearchBox'
import Link from 'next/link'
import { Home } from 'lucide-react'

export default async function Navbar() {
    const links = [{ title: 'Dashboard', src: '/dashboard' }]
    return (
        <nav className='w-full max-w-screen-2xl mx-auto sticky top-0 p-2 z-10 flex gap-5 items-center justify-between bg-white/80'>
            <div className='flex gap-2 items-center size-fit'>
                <HamburgerMenu />
                <Link href='/' className='size-fit items-center gap-2'>
                    <Home size={30} />
                    <span className='text-3xl text-nowrap hidden sm:flex '>Foodie Delight</span>
                </Link>
            </div>
            <SearchBox />
            <div className='hidden sm:block'>
                {links.map(link => (<Link key={link.src} href={link.src} className='text-xl'>{link.title}</Link>))}
            </div>
        </nav>
    )
}
