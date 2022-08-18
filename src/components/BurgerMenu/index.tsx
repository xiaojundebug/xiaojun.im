import React from 'react'
import { animated, useSpring } from 'react-spring'
import { NativeProps, withNativeProps } from '@/utils/native-props'

export interface BurgerMenuProps extends NativeProps {
  isOpen: boolean
  onChange: (isOpen: boolean) => void
}

const BurgerMenu: React.FC<BurgerMenuProps> = props => {
  const { isOpen, onChange } = props

  const first = useSpring({
    transform: isOpen
      ? 'translate(4.5px, 18.5px) rotate(-45deg)'
      : 'translate(2px, 4px) rotate(0deg)',
  })
  const second = useSpring({
    transform: isOpen
      ? 'translate(5.5px, 4.5px) rotate(45deg)'
      : 'translate(2px, 11px) rotate(0deg)',
  })
  const third = useSpring({
    transform: isOpen
      ? 'translate(4.5px, 18.5px) rotate(-45deg)'
      : 'translate(2px, 18px) rotate(0deg)',
  })

  return withNativeProps(
    props,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="fill-slate-800 dark:fill-slate-50"
      onClick={() => onChange(!isOpen)}
    >
      <animated.rect width="20" height="2" rx="1" style={first} />
      <animated.rect width="20" height="2" rx="1" style={second} />
      <animated.rect width="20" height="2" rx="1" style={third} />
    </svg>,
  )
}

export default BurgerMenu
