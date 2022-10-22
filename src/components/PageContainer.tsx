import React, { PropsWithChildren } from 'react'

export interface PageContainerProps {}

const PageContainer: React.FC<PropsWithChildren<PageContainerProps>> = props => {
  const { children } = props

  return (
    <div className="w-full min-h-[calc(100vh-50px)] sm:min-h-[calc(100vh-80px)]" id="router">
      {children}
    </div>
  )
}

export default PageContainer
