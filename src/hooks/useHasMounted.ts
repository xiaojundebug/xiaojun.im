import { useEffect } from 'react'
import useBoolean from './useBoolean'

// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
function useHasMounted() {
  const [hasMounted, { setTrue }] = useBoolean(false)

  useEffect(() => {
    setTrue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return hasMounted
}

export default useHasMounted
