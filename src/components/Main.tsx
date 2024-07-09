import React from 'react'

export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <main className='w-full max-w-screen-2xl mx-auto p-2 min-h-[calc(100svh-2.5rem)]'>
            {children}
        </main>
    )
}
