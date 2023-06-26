import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'

const tagRenderer = (name: string) => {
  return (props => {
    const { children, className, ...rest } = props
    return React.createElement(
      name,
      { ...rest, className: clsx(`mdx-${name}`, className) },
      props.children,
    )
  }) as React.FC<PropsWithChildren<HTMLElement>>
}

export default tagRenderer
