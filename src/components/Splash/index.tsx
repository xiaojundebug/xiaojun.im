import React from 'react'
import Link from 'next/link'
import config from '@/config'

const Splash = () => {
  return (
    <div className="relative mt-12 sm:mt-20">
      <div className="container flex items-start justify-between">
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl sm:text-6xl">
            <span>{config.name}</span>
          </h1>
          <span
            className="mt-8 text-slate-500 dark:text-slate-300/70"
            style={{ fontFamily: 'Hanzipen SC, Hannotate SC, KaiTi' }}
          >
            {config.desc}
          </span>
          <div className="flex mt-8 text-3xl gap-2">
            {config.socials.map(item => (
              <Link key={item.link} href={item.link}>
                <a target="_blank"> {item.icon}</a>
              </Link>
            ))}
          </div>
        </div>
        {config.avatar && (
          <img
            className="w-20 sm:w-24 rounded-full border border-solid border-zinc-500/10"
            src={config.avatar}
            alt="avatar"
          />
        )}
      </div>
    </div>
  )
}

export default Splash
