import React from 'react'
import { IconProps } from './types'

const Copy: React.FC<IconProps> = props => {
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
        d="M15.5122 5.19512C17.4519 5.19512 19.0244 6.76759 19.0244 8.70732V17.4878C19.0244 19.4275 17.4519 21 15.5122 21H8.48778C6.54805 21 4.97559 19.4275 4.97559 17.4878V8.70732C4.97559 6.76759 6.54805 5.19512 8.48778 5.19512M10.2439 7.39024H13.7561C14.7259 7.39024 15.5122 6.60401 15.5122 5.63415V4.7561C15.5122 3.78623 14.7259 3 13.7561 3H10.2439C9.27401 3 8.48778 3.78623 8.48778 4.7561V5.63415C8.48778 6.60401 9.27401 7.39024 10.2439 7.39024Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

export default Copy
