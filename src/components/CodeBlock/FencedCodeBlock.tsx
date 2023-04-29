import React, { useMemo } from 'react'
import LiveProvider, { LiveProviderProps } from '@/components/playground/LiveProvider'
import Editor from './Editor'

// 静态围栏代码块高亮
const FencedCodeBlock: React.FC<{
  language: LiveProviderProps['language']
  code: string
  highlights?: string
  raw?: boolean
  lineNumbers?: boolean
}> = props => {
  const { language, code, highlights = '', raw, lineNumbers } = props

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
    <LiveProvider language={language} defaultCode={parsedCode}>
      <div className="relative mt-12 mb-8 -mx-0 sm:-mx-[1.5ch]">
        <div className="absolute right-8 top-px px-3 -translate-y-full rounded-tl-md rounded-tr-md bg-slate-100 text-slate-600 dark:bg-[#282a36] dark:text-slate-400 font-mono font-medium">
          {language.toUpperCase()}
        </div>
        <div className="max-h-[500px] sm:max-h-[700px] rounded-lg overflow-overlay better-scrollbar bg-slate-100 dark:bg-[#282a36]">
          <Editor
            lineNumbers={lineNumbers}
            disabled
            highlightLines={highlightLines}
            addedLines={addedLines}
            removedLines={removedLines}
            focusedLines={focusedLines}
            errorLines={errorLines}
            warningLines={warningLines}
          />
        </div>
      </div>
    </LiveProvider>
  )
}

export default FencedCodeBlock
