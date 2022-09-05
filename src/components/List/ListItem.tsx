import React, { PropsWithChildren, useContext } from 'react'
import { RiArrowRightLine } from 'react-icons/ri'
import { ListContext } from '@/components/List/ListProvider'

const ListItem: React.FC<PropsWithChildren> = props => {
  const { type } = useContext(ListContext)

  const marker = {
    ul: (
      <span className="flex pt-1 pr-4">
        <RiArrowRightLine className="text-xl text-indigo-600" />
      </span>
    ),
    ol: null,
  }[type]

  return (
    <li className="flex items-start mb-4">
      {marker}
      <div className="flex-1">{props.children}</div>
    </li>
  )
}

export default ListItem
