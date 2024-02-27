import React, { useEffect, useMemo } from 'react'
import Provider, { ProviderProps } from '@/components/CodeBlock/playground/Provider'
import Editor from './Editor'
import clsx from 'clsx'
import useBoolean from '@/hooks/useBoolean'
import { copyToClipboard } from '@/common/clipboard'
import CopyButton from './CopyButton'

export interface FencedCodeBlockProps {
  language: ProviderProps['language']
  code: string
  highlights?: string
  raw?: boolean
  lineNumbers?: boolean
  title?: string
}

// 静态围栏代码块高亮
const FencedCodeBlock: React.FC<FencedCodeBlockProps> = props => {
  const { language, code, highlights = '', raw, lineNumbers, title } = props
  const [copied, { set: setCopied }] = useBoolean(false)

  const highlightedLines = useMemo(() => {
    if (!highlights) return []
    return highlights.split(',').reduce<number[]>((acc, cur) => {
      const limits = cur.split('-')
      const rows = []
      if (limits.length === 1) {
        rows.push(parseInt(limits[0]))
      } else if (limits.length === 2) {
        const start = parseInt(limits[0])
        const end = parseInt(limits[1])
        for (let i = start; i <= end; i++) {
          rows.push(i)
        }
      }
      return acc.concat(rows)
    }, [])
  }, [highlights])

  const { parsedCode, addedLines, removedLines, focusedLines, errorLines, warningLines } =
    useMemo(() => {
      const lines = code.split('\n')
      let parsedCode = ''
      const addedLines: number[] = []
      const removedLines: number[] = []
      const focusedLines: number[] = []
      const errorLines: number[] = []
      const warningLines: number[] = []

      if (!raw) {
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          const match = line.match(/^([\s\S]*?)\/\/ \[!code (.*?)]/)

          if (match) {
            const codeLine = match[1]
            const mark = match[2]

            const fn = {
              '++': () => addedLines.push(i + 1),
              '--': () => removedLines.push(i + 1),
              focus: () => focusedLines.push(i + 1),
              error: () => errorLines.push(i + 1),
              warning: () => warningLines.push(i + 1),
            }[mark]

            if (fn) {
              fn()
            }

            parsedCode += codeLine + '\n'
          } else {
            parsedCode += line + '\n'
          }
        }
      }

      return {
        parsedCode: raw ? code : parsedCode.trim(),
        addedLines,
        removedLines,
        focusedLines,
        errorLines,
        warningLines,
      }
    }, [code, raw])

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1500)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copied])

  async function onCopy() {
    await copyToClipboard(parsedCode)
    setCopied(true)
  }

  return (
    <Provider language={language} defaultCode={parsedCode}>
      <div className="fenced-code-block relative mt-12 mb-8 prose-bleed">
        {/* language */}
        {!title && (
          <div className="absolute right-8 px-3 pt-0.5 -translate-y-full rounded-t-md bg-slate-100 dark:bg-zinc-900 text-slate-500 dark:text-zinc-400 font-mono font-medium">
            {language.toUpperCase()}
          </div>
        )}
        {/* title */}
        {title && (
          <div className="px-4 py-1.5 border-b border-slate-400/10 rounded-t-xl bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 font-mono font-medium">
            {title}
          </div>
        )}
        <div className="group/editor relative">
          {/* copy to clipboard */}
          <div className="absolute right-3 top-3 z-10 flex opacity-0 group-hover/editor:opacity-100 transition-opacity">
            <CopyButton copied={copied} onCopy={onCopy} />
          </div>
          <div
            className={clsx(
              'max-h-[500px] sm:max-h-[700px] rounded-b-xl bg-slate-100 dark:bg-zinc-900 overflow-auto better-scrollbar',
              {
                'rounded-t-xl': !title,
              },
            )}
          >
            <Editor
              className="playground-editor"
              disabled
              lineNumbers={lineNumbers}
              highlightedLines={highlightedLines}
              addedLines={addedLines}
              removedLines={removedLines}
              focusedLines={focusedLines}
              errorLines={errorLines}
              warningLines={warningLines}
            />
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default FencedCodeBlock
