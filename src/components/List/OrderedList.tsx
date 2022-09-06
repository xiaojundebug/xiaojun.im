import React, { PropsWithChildren } from 'react'
import ListProvider from '@/components/List/ListProvider'

const OrderedList: React.FC<PropsWithChildren> = props => {
  return (
    <ListProvider type="ol">
      <ol className="my-6">{props.children}</ol>
    </ListProvider>
  )
}

export default OrderedList
