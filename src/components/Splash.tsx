import React from 'react'
import config from 'config'
import Image from 'next/image'
import { GitHub, RSS } from '@/components/icons'

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub: <GitHub className="text-xl" aria-hidden />,
  RSS: <RSS className="text-xl" aria-hidden />,
}

const Splash = () => {
  return (
    <div className="'relative my-12 sm:my-16'">
      <div className="flex items-center">
        {config.avatar && (
          <div className="relative flex-shrink-0">
            <Image
              className="object-cover rounded-full p-0.5 bg-white dark:bg-zinc-900 ring-1 ring-zinc-400/20 shadow-lg dark:shadow-none shadow-zinc-600/10"
              src={config.avatar}
              alt="avatar"
              width={64}
              height={64}
              unoptimized
              priority
            />
          </div>
        )}
        <div className="flex flex-col justify-between ml-6 space-y-3">
          <h1 className="w-fit text-3xl font-medium text-primary bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            {config.title}
          </h1>
          <span className="text-zinc-500">{config.description}</span>
          <div className="flex items-center gap-4">
            {config.links.map(social => (
              <a
                key={social.link}
                className="inline text-2xl transition-opacity opacity-50 hover:opacity-100"
                href={social.link}
                title={social.label}
                aria-label={social.label}
              >
                {SOCIAL_ICONS[social.label]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Splash
