import React, { useEffect, useRef, useState } from 'react'
import { NativeProps, withNativeProps } from '@/utils/native-props'
import classNames from 'classnames'

function useScrollSpy(ids: string[], options: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string>()
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    const elements = ids.map(id => document.getElementById(id))
    observer.current?.disconnect()
    observer.current = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id)
        }
      }
    }, options)
    for (const el of elements) {
      if (el) {
        observer.current?.observe(el)
      }
    }
    return () => observer.current?.disconnect()
  }, [ids, options])

  return activeId
}

export interface TableOfContentsProps extends NativeProps {
  headings: { id: string; text: string; level: number }[]
}

const TableOfContents: React.FC<TableOfContentsProps> = props => {
  const { headings } = props
  const activeId = useScrollSpy(
    headings.map(({ id }) => id),
    { rootMargin: '0px 0px 0px 0px', threshold: [1] },
  )

  return withNativeProps(
    props,
    <aside className="absolute left-full h-full ml-20">
      <ul className="sticky top-[150px] list-none max-w-[250px] max-h-[500px] overscroll-y-auto before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-zinc-400/30">
        {headings.map(heading => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${heading.level - 2}em` }}
            className={classNames(
              'text-[13px] text-neutral-500 border-l-2 border-transparent hover:text-zinc-800',
              {
                '!text-primary border-primary': activeId === heading.id,
              },
            )}
          >
            <a
              href={`#${heading.id}`}
              className="inline-block max-w-full my-1 px-6 tracking-wide truncate align-middle"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>,
  )
}

export default TableOfContents
