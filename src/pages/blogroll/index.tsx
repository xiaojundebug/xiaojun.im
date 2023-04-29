import React from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'
import config from 'config'
import { animated, useTransition } from '@react-spring/web'

const links = config.blogroll || []

const Blogroll = () => {
  const transitions = useTransition(links, {
    from: { scale: 0.5, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    leave: { scale: 0.5, opacity: 0 },
    trail: 400 / links.length,
    reset: true,
  })

  return (
    <div
      className={classNames(styles.blogroll, 'prose-container flex flex-col items-center justify-center')}
    >
      <h2
        className={classNames(
          styles.title,
          'relative font-medium font-serif text-5xl mt-20 sm:mt-40',
        )}
      >
        友链
      </h2>
      <p className="font-medium text-sm m-10 sm:m-14">共 {links.length} 个友链</p>
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

export default Blogroll
