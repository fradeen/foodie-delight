import { drizzle } from 'drizzle-orm/d1'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { restaurant } from '@/lib/schema/restaurant';
import { asc } from "drizzle-orm";
import RestaurantsList from '@/components/RestaurantsList';
export const runtime = 'edge'

export default async function Home() {
  const db = drizzle(getRequestContext().env.DB);
  const restaurants = await db
    .select()
    .from(restaurant)
    .orderBy(asc(restaurant.dateAdded))
    .limit(3)
    .offset(0)
  return (
    <>
      <div className='flex justify-between items-center gap-2 mt-10'>
        <h1 className='text-3xl font-semibold'>All Restaurants available on our platform</h1>
      </div>
      <RestaurantsList initialList={restaurants} showOptions={false} />
    </>
  )
}

