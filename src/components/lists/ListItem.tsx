import React, { useContext, useMemo } from 'react'
import { ListContext } from '@/components/lists/ListProvider'
import clsx from 'clsx'
import { withNativeProps } from '@/utils/native-props'
import { ArrowRight, Checked, Unchecked } from '@/components/icons'

const ListItem: React.FC<JSX.IntrinsicElements['li']> = props => {
  const { children } = props
  const { type } = useContext(ListContext)

  const childArr = useMemo(() => React.Children.map(children, child => child), [children])

  const getMarker = {
    ul: () => (
      <span className="flex pt-[4px] pr-2">
        <ArrowRight className="text-xl -ml-1 mr-1 text-primary" />
      </span>
    ),
    // ol 的 marker 样式在 markdown.scss 中设置
    ol: () => null,
    tl: () => (
      <span className="flex pt-[5px] pr-2 mr-[2px]">
        {/* @ts-ignore */}
        {childArr[0].props.checked ? (
          <Checked className="text-lg text-primary" />
        ) : (
          <Unchecked className="text-lg text-primary" />
        )}
      </span>
    ),
  }[type]

  return withNativeProps(
    props,
    <li className={clsx('mdx-li flex items-start my-4')}>
      {getMarker()}
      <div className="flex-1">{type !== 'tl' ? children : childArr?.slice(2)}</div>
    </li>,
  )
}

export default ListItem
