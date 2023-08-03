import React from 'react'
import styles from './styles.module.scss'
import { FiGithub, FiLink } from 'react-icons/fi'
import config from 'config'
import Link from 'next/link'
import clsx from 'clsx'

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  'GitHub': <FiGithub className="text-lg" aria-hidden />,
  '友链': <FiLink className="text-lg" aria-hidden />
}

const Splash = () => {
  return (
    <div className={clsx(styles.splash, 'relative my-12 sm:my-16')}>
      <div className="flex items-center">
        {config.avatar && (
          <div className="relative flex-shrink-0">
            <img
              className="w-20 h-20 object-cover rounded-full shadow-zinc-600/10 shadow-xl dark:shadow-none"
              src={config.avatar}
              alt="avatar"
            />
            <div className="absolute inset-0 ring-1 ring-inset rounded-full ring-black/10 dark:ring-white/10" />
          </div>
        )}
        <div className="flex flex-col justify-between ml-6 space-y-3 leading-none">
          <h1 className="w-fit text-3xl sm:text-4xl font-medium">{config.title}</h1>
          <span className="text-zinc-400">{config.description}</span>
          <div className="flex items-center gap-4">
            {config.socials.map(social => (
              <Link key={social.link} href={social.link}>
                <a
                  className="inline text-2xl leading-none transition-opacity opacity-50 hover:opacity-100"
                  title={social.label}
                  aria-label={social.label}
                >
                  {SOCIAL_ICONS[social.label]}
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
