import React, { PropsWithChildren } from 'react'

const DarkModeOnly: React.FC<PropsWithChildren> = props => {
  return <div className="hidden dark:contents">{props.children}</div>
}

export default DarkModeOnly
