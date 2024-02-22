'use client'

import React, { useEffect, useRef } from 'react'
import { animated, useTransition } from '@react-spring/web'
import { animationFrameScheduler, distinctUntilChanged, fromEvent, map, throttleTime } from 'rxjs'
import { ArrowUp } from '@/components/icons'
import useBoolean from '@/hooks/useBoolean'

const BackToTop = () => {
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
    (styles, item) =>
      item && (
        <animated.button
          ref={ref}
          className="fixed right-8 bottom-8 sm:right-16 sm:bottom-16 z-50 flex items-center justify-center w-10 h-10 cursor-pointer
            rounded-xl ring-1 ring-zinc-400/20
            shadow-lg shadow-black/5 dark:shadow-none active:shadow-none
            bg-white/70 dark:bg-white/10 backdrop-blur"
          onClick={backToTop}
          style={styles}
        >
          <ArrowUp className="text-xl text-black dark:text-white" aria-hidden />
        </animated.button>
      ),
  )
}

export default BackToTop
