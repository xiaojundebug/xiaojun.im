import React, { useState } from 'react'
import { animated, config, useSpring } from '@react-spring/web'
import { Refresh } from '@/components/icons'

const RefreshButton: React.FC<{ onClick: () => void }> = props => {
  const { onClick } = props
  const [rotation, setRotation] = useState(0)

  const { rotate } = useSpring({
    to: { rotate: rotation },
    config: config.slow,
  })

  function handleClick() {
    onClick?.()
    setRotation(rotation + 180)
  }

  return (
    <animated.button
      className="cursor-pointer text-zinc-400 text-lg hover:text-zinc-300 transition-colors"
      style={{ rotate }}
      onClick={handleClick}
      aria-label="refresh"
    >
      <Refresh onClick={onClick} aria-hidden />
    </animated.button>
  )
}

export default RefreshButton
