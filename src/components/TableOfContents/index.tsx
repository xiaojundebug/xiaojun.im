import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { NativeProps, withNativeProps } from '@/utils/native-props'
import classNames from 'classnames'
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

export interface TableOfContentsProps extends NativeProps {
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

  return withNativeProps(
    props,
    <aside className={classNames(styles.tableOfContents, 'absolute left-full h-full ml-24')}>
      <animated.ul
        ref={listRef}
        className="sticky top-[10vh] list-none max-w-[250px] max-h-[50vh] overflow-overlay text-zinc-500"
        scrollTop={scrollTop}
      >
        {headings.map(heading => (
          <li
            key={heading.id}
            ref={activeId === heading.id ? activeItemRef : null}
            className={classNames('text-[13px] border-l-2 hover:text-primary transition-colors', {
              'text-primary border-primary': activeId === heading.id,
              'border-transparent': activeId !== heading.id,
            })}
            style={{ paddingLeft: `${heading.level - 2}em` }}
          >
            <a
              href={`#${heading.id}`}
              className="inline-block max-w-full my-1 px-6 tracking-wide truncate align-middle"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </animated.ul>
    </aside>,
  )
}

export default TableOfContents
