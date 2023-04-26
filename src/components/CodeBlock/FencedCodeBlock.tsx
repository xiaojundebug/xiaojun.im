import React, { useMemo } from 'react'
import LiveProvider, { LiveProviderProps } from '@/components/playground/LiveProvider'
import Editor from './Editor'

// 静态围栏代码块高亮
const FencedCodeBlock: React.FC<{
  language: LiveProviderProps['language']
  code: string
  highlights?: string
}> = props => {
  const { language, code, highlights = '' } = props

  const highlightRows = useMemo(() => {
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

  return (
    <LiveProvider language={language} defaultCode={code}>
      <div className="relative mt-12 mb-8 -mx-0 sm:-mx-6">
        <div className="absolute right-8 top-px px-3 -translate-y-full rounded-tl-md rounded-tr-md bg-slate-100 text-slate-600 dark:bg-[#282a36] dark:text-slate-400 font-mono font-medium">
          {language.toUpperCase()}
        </div>
        <div className="max-h-[500px] sm:max-h-[700px] rounded-lg overflow-overlay better-scrollbar bg-slate-100 dark:bg-[#282a36]">
          <Editor className="" disabled padding="2em" highlights={highlightRows} />
        </div>
      </div>
    </LiveProvider>
  )
}

export default FencedCodeBlock
