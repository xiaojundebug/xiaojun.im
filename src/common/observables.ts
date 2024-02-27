import { animationFrameScheduler, EMPTY, fromEvent, share, throttleTime } from 'rxjs'

export const windowScroll$ =
  typeof window !== 'undefined'
    ? fromEvent(window, 'scroll', { passive: true }).pipe(
        throttleTime(0, animationFrameScheduler, { leading: true, trailing: true }),
        share(),
      )
    : EMPTY

export const visibilityChange$ =
  typeof window !== 'undefined' ? fromEvent(window, 'visibilitychange').pipe(share()) : EMPTY
