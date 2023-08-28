import React from 'react'
import config from 'config'
import Link from 'next/link'
import { GitHub, Link as Friends } from '@/components/icons'

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub: <GitHub className="text-lg" aria-hidden />,
  友链: <Friends className="text-lg" aria-hidden />,
}

const Splash = () => {
  return (
    <div className="'relative my-12 sm:my-16'">
      <div className="flex items-center">
        {config.avatar && (
          <div className="relative flex-shrink-0">
            <img
              className="w-16 h-16 object-cover rounded-full shadow-zinc-600/10 shadow-xl dark:shadow-none"
              src={config.avatar}
              alt="avatar"
            />
            <div className="absolute inset-0 ring-1 ring-inset rounded-full ring-black/10 dark:ring-white/10"></div>
          </div>
        )}
        <div className="flex flex-col justify-between ml-6 space-y-3">
          <h1 className="w-fit text-3xl font-medium text-primary bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            {config.title}
          </h1>
          <span className="text-zinc-500">{config.description}</span>
          <div className="flex items-center gap-4">
            {config.socials.map(social => (
              <Link
                key={social.link}
                className="inline text-2xl transition-opacity opacity-50 hover:opacity-100"
                href={social.link}
                title={social.label}
                aria-label={social.label}
              >
                {SOCIAL_ICONS[social.label]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Splash
