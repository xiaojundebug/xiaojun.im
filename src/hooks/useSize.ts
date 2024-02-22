import { RefCallback, useCallback, useDeferredValue, useMemo, useState } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

type Size = { width: number; height: number }

function useSize() {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [size, setSize] = useState<Size>()
  const deferredSize = useDeferredValue(size)

  const measuredRef: RefCallback<HTMLElement> = useCallback(node => {
    setTarget(node)
  }, [])

  useIsomorphicLayoutEffect(() => {
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

  return useMemo(() => [measuredRef, deferredSize] as const, [measuredRef, deferredSize])
}

export default useSize
