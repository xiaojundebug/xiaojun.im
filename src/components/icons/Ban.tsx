import React from 'react'
import { IconProps } from './types'

const Ban: React.FC<IconProps> = props => {
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
        d="M5.63605 18.3639C9.15083 21.8787 14.8492 21.8786 18.3639 18.3639C21.8786 14.8492 21.8787 9.15083 18.3639 5.63605C14.8492 2.12128 9.15075 2.12135 5.63605 5.63605C2.12135 9.15075 2.12128 14.8492 5.63605 18.3639ZM16.4153 17.6881C13.5907 19.8863 9.50507 19.6874 6.90884 17.0912C4.31261 14.4949 4.11374 10.4093 6.31191 7.5847L16.4153 17.6881ZM17.6881 16.4153C19.8863 13.5907 19.6874 9.50507 17.0912 6.90884C14.4949 4.31261 10.4093 4.11374 7.5847 6.31191L17.6881 16.4153Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Ban
