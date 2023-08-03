import React, { PropsWithChildren } from 'react'

const OnlyDesktop: React.FC<PropsWithChildren> = props => {
  return <div className="hidden sm:contents">{props.children}</div>
}

export default OnlyDesktop
