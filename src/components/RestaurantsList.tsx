'use client'
import React, { useCallback, useState, useEffect } from 'react'
import { restaurant } from '@/lib/schema/restaurant';
import RestaurantCard from '@/components/RestaurantCard';
import { useInView } from "react-intersection-observer"
import { Button } from '@/components/ui/button';
import { getRestaurant } from '@/lib/actions';
import Link from 'next/link';

export default function RestaurantsList({ initialList, showOptions }: { initialList: (typeof restaurant.$inferSelect)[], showOptions: boolean }) {
    const [restaurants, setRestaurants] = useState<(typeof restaurant.$inferSelect)[]>(initialList)
    const [page, setPage] = useState(2)
    const [scrollTrigger, isInView] = useInView();
    const [hasMoreData, setHasMoreData] = useState(true);
    const getRestaurantsByPage = getRestaurant.bind(null, page)
    const loadRestaurants = useCallback(async () => {
        if (hasMoreData) {
            const restList = await getRestaurantsByPage()
            if (restList?.length === 0) {
                setHasMoreData(false)
            } else if (restList && restList?.length > 0) {
                setRestaurants(prev => [...prev, ...restList])
                setPage(prev => prev + 1)
            }
        }
    }, [getRestaurantsByPage, hasMoreData])
    useEffect(() => {
        if (isInView && hasMoreData) {
            loadRestaurants();
        }
    }, [isInView, hasMoreData, loadRestaurants]);
    return (
        <>
            <div className={`mx-auto w-fit grid grid-cols-1 ${restaurants.length > 1 ? 'sm:grid-cols-2' : ''} ${restaurants.length > 2 ? 'md:grid-cols-3' : ''} justify-items-center content-center gap-5 mt-10`}>
                {
                    restaurants.map(restaurant => (
                        showOptions ? (
                            <RestaurantCard key={restaurant.id} rest={restaurant} showOptions={showOptions} />
                        ) : (
                            <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                                <RestaurantCard rest={restaurant} showOptions={showOptions} />
                            </Link>
                        )
                    ))
                }
            </div >
            <div className='flex items-center justify-center my-10'>
                {hasMoreData ? (
                    <Button variant='outline' type='button' ref={scrollTrigger} onClick={loadRestaurants}>Show more Restaurants</Button>
                ) : (
                    <Button variant='ghost' type='button' disabled >No more restaurants to load</Button>
                )}
            </div>
        </>
    )
}
