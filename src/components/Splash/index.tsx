import React from 'react'
import config from '@/config'
import Link from 'next/link'

const Splash = () => {
  return (
    <div className="splash relative my-12 sm:my-16">
      <div className="container flex items-center">
        {config.avatar && (
          <img
            className="w-20 h-20 rounded-full border border-zinc-600/10 shadow-zinc-600/10 shadow-xl dark:shadow-none"
            src={config.avatar}
            alt="avatar"
          />
        )}
        <div className="flex flex-col justify-between ml-6 space-y-3 leading-none">
          <h1 className="text-3xl sm:text-4xl font-medium">
            <span>{config.title}</span>
          </h1>
          <span className="text-zinc-400">{config.desc}</span>
          <div className="flex items-center gap-4 text-zinc-500">
            {config.socials.map(social => (
              <Link key={social.link} href={social.link}>
                <a className="inline text-2xl leading-none transition-colors hover:text-black dark:hover:text-white">
                  {social.icon}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Splash
