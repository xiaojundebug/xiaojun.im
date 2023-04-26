import React, { CSSProperties, ReactElement, ReactNode, useEffect, useRef, useState } from 'react'

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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dom = containerRef.current
    if (!dom) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true)
          }
        })
      },
      {
        rootMargin: `0px 0px ${offset}px 0px`,
      },
    )
    observer.observe(dom)
    return () => observer.disconnect()
  }, [offset])

  return (
    <div ref={containerRef} className={className} style={style}>
      {visible ? children : placeholder ?? <div style={{ height: height }} />}
    </div>
  )
}

export default LazyLoad
