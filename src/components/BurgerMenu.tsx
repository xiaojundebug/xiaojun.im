import React from 'react'
import { animated, useSpring } from '@react-spring/web'

export interface BurgerMenuProps {
  isOpen: boolean
  onChange: (isOpen: boolean) => void
}

const BurgerMenu: React.FC<BurgerMenuProps> = props => {
  const { isOpen, onChange } = props

  const line1 = useSpring({ x: 2, y: isOpen ? 11 : 5, rotate: isOpen ? 45 : 0 })
  const line2 = useSpring({ x: 2, y: isOpen ? 11 : 17, rotate: isOpen ? -45 : 0 })

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="fill-zinc-800 dark:fill-zinc-50 cursor-pointer"
      onClick={() => onChange(!isOpen)}
    >
      <animated.rect width="20" height="2" rx="1" style={{ ...line1, transformBox: 'fill-box', transformOrigin: 'center' }}  />
      <animated.rect width="20" height="2" rx="1" style={{ ...line2, transformBox: 'fill-box', transformOrigin: 'center' }} />
    </svg>
  )
}

export default BurgerMenu
