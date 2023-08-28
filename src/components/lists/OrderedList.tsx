import React, { JSX } from 'react'
import ListProvider from '@/components/lists/ListProvider'
import { withNativeProps } from '@/utils/native-props'

const OrderedList: React.FC<JSX.IntrinsicElements['ol']> = props => {
  return (
    <ListProvider type="ol">
      {withNativeProps(props, <ol {...props} className="mdx-ol" />)}
    </ListProvider>
  )
}

export default OrderedList
