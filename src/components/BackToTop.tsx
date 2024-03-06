'use client'

import React, { useEffect, useRef } from 'react'
import { animated, useTransition } from '@react-spring/web'
import { distinctUntilChanged, map } from 'rxjs'
import { ArrowUp } from '@/components/icons'
import useBoolean from '@/hooks/useBoolean'
import { windowScroll$ } from '@/common/observables'

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
    const sub = windowScroll$
      .pipe(
        map(() => window.scrollY > 1000),
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
          className="fixed right-12 bottom-12 z-50 flex items-center justify-center w-10 h-10 rounded-xl bg-primary cursor-pointer"
          style={styles}
          onClick={backToTop}
          aria-label="Back to Top"
        >
          <ArrowUp className="text-xl text-white" aria-hidden />
        </animated.button>
      ),
  )
}

export default BackToTop
