import React from 'react'
import { IconProps } from './types'

const Juejin: React.FC<IconProps> = props => {
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
        d="M12 14.316L19.454 8.436L17.432 6.811L12 11.1L11.996 11.103L6.564 6.815L4.544 8.439L11.996 14.319L12 14.316ZM12 7.069L14.89 4.771L12 2.453L11.996 2.448L9.112 4.766L11.996 7.066L12 7.069ZM12 18.335L11.995 18.337L2.02 10.467L0 12.088L0.194 12.244L11.997 21.552L24 12.085L21.977 10.461L12 18.335Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Juejin
