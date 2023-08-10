import { useMemo, useState } from 'react'

interface Actions {
  set: (value: boolean) => void
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}

function useBoolean(defaultValue?: boolean) {
  const [value, setValue] = useState(!!defaultValue)

  const actions: Actions = useMemo(() => {
    const setTrue = () => setValue(true)
    const setFalse = () => setValue(false)
    const toggle = () => setValue(v => !v)
    return {
      set: v => setValue(v),
      setTrue,
      setFalse,
      toggle,
    }
  }, [])

  return [value, actions] as const
}

export default useBoolean
