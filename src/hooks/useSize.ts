import { RefCallback, useCallback, useDeferredValue, useEffect, useState } from 'react'

type Size = { width: number; height: number }

function useSize() {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [size, setSize] = useState<Size>()
  const deferredSize = useDeferredValue(size)

  const measuredRef: RefCallback<HTMLElement> = useCallback(node => {
    setTarget(node)
  }, [])

  useEffect(() => {
    if (!target) return

    const obs = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const { clientWidth, clientHeight } = entry.target
        setSize({ width: clientWidth, height: clientHeight })
      })
    })

    obs.observe(target)

    return () => {
      obs.disconnect()
    }
  }, [target])

  return [measuredRef, deferredSize] as const
}

export default useSize
