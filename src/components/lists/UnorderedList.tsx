import React, { JSX } from 'react'
import ListProvider from '@/components/lists/ListProvider'
import { withNativeProps } from '@/utils/native-props'

const UnorderedList: React.FC<JSX.IntrinsicElements['ul']> = props => {
  const { className = '' } = props
  const isTaskList = className.includes('contains-task-list')

  return (
    <ListProvider type={isTaskList ? 'tl' : 'ul'}>
      {withNativeProps(props, <ul {...props} className="mdx-ul" />)}
    </ListProvider>
  )
}

export default UnorderedList
