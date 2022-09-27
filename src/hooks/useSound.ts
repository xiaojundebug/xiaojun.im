import { useContext } from 'react'
import useSoundBase from 'use-sound'
import { ConfigContext } from '@/components/ConfigProvider'

type UseSoundParameters = Parameters<typeof useSoundBase>

function useSound(url: UseSoundParameters[0], delegated: UseSoundParameters[1] = {}) {
  const { soundEnabled } = useContext(ConfigContext)

  return useSoundBase(url, { soundEnabled, ...delegated })
}

export default useSound
