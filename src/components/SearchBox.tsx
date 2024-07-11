'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Popover, PopoverContent } from './ui/popover'
import { Input } from './ui/input'
import { PopoverAnchor, PopoverClose } from '@radix-ui/react-popover'
import { restaurant } from '@/lib/schema/restaurant'
import { useDebounced } from '@/lib/hooks'
import { searchRestarunt } from '@/lib/actions'
import RestaurantSearchCard from './RestaurantSearchCard'
import Link from 'next/link'

export default function SearchBox() {
    const [open, setOpen] = useState(false)
    const [searchterm, setSerchTerm] = useState('')
    const [debouncedSearchterm, setDebouncedSearchTerm] = useState('')
    const [restaurants, setRestaurants] = useState<(typeof restaurant.$inferSelect)[]>([])
    const debounceCallback = useCallback(() => { setDebouncedSearchTerm(searchterm.trim()) }, [searchterm])
    useDebounced(debounceCallback, [searchterm], 1000)
    useEffect(() => {
        if (debouncedSearchterm.length > 0)
            searchRestarunt.bind(null, debouncedSearchterm)().then(list => {
                if (list && list.length > 0)
                    setRestaurants(list)
            })
    }, [debouncedSearchterm])
    return (
        <Popover open={open && restaurants.length > 0} onOpenChange={setOpen}>
            <PopoverAnchor className='w-full max-w-xs sm:max-w-sm md:max-w-screen-sm'>

                <Input
                    onChange={(event) => {
                        setOpen(true)
                        setSerchTerm(event.target.value)
                    }}
                    placeholder='Search for restaurants'
                    value={searchterm}
                />
            </PopoverAnchor>
            <PopoverContent
                onOpenAutoFocus={(event) => event.preventDefault()}
                className='w-[100svh] max-h-[33rem] max-w-xs sm:max-w-sm md:max-w-screen-sm overflow-y-auto my-5'
            >
                <div className='flex flex-col gap-2'>
                    {restaurants.map(restaurant => (
                        <PopoverClose key={restaurant.id} asChild onClick={() => {
                            setSerchTerm('')
                            setDebouncedSearchTerm('')
                        }}>
                            <Link href={`/restaurant/${restaurant.id}`}>
                                <RestaurantSearchCard rest={restaurant} />
                            </Link>
                        </PopoverClose>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
