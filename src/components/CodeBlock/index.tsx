import React from 'react'
import { scope as builtInScope } from './react-live-scope'
import { NativeProps } from '@/utils/native-props'
import { Language } from 'prism-react-renderer'
import FencedCodeBlock from '@/components/CodeBlock/FencedCodeBlock'
import CodePlayground from '@/components/CodeBlock/CodePlayground'

export interface CodeBlockProps extends NativeProps {
  children?: string
  live?: boolean
  editor?: boolean
  height?: number
  scope?: Record<string, any>
}

const CodeBlock: React.FC<CodeBlockProps> = props => {
  const { children, className, live, editor = true, scope = {} } = props
  const language = className?.replace(/language-/, '') as Language

  if (!children) return null
  if (!language) return <code>{children}</code>
  if (!live) return <FencedCodeBlock language={language} code={children.trim()} />

  return (
    <CodePlayground
      code={children.trim()}
      language={language}
      scope={{ ...builtInScope, ...scope }}
      editor={editor}
    />
  )
}

export default CodeBlock
