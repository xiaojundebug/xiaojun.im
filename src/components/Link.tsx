import React, { JSX } from 'react'
import { ExternalLink } from './icons'
import clsx from 'clsx'

const Link: React.FC<JSX.IntrinsicElements['a']> = props => {
  const { className, href = '', children, ...rest } = props
  const isPlainAnchor = typeof children === 'string'

  if (!href.startsWith('http')) {
    return (
      <a className={clsx(className, 'mdx-a')} href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(className, 'group/a mdx-a')}
      {...rest}
    >
      {children}
      {isPlainAnchor && (
        <ExternalLink
          className="inline-block mx-0.5 text-[0.9em] -translate-y-px text-zinc-400 group-hover/a:text-current transition-colors"
          aria-hidden
        />
      )}
    </a>
  )
}

export default Link
