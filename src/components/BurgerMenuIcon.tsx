import React from 'react'
import { animated, useSpring } from '@react-spring/web'

export interface BurgerMenuIconProps {
  isOpen: boolean
  onChange: (isOpen: boolean) => void
  size?: number
}

const BurgerMenuIcon: React.FC<BurgerMenuIconProps> = props => {
  const { isOpen, onChange, size = 30 } = props

  const svgProps = useSpring({
    rotate: isOpen ? -45 : 0,

    config: {
      tension: 150,
      friction: 25,
    },
  })

  const line1Props = useSpring({
    x1: isOpen ? size / 2 : size * 0.15,
    y1: isOpen ? size * 0.1 : size * 0.3,
    x2: isOpen ? size / 2 : size * 0.85,
    y2: isOpen ? size * 0.9 : size * 0.3,

    config: {
      tension: 150,
      friction: 22,
    },
  })
  const line2Props = useSpring({
    x1: isOpen ? size * 0.1 : size * 0.85,
    y1: isOpen ? size / 2 : size * 0.7,
    x2: isOpen ? size * 0.9 : size * 0.15,
    y2: isOpen ? size / 2 : size * 0.7,

    config: {
      tension: 110,
      friction: 22,
    },
  })

  return (
    <animated.svg
      className="overflow-visible origin-center"
      style={{
        width: size,
        height: size,
        ...svgProps,
      }}
      onClick={() => onChange(!isOpen)}
    >
      <animated.line {...line1Props} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <animated.line {...line2Props} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </animated.svg>
  )
}

export default BurgerMenuIcon
