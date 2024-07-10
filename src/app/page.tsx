'use client'
import React, { useCallback, useState, useEffect } from 'react'
import { restaurant } from '@/lib/schema/restaurant';
import RestaurantCard from '@/components/RestaurantCard';
import { useInView } from "react-intersection-observer"
import { Button } from '@/components/ui/button';
import { getRestaurant } from '@/lib/actions';
import Link from 'next/link';

export const runtime = 'edge'

export default function Home() {
  const [restaurants, setRestaurants] = useState<(typeof restaurant.$inferSelect)[]>([])
  const [page, setPage] = useState(1)
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
      <div className='flex justify-between items-center gap-2 mt-10'>
        <h1 className='text-3xl font-semibold'>All Restaurants available on our platform</h1>
      </div>
      <div className={`mx-auto w-fit grid grid-cols-1 ${restaurants.length > 1 ? 'sm:grid-cols-2' : ''} ${restaurants.length > 2 ? 'md:grid-cols-3' : ''} justify-items-center content-center gap-5 mt-10`}>
        {
          restaurants.map(restaurant => (
            <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
              <RestaurantCard rest={restaurant} showOptions={false} />
            </Link>
          ))
        }
      </div>
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

