import React, { CSSProperties, ReactElement, ReactNode, useEffect, useRef } from 'react'
import useBoolean from '@/hooks/useBoolean'

export interface LazyLoadProps {
  children: ReactElement
  className?: string
  style?: CSSProperties
  offset?: number
  height?: number
  placeholder?: ReactNode
}

const LazyLoad: React.FC<LazyLoadProps> = props => {
  const { children, className, style, offset = 100, height, placeholder } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, { setTrue }] = useBoolean(false)

  useEffect(() => {
    const dom = containerRef.current
    if (!dom) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTrue()
          }
        })
      },
      {
        rootMargin: `0px 0px ${offset}px 0px`,
      },
    )
    observer.observe(dom)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset])

  return (
    <div ref={containerRef} className={className} style={style}>
      {isVisible ? children : placeholder ?? <div style={{ height: height }} />}
    </div>
  )
}

export default LazyLoad
