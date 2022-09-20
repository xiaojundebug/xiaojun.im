import { useEffect, useState } from 'react'

// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

export default useHasMounted
