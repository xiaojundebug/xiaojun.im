'use client'

import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { animationFrameScheduler, fromEvent, startWith, throttleTime } from 'rxjs'
import { animated, useSpring } from '@react-spring/web'
import useBoolean from '@/hooks/useBoolean'
import { windowScroll$ } from '@/common/observables'

function findCurrentHeading(list: HTMLElement[]) {
  let start = 0
  let end = list.length - 1
  let result = 0

  while (start <= end) {
    let mid = Math.floor((start + end) / 2)
    if (list[mid].getBoundingClientRect().top <= 50) {
      result = mid
      start = mid + 1
    } else {
      end = mid - 1
    }
  }

  return list[result]
}

function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState<string>()

  useEffect(() => {
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean)
    const sub = windowScroll$.pipe(startWith(null)).subscribe(evt => {
      const isAtBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 10
      const el = isAtBottom
        ? elements[elements.length - 1]
        : findCurrentHeading(elements as HTMLElement[])
      setActiveId(el?.id)
    })
    return () => sub.unsubscribe()
  }, [ids])

  return activeId
}

export interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[]
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [isOverflowing, { set: setIsOverflowing }] = useBoolean(false)
  const [isScrolledTop, { set: setIsScrolledTop }] = useBoolean(true)
  const [isScrolledBottom, { set: setIsScrolledBottom }] = useBoolean(true)
  const activeItemRef = useRef<HTMLLIElement>(null)
  const activeId = useScrollSpy(headings.map(({ id }) => id))

  const [{ scrollTop }, scrollApi] = useSpring(() => ({
    scrollTop: 0,

    config: { tension: 260, friction: 30 },
  }))

  useEffect(() => {
    const scroller = scrollerRef.current
    const list = listRef.current

    if (!scroller || !list) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // intersectionRatio 不为 1 代表可以滚动
        setIsOverflowing(entry.intersectionRatio !== 1)
      },
      {
        root: scroller,
      },
    )

    observer.observe(list)

    const scrollSub = fromEvent(scroller, 'scroll')
      .pipe(throttleTime(0, animationFrameScheduler, { leading: true, trailing: true }))
      .subscribe(() => {
        setIsScrolledTop(scroller.scrollTop === 0)
        setIsScrolledBottom(scroller.scrollTop + scroller.offsetHeight === list.offsetHeight)
      })

    return () => {
      observer.disconnect()
      scrollSub.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const anchor = activeItemRef.current
    if (!scrollerRef.current || !activeId || !anchor) return
    const listRect = scrollerRef.current.getBoundingClientRect()
    const anchorRect = anchor.getBoundingClientRect()

    scrollApi.start({
      scrollTop: anchor.offsetTop - (listRect.height - anchorRect.height) / 2,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId])

  function isActivated(heading: { id: string; text: string; level: number }) {
    if (heading.id === activeId) return true

    let idx = headings.findIndex(h => h.id === activeId)
    const currentHeading = headings[idx]

    if (!currentHeading || currentHeading.level === 1) return false

    while (--idx >= 0) {
      const h = headings[idx]

      if (h.level > headings[idx + 1].level) return false
      if (h.level < headings[idx + 1].level && h.id === heading.id) return true
    }

    return false
  }

  return (
    <div className="group/toc relative">
      {/* Top Shadow */}
      <div
        className={clsx(
          'absolute inset-x-0 top-0 z-10 h-7 pointer-events-none',
          'bg-gradient-to-b from-white dark:from-zinc-950 to-transparent',
          `opacity-${isOverflowing && !isScrolledTop ? 100 : 0}`,
        )}
      ></div>
      {/* Bottom Shadow */}
      <div
        className={clsx(
          'absolute inset-x-0 bottom-0 z-10 h-7 pointer-events-none',
          'bg-gradient-to-t from-white dark:from-zinc-950 to-transparent',
          `opacity-${isOverflowing && !isScrolledBottom ? 100 : 0}`,
        )}
      ></div>

      <animated.div
        ref={scrollerRef}
        className="relative max-h-[308px] overflow-y-scroll no-scrollbar"
        scrollTop={scrollTop}
      >
        <ul ref={listRef} className="list-none overflow-y-hidden">
          {headings.map(heading => {
            const activated = isActivated(heading)

            return (
              <li key={heading.id} ref={activeId === heading.id ? activeItemRef : null}>
                <a
                  href={`#${heading.id}`}
                  className={clsx(
                    'group relative flex items-center gap-2 max-w-full h-7 text-[13px] font-medium truncate hover:text-zinc-800 dark:hover:text-zinc-50',
                    {
                      'text-zinc-400 dark:text-zinc-500': !activated,
                      'text-zinc-800 dark:text-zinc-50': activated,
                    },
                  )}
                >
                  <div className="w-[20px]">
                    <div
                      className={clsx(
                        'h-[4px] rounded-full group-hover:bg-black/50 dark:group-hover:bg-white/50',
                        {
                          'bg-zinc-400/20': !activated,
                          'bg-zinc-400': activated,
                        },
                      )}
                      style={{ width: heading.level > 2 ? 10 : 16 }}
                    ></div>
                  </div>
                  <span className={clsx('truncate', { 'ml-2': heading.level !== 2 })}>
                    {heading.text}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </animated.div>
    </div>
  )
}

export default TableOfContents
