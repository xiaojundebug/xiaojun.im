import { MouseEvent, useMemo } from 'react'
import { useSpringValue } from '@react-spring/web'

function useSpotlight() {
  const x = useSpringValue(0)
  const y = useSpringValue(0)
  const r = useSpringValue(0)

  const movement = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const bounds = currentTarget.getBoundingClientRect()
    x.set(clientX - bounds.left)
    y.set(clientY - bounds.top)
    r.set(Math.sqrt(bounds.width ** 2 + bounds.height ** 2) / 2.5)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => [{ x, y, r }, movement] as const, [])
}

export default useSpotlight
