import React from 'react'
import LiveProvider, { LiveProviderProps } from '@/components/Playground/LiveProvider'
import Editor from './Editor'

// 静态围栏代码块高亮
const FencedCodeBlock: React.FC<{
  language: LiveProviderProps['language']
  code: string
}> = props => {
  const { language, code } = props

  return (
    <LiveProvider language={language} defaultCode={code}>
      <div className="relative mt-12 mb-8">
        <div className="absolute right-8 top-px px-3 -translate-y-full rounded-tl-md rounded-tr-md bg-slate-100 text-slate-600 dark:bg-[#282a36] dark:text-slate-400 font-mono font-medium">
          {language}
        </div>
        <div className="rounded-lg isolate overflow-hidden bg-slate-100 dark:bg-[#282a36]">
          <Editor disabled padding="2em" />
        </div>
      </div>
    </LiveProvider>
  )
}

export default FencedCodeBlock
