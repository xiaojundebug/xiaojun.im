'use client'

import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'
import config from 'config'
import { animated, useTransition } from '@react-spring/web'
import useTranslation from '@/hooks/useTranslation'

const links: { name: string; link: string }[] = config.friends || []

export default function Friends() {
  const { t } = useTranslation()
  const transitions = useTransition(links, {
    from: { scale: 0.5, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    leave: { scale: 0.5, opacity: 0 },
    trail: 400 / links.length,
    reset: true,
  })

  return (
    <div
      className={clsx(styles.friends, 'prose-container flex flex-col items-center justify-center')}
    >
      <h2 className={clsx(styles.title, 'relative font-bold text-5xl mt-20 sm:mt-40 italic')}>
        {t('friends-page.title')}
      </h2>
      <p className="font-medium text-sm m-10 sm:m-14">
        {t('friends-page.desc', { count: links.length })}
      </p>
      <div className="flex items-center justify-center flex-wrap gap-7 text-2xl">
        {transitions((linkStyles, { name, link }) => (
          <animated.div key={link} style={linkStyles}>
            {/* eslint-disable-next-line */}
            <a
              key={link}
              className="border-b border-current transition hover:text-[#52c8d5]"
              href={link}
              target="_blank"
            >
              {name}
            </a>
          </animated.div>
        ))}
      </div>
    </div>
  )
}
