'use client'

import React, { useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import { animated, useTransition } from '@react-spring/web'
import { animationFrameScheduler, distinctUntilChanged, fromEvent, map, throttleTime } from 'rxjs'
import { ArrowUp } from '@/components/icons'
import useBoolean from '@/hooks/useBoolean'
import clsx from 'clsx'

const Index = () => {
  const [isVisible, { set: setIsVisible }] = useBoolean(false)
  const ref = useRef<HTMLButtonElement>(null)

  const transitions = useTransition(isVisible, {
    from: { opacity: 0, y: 100 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 100 },
    config: { tension: 280, friction: 20 },
  })

  useEffect(() => {
    const sub = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(0, animationFrameScheduler),
        map(() => window.scrollY > 500),
        distinctUntilChanged(),
      )
      .subscribe(setIsVisible)
    return () => sub.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return transitions(
    (btnStyles, item) =>
      item && (
        <animated.button
          ref={ref}
          className={clsx(
            styles.backToTop,
            'fixed right-8 bottom-8 sm:right-16 sm:bottom-16 z-50 w-10 h-10 cursor-pointer',
          )}
          onClick={backToTop}
          style={btnStyles}
        >
          <div className="absolute inset-0 flex items-center justify-center rounded-full shadow-lg shadow-black/5 dark:shadow-none active:shadow-none">
            <div className="absolute inset-0.5 rounded-full bg-white dark:bg-zinc-950"></div>
            <ArrowUp className="relative text-xl text-black dark:text-white" aria-hidden />
          </div>
        </animated.button>
      ),
  )
}

export default Index
