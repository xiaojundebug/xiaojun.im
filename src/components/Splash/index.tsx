import React from 'react'
import styles from './styles.module.scss'
import config from 'config'
import Link from 'next/link'
import classNames from 'classnames'

const Splash = () => {
  return (
    <div className={classNames(styles.splash, 'relative my-12 sm:my-16')}>
      <div className="flex items-center">
        {config.avatar && (
          <div className="relative">
            <img
              className="w-20 h-20 object-cover rounded-full shadow-zinc-600/10 shadow-xl dark:shadow-none"
              src={config.avatar}
              alt="avatar"
            />
            <div className="absolute inset-0 ring-1 ring-inset rounded-full ring-black/10 dark:ring-white/10" />
          </div>
        )}
        <div className="flex flex-col justify-between ml-6 space-y-3 leading-none">
          <h1 className="text-3xl sm:text-4xl font-medium">
            <span>{config.title}</span>
          </h1>
          <span className="text-zinc-400">{config.desc}</span>
          <div className="flex items-center gap-4">
            {config.socials.map(social => (
              <Link key={social.link} href={social.link}>
                <a
                  className="inline text-2xl leading-none transition-opacity opacity-50 hover:opacity-100"
                  title={social.label}
                  aria-label={social.label}
                >
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
