import React, { PropsWithChildren } from 'react'
import ListProvider from '@/components/List/ListProvider'

const UnorderedList: React.FC<PropsWithChildren & { className?: string }> = props => {
  const { children, className = '' } = props
  const isTaskList = className.includes('contains-task-list')

  return (
    <ListProvider type={isTaskList ? 'tl' : 'ul'}>
      <ul className="my-10">{children}</ul>
    </ListProvider>
  )
}

export default UnorderedList
