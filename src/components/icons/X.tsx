import React from 'react'
import { IconProps } from './types'

const X: React.FC<IconProps> = props => {
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
        d="M17.7263 3H20.7798L14.1085 10.6255L21.9572 21H15.812L10.9994 14.7071L5.49145 21H2.43628L9.57222 12.8435L2.04297 3.00083H8.34417L12.6946 8.75273L17.7263 3ZM16.6551 19.1729H18.3469L7.4248 4.73171H5.60928L16.6551 19.1729Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default X
