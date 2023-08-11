import React from 'react'
import { animated } from '@react-spring/web'
import useBoop from '@/hooks/useBoop'
import { Refresh } from '@/components/icons'

const RefreshButton: React.FC<{ onClick: () => void }> = props => {
  const { onClick } = props
  const [style, trigger] = useBoop({ scale: 1.1 })

  return (
    <animated.button
      className="cursor-pointer text-zinc-300 text-lg"
      style={style as any}
      onMouseEnter={trigger}
      onClick={onClick}
    >
      <Refresh onClick={onClick} />
    </animated.button>
  )
}

export default RefreshButton
