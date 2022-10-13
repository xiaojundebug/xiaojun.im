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
          className="fixed right-8 bottom-8 sm:right-16 sm:bottom-16 p-3 rounded-full bg-primary/80 hover:bg-primary text-zinc-50 shadow cursor-pointer z-50"
          onClick={backToTop}
          style={styles}
        >
          <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.77334 0.673254C7.15934 0.299019 7.77279 0.29902 8.15878 0.673255L14.1616 6.49315C14.8035 7.11548 14.3629 8.20282 13.4689 8.20282H10.9406C10.391 8.20282 9.94548 8.64837 9.94548 9.19799V13.7533C9.94548 14.3029 9.49992 14.7485 8.9503 14.7485H5.98183C5.43221 14.7485 4.98665 14.3029 4.98665 13.7533V9.19799C4.98665 8.64837 4.5411 8.20282 3.99148 8.20282H1.46324C0.569191 8.20282 0.128624 7.11548 0.770515 6.49315L6.77334 0.673254Z" fill="white" />
          </svg>
        </animated.div>
      ),
  )
}

export default BackToTop
