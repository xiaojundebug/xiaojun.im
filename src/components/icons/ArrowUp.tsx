import React from 'react'
import { IconProps } from './types'

const ArrowUp: React.FC<IconProps> = props => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9998 2.99994L21 11.9999L19.5382 13.4617L13.0335 6.95711V21H10.9662V6.95718L4.4618 13.4617L3 11.9999L11.9998 2.99994Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default ArrowUp
