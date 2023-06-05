import { useContext } from 'react'
import { PlaygroundContext } from '@/components/playground/Provider'

const usePlaygroundContext = () => {
  return useContext(PlaygroundContext)
}

export default usePlaygroundContext
