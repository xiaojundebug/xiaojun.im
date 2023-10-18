import { useCallback, useEffect } from 'react'
import { useSpring } from '@react-spring/web'
import useBoolean from './useBoolean'

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
  const [isBooped, { setTrue, setFalse }] = useBoolean(false)

  const styles = useSpring({
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
      setFalse()
    }, timing)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBooped])

  const trigger = useCallback(() => {
    setTrue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [styles, trigger] as const
}

export default useBoop
