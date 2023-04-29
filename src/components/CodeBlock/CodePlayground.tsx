import React, { useMemo, useState } from 'react'
import LiveProvider, { LiveProviderProps } from '@/components/playground/LiveProvider'
import { scope as builtInScope } from './react-live-scope'
import LivePreview from '@/components/playground/LivePreview'
import Editor from './Editor'
import useForceUpdate from '@/hooks/useForceUpdate'
import ResetButton from '@/components/CodeBlock/ResetButton'
import RefreshButton from '@/components/CodeBlock/RefreshButton'
import LazyLoad from '@/components/LazyLoad'

const CodePlayground: React.FC<{
  code: string
  language: LiveProviderProps['language']
  scope: LiveProviderProps['scope']
  editor: boolean
  lineNumbers?: boolean
}> = props => {
  const { code: initialCode, language, scope, editor = true, lineNumbers } = props
  const [code, setCode] = useState(initialCode)
  const [forceUpdate, previewRefreshTrigger] = useForceUpdate()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const preview = useMemo(() => <LivePreview />, [previewRefreshTrigger])

  function resetCode() {
    setCode(initialCode)
  }

  function refreshPreview() {
    forceUpdate()
  }

  return (
    <LiveProvider
      language={language}
      code={code}
      onCodeChange={setCode}
      scope={{ ...builtInScope, ...scope }}
    >
      <div className="code-playground relative -mx-[1.5ch] border-2 border-gray-600/50 bg-zinc-900 rounded-none sm:rounded-xl overflow-hidden">
        <div className="flex items-center justify-between h-8 px-4 bg-gray-600/50">
          <span className="text-sm text-white">Code Playground</span>
          <div className="flex items-center gap-4">
            <ResetButton onClick={resetCode} />
          </div>
        </div>
        {/* 编辑器 */}
        {editor && (
          <div className="min-h-[200px] max-h-[400px] sm:max-h-[500px] text-white overflow-overlay better-scrollbar">
            <Editor fontSize={14} lineNumbers={lineNumbers} />
          </div>
        )}
        <div className="flex items-stretch justify-between h-10 px-3 border-t border-b border-gray-600/50 text-sm text-white">
          <button className="inline-flex items-center px-2 border-b border-yellow-400 cursor-pointer">
            Result
          </button>
          <div className="flex items-center gap-4 text-gray-400">
            <RefreshButton onClick={refreshPreview} />
          </div>
        </div>
        {/* 预览 */}
        <div className="p-3">
          {/* 避免 tailwindcss preflight 影响到 preview 组件 */}
          <div className="unreset">
            <LazyLoad className="!h-[360px] !rounded !bg-white !overflow-auto">{preview}</LazyLoad>
          </div>
        </div>
      </div>
    </LiveProvider>
  )
}

export default CodePlayground
