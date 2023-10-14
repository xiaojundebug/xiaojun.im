import React, { JSX } from 'react'
import { ExternalLink } from '@/components/icons'
import NextLink from 'next/link'
import { withNativeProps } from '@/utils/native-props'
import clsx from 'clsx'

const Link: React.FC<JSX.IntrinsicElements['a']> = props => {
  const { className, href = '', children, ...rest } = props
  const isPlainAnchor = typeof children === 'string'

  // if it's a relative link, use a fallback Link
  if (!href.startsWith('http')) {
    // @ts-ignore
    return withNativeProps(props, <NextLink {...props} className="mdx-a" href={href}></NextLink>)
  }

  return withNativeProps(
    props,
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      className={clsx('group/a mdx-a')}
    >
      {children}
      {isPlainAnchor && (
        <ExternalLink
          className="inline-block mx-0.5 text-[0.9em] -translate-y-px text-zinc-400 group-hover/a:text-current transition-colors"
          aria-hidden
        />
      )}
    </a>,
  )
}

export default Link
