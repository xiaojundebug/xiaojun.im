import React from 'react'
import { ExternalLink } from '@/components/icons'
import NextLink from 'next/link'
import { withNativeProps } from '@/utils/native-props'

const Link: React.FC<JSX.IntrinsicElements['a']> = props => {
  const { className, href = '', children, ...rest } = props

  // if it's a relative link, use a fallback Link
  if (!href.startsWith('http')) {
    return (
      <NextLink href={href}>
        {withNativeProps(props, <a {...props} className="mdx-a"></a>)}
      </NextLink>
    )
  }

  return withNativeProps(
    props,
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      className="group/a mdx-a inline-flex place-items-baseline"
    >
      {children}
      {
        <ExternalLink
          className="inline-block mx-0.5 text-[0.9em] translate-y-0.5 text-zinc-400 group-hover/a:text-current transition-all"
          aria-hidden
        />
      }
    </a>,
  )
}

export default Link
