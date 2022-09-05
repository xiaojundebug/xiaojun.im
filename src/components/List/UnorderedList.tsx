import React, { PropsWithChildren } from 'react'
import ListProvider from '@/components/List/ListProvider'

const UnorderedList: React.FC<PropsWithChildren> = props => {
  return (
    <ListProvider type="ul">
      <ul className="my-10">{props.children}</ul>
    </ListProvider>
  )
}

export default UnorderedList
