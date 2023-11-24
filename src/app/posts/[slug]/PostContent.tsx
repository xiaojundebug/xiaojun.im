'use client'

import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import components from './components-mapping'

export interface PostContentProps {
  code: string
}

const PostContent: React.FC<PostContentProps> = ({ code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code])

  return <Component components={components} />
}

export default PostContent
