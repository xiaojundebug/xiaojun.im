import { useCallback, useEffect, useState } from 'react'
import { useSpring } from '@react-spring/web'

// https://www.joshwcomeau.com/react/boop
function useBoop({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = {
    tension: 300,
    friction: 10,
  },
}) {
  const [isBooped, setIsBooped] = useState(false)

  const style = useSpring({
    backfaceVisibility: 'hidden',
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: springConfig,
  })

  useEffect(() => {
    if (!isBooped) return

    const timeoutId = setTimeout(() => {
      setIsBooped(false)
    }, timing)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBooped])

  const trigger = useCallback(() => {
    setIsBooped(true)
  }, [])

  return [style, trigger] as const
}

export default useBoop
