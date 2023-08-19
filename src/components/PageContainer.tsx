import React, { PropsWithChildren } from 'react'

const PageContainer: React.FC<PropsWithChildren> = props => {
  const { children } = props

  return (
    <div className="relative w-full min-h-[calc(100vh-50px)] sm:min-h-[calc(100vh-80px)]" id="router">
      {children}
    </div>
  )
}

export default PageContainer
