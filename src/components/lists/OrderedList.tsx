import React, { JSX } from 'react'
import ListProvider from './ListProvider'
import clsx from 'clsx'

const OrderedList: React.FC<JSX.IntrinsicElements['ol']> = props => {
  const { className, ...rest } = props

  return (
    <ListProvider type="ol">
      <ol className={clsx(className, 'mdx-ol')} {...rest} />
    </ListProvider>
  )
}

export default OrderedList
