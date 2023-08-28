'use client'

import React, { useEffect, useRef, useState } from 'react'
import { animated, useTransition } from '@react-spring/web'
import {
  animationFrameScheduler,
  distinctUntilChanged,
  fromEvent,
  map,
  startWith,
  throttleTime,
} from 'rxjs'
import { ArrowUp } from '@/components/icons'

const BackToTop = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const transitions = useTransition(visible, {
    from: { opacity: 0, y: 100 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 100 },
    config: { tension: 280, friction: 20 },
  })

  useEffect(() => {
    const sub = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(0, animationFrameScheduler),
        startWith(null),
        map(() => window.scrollY > 500),
        distinctUntilChanged(),
      )
      .subscribe(bool => {
        setVisible(bool)
      })
    return () => sub.unsubscribe()
  }, [])

  function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          ref={ref}
          className="fixed right-8 bottom-8 sm:right-16 sm:bottom-16 z-50 p-3 rounded-full cursor-pointer
            border border-zinc-400/20 dark:border-none
            bg-white dark:bg-zinc-900"
          onClick={backToTop}
          style={styles}
        >
          <ArrowUp className="text-xl text-black dark:text-white" aria-hidden />
        </animated.div>
      ),
  )
}

export default BackToTop
