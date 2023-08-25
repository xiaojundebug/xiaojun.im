import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { animationFrameScheduler, fromEvent, startWith, throttleTime } from 'rxjs'
import { animated, useSpring } from '@react-spring/web'

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
    const sub = fromEvent(document, 'scroll')
      .pipe(throttleTime(0, animationFrameScheduler), startWith(null))
      .subscribe(evt => {
        const isAtBottom =
          window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 10
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

const TableOfContents: React.FC<TableOfContentsProps> = props => {
  const { headings } = props
  const listRef = useRef<HTMLUListElement>(null)
  const activeItemRef = useRef<HTMLLIElement>(null)
  const activeId = useScrollSpy(headings.map(({ id }) => id))

  const [{ scrollTop }, scrollApi] = useSpring(() => ({
    to: { scrollTop: 0 },
    config: { tension: 260, friction: 30 },
  }))

  useEffect(() => {
    const anchor = activeItemRef.current
    if (!listRef.current || !activeId || !anchor) return
    const listRect = listRef.current.getBoundingClientRect()
    const anchorRect = anchor.getBoundingClientRect()

    scrollApi.start({
      to: { scrollTop: anchor.offsetTop - (listRect.height - anchorRect.height) / 2 },
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
    <aside className="absolute left-full h-full ml-24">
      <animated.ul
        ref={listRef}
        className="group/toc sticky top-[10vh] list-none max-w-[250px] max-h-[50vh] overflow-auto better-scrollbar"
        scrollTop={scrollTop}
      >
        {headings.map(heading => {
          const activated = isActivated(heading)

          return (
            <animated.li key={heading.id} ref={activeId === heading.id ? activeItemRef : null}>
              <a
                href={`#${heading.id}`}
                className={clsx(
                  'group relative flex items-center gap-2 max-w-full my-1 text-xs text-zinc-500/80 leading-loose hover:text-zinc-800 dark:hover:text-zinc-50',
                  {
                    '!text-zinc-800 dark:!text-zinc-50': activated,
                  },
                )}
              >
                <div className="w-[20px]">
                  <div
                    className={clsx(
                      'h-[4px] rounded-full bg-black/10 dark:bg-white/10 group-hover:bg-black/50 dark:group-hover:bg-white/50 transition-all duration-500',
                      {
                        '!bg-black/50 dark:!bg-white/50': activated,
                      },
                    )}
                    style={{ width: heading.level > 2 ? 10 : 16 }}
                  ></div>
                </div>
                <span
                  className={clsx(
                    'opacity-0 group-hover/toc:opacity-100 transition-all duration-500 truncate',
                    {
                      'ml-2': heading.level !== 2,
                      'font-medium': heading.level === 2,
                      'opacity-100': activated,
                    },
                  )}
                >
                  {heading.text}
                </span>
              </a>
            </animated.li>
          )
        })}
      </animated.ul>
    </aside>
  )
}

export default TableOfContents
