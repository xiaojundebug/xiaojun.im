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
      aria-hidden
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.01416 2.91772C5.04766 2.91772 4.26416 3.70123 4.26416 4.66773V18.3177H5.76416V4.66773C5.76416 4.52965 5.87609 4.41772 6.01416 4.41772H17.4348V2.91772H6.01416ZM9.62267 21.4144V8.26753H19.0434V21.4144H9.62267ZM8.12267 7.76753C8.12267 7.21525 8.57039 6.76753 9.12267 6.76753H19.5434C20.0956 6.76753 20.5434 7.21525 20.5434 7.76753V21.9144C20.5434 22.4667 20.0956 22.9144 19.5434 22.9144H9.12267C8.57039 22.9144 8.12267 22.4667 8.12267 21.9144V7.76753Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Copy
