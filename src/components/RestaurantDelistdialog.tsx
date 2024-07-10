'use client'
import React, { useRef } from 'react'
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { deleteRestaurant } from '@/lib/actions';
import { useToast } from './ui/use-toast';
export default function RestaurantDelistdialog({ id, name }: { id: number, name: String }) {
    const { toast } = useToast()
    let closeButtonRef = useRef<HTMLButtonElement>(null)
    async function onSubmit() {
        let error = await deleteRestaurant.bind(null, id)()
        closeButtonRef.current?.click()
        toast({
            title: error ? "Uh oh! Something went wrong." : "Restaurant delisted successfully.",
            description: error ? error.toString() : undefined,
            variant: error ? 'destructive' : 'default'
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='destructive'>Delist</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-inherit">
                <DialogHeader>
                    <DialogTitle>Delist: {name}</DialogTitle>
                    <DialogDescription>
                        Delisting a restaurant is permanent; once delisted all dishes associated to it will also be permanently removed.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <Button variant='destructive' className='mx-auto'>Delist: {name}</Button>
                </form>
                <DialogClose asChild>
                    <button ref={closeButtonRef} type='button' className='hidden' tabIndex={-1} />
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}
