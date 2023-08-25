import { useEffect } from 'react'
import useLatest from '@/hooks/useLatest'

function useUnmount(fn: () => any) {
  const fnRef = useLatest(fn)

  useEffect(() => fnRef.current, [])
}

export default useUnmount
