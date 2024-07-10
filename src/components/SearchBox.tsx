'use client'
import React, { useState } from 'react'
import { Popover, PopoverContent } from './ui/popover'
import { Input } from './ui/input'
import { PopoverAnchor } from '@radix-ui/react-popover'

export default function SearchBox() {
    const [open, setOpen] = useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor className='w-full max-w-xs sm:max-w-sm md:max-w-screen-sm'>

                <Input
                    onChange={() => setOpen(true)}
                    placeholder='Search for restaurants'
                />
            </PopoverAnchor>
            <PopoverContent
                onOpenAutoFocus={(event) => event.preventDefault()}
                className='w-[100svh] max-w-xs sm:max-w-sm md:max-w-screen-sm'
            >
                <ul>
                    <li>hello</li>
                    <li>bye</li>
                </ul>
            </PopoverContent>
        </Popover>
    )
}
