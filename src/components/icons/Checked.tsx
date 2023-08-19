import React from 'react'
import { IconProps } from './types'

const Checked: React.FC<IconProps> = props => {
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
        d="M16.1891 5.18318C14.9707 4.43283 13.5359 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 11.7648 19.9898 11.5319 19.97 11.3019L21.7025 9.56929C21.8968 10.3474 22 11.1617 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C14.09 2 16.0303 2.64117 17.6348 3.73753L16.1891 5.18318Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 12.9079L8.46443 9.37236L7.05022 10.7866L12 15.7363L23.3137 4.42261L21.8995 3.0084L12 12.9079Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Checked
