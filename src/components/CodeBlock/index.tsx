import React from 'react'
import { scope as builtInScope } from './react-live-scope'
import { Language } from 'prism-react-renderer'
import FencedCodeBlock from '@/components/CodeBlock/FencedCodeBlock'
import CodePlayground from '@/components/CodeBlock/CodePlayground'
import config from 'config'

export interface CodeBlockProps {
  className?: string
  children?: string
  live?: boolean
  editor?: boolean
  height?: number
  scope?: Record<string, any>
  highlights?: string
  raw?: boolean
  lineNumbers?: boolean
  title?: string
}

const CodeBlock: React.FC<CodeBlockProps> = props => {
  const {
    children,
    className,
    live,
    editor = true,
    scope = {},
    highlights,
    raw,
    lineNumbers = config.markdown.lineNumbers,
    title,
  } = props
  const language = className?.replace(/language-/, '') as Language

  if (!children) return null

  // 没有语言并且内容结尾不是换行，则表明它是 `code` 写法，而不是代码块
  if (!language && !children.endsWith('\n')) {
    return <code className="mdx-code">{children}</code>
  }

  if (!live)
    return (
      <FencedCodeBlock
        language={language}
        code={children.trim()}
        highlights={highlights}
        raw={raw}
        lineNumbers={lineNumbers}
        title={title}
      />
    )

  return (
    <CodePlayground
      code={children.trim()}
      language={language}
      scope={{ ...builtInScope, ...scope }}
      editor={editor}
      lineNumbers={lineNumbers}
      title={title}
    />
  )
}

export default CodeBlock
