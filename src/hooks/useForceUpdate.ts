import { useCallback, useState } from 'react'

function useForceUpdate() {
  const [value, setValue] = useState({})

  const update = useCallback(() => {
    setValue({})
  }, [])

  return [update, value] as const
}

export default useForceUpdate
