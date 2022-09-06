import React, { PropsWithChildren, useContext, useMemo } from 'react'
import { HiArrowSmRight } from 'react-icons/hi'
import { ListContext } from '@/components/List/ListProvider'

const ListItem: React.FC<PropsWithChildren & { className?: string }> = props => {
  const { children } = props
  const { type } = useContext(ListContext)

  const childArr = useMemo(() => React.Children.map(children, child => child), [children])

  const marker = {
    ul: (
      <span className="flex pt-[4px] pr-4">
        <HiArrowSmRight className="text-xl -ml-1 mr-1 text-indigo-600" />
      </span>
    ),
    ol: null,
    tl: <span className="flex pt-[4.5px] pr-4">{childArr?.shift()}</span>,
  }[type]

  return (
    <li className="flex items-start mb-4">
      {marker}
      <div className="flex-1">{type !== 'tl' ? children : childArr?.slice(1)}</div>
    </li>
  )
}

export default ListItem
