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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0327 12.2324L9.20425 9.40396L7.79004 10.8182L12.0327 15.0608L22.6393 4.45421L21.2251 3.04L12.0327 12.2324Z"
        fill="currentColor"
      />
      <path
        d="M15.9343 6.20943C14.8131 5.44615 13.4586 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 11.4491 18.9364 10.913 18.816 10.3988L20.4146 8.80023C20.7929 9.79445 21 10.873 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.0118 3 15.8695 3.66011 17.3682 4.77556L15.9343 6.20943Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Checked
