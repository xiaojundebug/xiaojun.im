import React from 'react'
import { ExternalLink } from '@/components/icons'
import Link from 'next/link'
import { withNativeProps } from '@/utils/native-props'

const LinkRenderer: React.FC<JSX.IntrinsicElements['a']> = props => {
  const { className, href = '', children, ...rest } = props

  // if it's a relative link, use a fallback Link
  if (!href.startsWith('http')) {
    return <Link href={href}>{withNativeProps(props, <a {...props} className="mdx-a"></a>)}</Link>
  }

  return withNativeProps(
    props,
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      className="group/a mdx-a inline-flex gap-0.5 place-items-baseline"
    >
      {children}
      {
        <ExternalLink
          className="inline-block translate-y-[0.14rem] text-zinc-400/60 group-hover/a:text-current transition-all"
          aria-hidden
        />
      }
    </a>,
  )
}

export default LinkRenderer
