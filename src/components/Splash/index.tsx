import React from 'react'
import config from '@/config'

const Splash = () => {
  return (
    <div className="relative my-12 sm:my-16">
      <div className="container flex">
        {config.avatar && (
          <img
            className="w-20 rounded-full border border-zinc-600/10 shadow-zinc-600/10 shadow-xl dark:shadow-none p-2"
            src={config.avatar}
            alt="avatar"
          />
        )}
        <div className="flex flex-col justify-between ml-6">
          <h1 className="text-3xl sm:text-4xl font-medium">
            <span>{config.name}</span>
          </h1>
          <span className="text-slate-500 dark:text-slate-300/70">{config.desc}</span>
        </div>
      </div>
    </div>
  )
}

export default Splash
