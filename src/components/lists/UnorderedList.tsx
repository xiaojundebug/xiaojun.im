import React, { JSX } from 'react'
import ListProvider from './ListProvider'
import clsx from 'clsx'

const UnorderedList: React.FC<JSX.IntrinsicElements['ul']> = props => {
  const { className = '', ...rest } = props
  const isTaskList = className.includes('contains-task-list')

  return (
    <ListProvider type={isTaskList ? 'tl' : 'ul'}>
      <ul className={clsx(className, 'mdx-ul')} {...rest} />
    </ListProvider>
  )
}

export default UnorderedList
