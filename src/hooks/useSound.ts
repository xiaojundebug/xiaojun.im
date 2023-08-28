import { useContext } from 'react'
// @ts-ignore
import useSoundBase from 'use-sound'
// @ts-ignore
import { HookOptions } from 'use-sound/dist/types'
import { ConfigContext } from '@/components/ConfigProvider'

function useSound<T = any>(url: string | string[], delegated?: HookOptions<T>) {
  const { soundEnabled } = useContext(ConfigContext)

  return useSoundBase(url, { soundEnabled, ...delegated })
}

export default useSound
