import React from 'react'
import { IconProps } from './types'

const ArrowLeft: React.FC<IconProps> = props => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path d="M15.4514 7.08655L17.0198 5.51814" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11.2688 5.35406V3.136" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7.08643 7.08655L5.51801 5.51814" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5.354 11.2689H3.13593" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7.08643 15.4515L5.51801 17.0199" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11.5433 9.80959L20.0944 12.1009C21.347 12.4365 21.5265 14.1397 20.3714 14.7291L17.622 16.1318C16.9806 16.4591 16.4591 16.9806 16.1318 17.622L14.7291 20.3714C14.1397 21.5265 12.4365 21.347 12.1009 20.0944L9.80959 11.5433C9.52756 10.4907 10.4907 9.52756 11.5433 9.80959Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export default ArrowLeft
