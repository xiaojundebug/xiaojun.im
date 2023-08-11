import React from 'react'
import { IconProps } from './types'

const Checkmark: React.FC<IconProps> = props => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M21.0049 6.91608L9.00488 18.9161L3.00488 12.9161"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

export default Checkmark
