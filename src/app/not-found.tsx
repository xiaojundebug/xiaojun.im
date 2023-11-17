'use client'

import React from 'react'
import DarkModeOnly from '@/components/DarkModeOnly'
import { useRouter } from 'next/navigation'

const title = 'Whooops!'
const message = "Sorry, the page you are looking for doesn't exist"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center px-6">
      <div className="flex flex-col items-center lg:items-start gap-8">
        <h2 className="w-fit text-black dark:text-white text-4xl lg:text-6xl font-bold">{title}</h2>
        <p className="text-zinc-500 mb-0 lg:mb-6">{message}</p>
        <button className="px-4 py-2 rounded-full bg-primary text-white" onClick={router.back}>
          Go Back
        </button>
      </div>
      <div className="relative mt-12 lg:mt-0 ml-0 lg:ml-24 motion-safe:animate-[floating_8s_ease-in-out_infinite_alternate]">
        <DarkModeOnly>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(closest-side, rgba(42, 38, 75, 0.8), transparent)`,
            }}
          ></div>
        </DarkModeOnly>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="relative w-60 lg:w-[500px]" src="/404.svg" alt="404 not found" />
      </div>
    </div>
  )
}
