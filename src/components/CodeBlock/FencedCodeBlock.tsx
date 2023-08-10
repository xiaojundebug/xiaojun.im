import React, { useMemo } from 'react'
import Provider, { ProviderProps } from '@/components/playground/Provider'
import Editor from './Editor'
import clsx from 'clsx'

// 静态围栏代码块高亮
const FencedCodeBlock: React.FC<{
  language: ProviderProps['language']
  code: string
  highlights?: string
  raw?: boolean
  lineNumbers?: boolean
  filename?: string
}> = props => {
  const { language, code, highlights = '', raw, lineNumbers, filename } = props

  const highlightLines = useMemo(() => {
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
          const match = line.match(/^([\s\S]*?)\/\/ \[\!code (.*?)]/)

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

  return (
    <Provider language={language} defaultCode={parsedCode}>
      <div className="fenced-code-block relative mt-12 mb-8 -mx-0 sm:-mx-[1.5ch]">
        {/* language */}
        {!filename && (
          <div className="absolute right-8 px-3 -translate-y-full rounded-tl-md rounded-tr-md bg-slate-100 text-zinc-600 dark:bg-[#282a36] dark:text-zinc-400 font-mono font-medium">
            {language.toUpperCase()}
          </div>
        )}
        {/* filename */}
        {filename && (
          <div className="px-6 py-1.5 border-b border-slate-400/10 rounded-tl-lg rounded-tr-lg bg-slate-200 text-slate-500 dark:bg-zinc-700 dark:text-zinc-400 font-mono font-medium">
            {filename}
          </div>
        )}
        <div
          className={clsx(
            'max-h-[500px] sm:max-h-[700px] rounded-bl-lg rounded-br-lg overflow-auto better-scrollbar bg-slate-100 dark:bg-[#282a36]',
            {
              'rounded-tl-lg rounded-tr-lg': !filename,
            },
          )}
        >
          <Editor
            className="playground-editor"
            disabled
            lineNumbers={lineNumbers}
            highlightLines={highlightLines}
            addedLines={addedLines}
            removedLines={removedLines}
            focusedLines={focusedLines}
            errorLines={errorLines}
            warningLines={warningLines}
          />
        </div>
      </div>
    </Provider>
  )
}

export default FencedCodeBlock
