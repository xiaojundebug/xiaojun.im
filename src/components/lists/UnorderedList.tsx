import React from 'react'
import ListProvider from '@/components/lists/ListProvider'
import classNames from 'classnames'

const UnorderedList: React.FC<JSX.IntrinsicElements['ul']> = props => {
  const { className = '', ...rest } = props
  const isTaskList = className.includes('contains-task-list')

  return (
    <ListProvider type={isTaskList ? 'tl' : 'ul'}>
      <ul {...rest} className={classNames(className, 'my-6')} />
    </ListProvider>
  )
}

export default UnorderedList
