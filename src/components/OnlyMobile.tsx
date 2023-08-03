import React, { PropsWithChildren } from 'react'

const OnlyMobile: React.FC<PropsWithChildren> = props => {
  return <div className="contents sm:hidden">{props.children}</div>
}

export default OnlyMobile
