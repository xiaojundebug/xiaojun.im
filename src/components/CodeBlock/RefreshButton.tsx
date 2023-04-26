import React from 'react'
import { animated } from '@react-spring/web'
import { TbRefresh } from 'react-icons/tb'
import useBoop from '@/hooks/useBoop'

const RefreshButton: React.FC<{ onClick: () => void }> = props => {
  const { onClick } = props
  const [style, trigger] = useBoop({ scale: 1.1 })

  return (
    <animated.button
      className="cursor-pointer text-gray-300 text-lg"
      style={style as any}
      onMouseEnter={trigger}
      onClick={onClick}
    >
      <TbRefresh onClick={onClick} />
    </animated.button>
  )
}

export default RefreshButton
