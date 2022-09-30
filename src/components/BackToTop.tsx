import React, { useEffect, useRef, useState } from 'react'
import { animated, useTransition } from 'react-spring'
import {
  animationFrameScheduler,
  distinctUntilChanged,
  fromEvent,
  map,
  startWith,
  throttleTime,
} from 'rxjs'

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
          className="fixed right-8 bottom-8 sm:right-16 sm:bottom-16 flex items-center justify-center w-10 h-10 rounded-full bg-primary hover:bg-primary/80 text-zinc-50 shadow cursor-pointer z-50"
          onClick={backToTop}
          style={styles}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.09591 0.674869C7.48378 0.298818 8.1002 0.298819 8.48807 0.67487L14.52 6.52301C15.165 7.14836 14.7223 8.24097 13.8239 8.24097H11.2834C10.7311 8.24097 10.2834 8.68868 10.2834 9.24097V13.8184C10.2834 14.3707 9.83572 14.8184 9.28343 14.8184H6.30055C5.74827 14.8184 5.30055 14.3707 5.30055 13.8184V11.5297V9.24097C5.30055 8.68868 4.85284 8.24097 4.30055 8.24097H1.76004C0.861652 8.24097 0.418948 7.14836 1.06395 6.52301L7.09591 0.674869Z" fill="white" />
          </svg>
        </animated.div>
      ),
  )
}

export default BackToTop
