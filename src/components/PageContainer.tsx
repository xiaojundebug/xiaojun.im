import React, { PropsWithChildren } from 'react'

export interface PageContainerProps {}

const PageContainer: React.FC<PropsWithChildren<PageContainerProps>> = props => {
  const { children } = props

  return (
    <div className="w-full min-h-screen" id="router">
      {children}
    </div>
  )
}

export default PageContainer
