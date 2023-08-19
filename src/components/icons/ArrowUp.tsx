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
        d="M11.1314 3.35192C11.6154 2.88269 12.3846 2.88269 12.8686 3.35192L20.3951 10.6491C21.2 11.4294 20.6475 12.7928 19.5266 12.7928H16.3565C15.6674 12.7928 15.1088 13.3514 15.1088 14.0406V19.7522C15.1088 20.4413 14.5501 21 13.861 21H10.139C9.44989 21 8.89123 20.4413 8.89123 19.7522V14.0406C8.89123 13.3514 8.33258 12.7928 7.64344 12.7928H4.47344C3.35245 12.7928 2.80005 11.4294 3.60488 10.6491L11.1314 3.35192Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default ArrowUp
