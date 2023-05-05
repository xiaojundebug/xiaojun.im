import React, { useContext, useMemo, useState } from 'react'
import LiveProvider, { LiveContext, LiveProviderProps } from '@/components/playground/LiveProvider'
import { scope as builtInScope } from './react-live-scope'
import LivePreview from '@/components/playground/LivePreview'
import Editor from './Editor'
import useForceUpdate from '@/hooks/useForceUpdate'
import ResetButton from '@/components/CodeBlock/ResetButton'
import RefreshButton from '@/components/CodeBlock/RefreshButton'
import LazyLoad from '@/components/LazyLoad'
import classNames from 'classnames'
import LiveConsole from '@/components/playground/LiveConsole'
import ClearButton from '@/components/CodeBlock/ClearButton'

type TabType = 1 | 2

const tabs: { label: string; type: TabType }[] = [
  { label: 'Result', type: 1 },
  { label: 'Console', type: 2 },
]

// CodePlayground 还未被 Provider 包裹，所以不能直接在里边使用 LiveContext
const LogCleaner: React.FC = () => {
  const { setLogs } = useContext(LiveContext)
  return <ClearButton onClick={() => setLogs([])} />
}

const CodePlayground: React.FC<{
  code: string
  language: LiveProviderProps['language']
  scope?: LiveProviderProps['scope']
  editor?: boolean
  lineNumbers?: boolean
}> = props => {
  const { code: initialCode, language, scope = {}, editor = true, lineNumbers } = props
  const [code, setCode] = useState(initialCode)
  const [forceUpdate, previewRefreshTrigger] = useForceUpdate()
  const [tabType, setTabType] = useState<TabType>(1)

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
        <div className="flex justify-between h-10 px-3 border-t border-b border-gray-600/50 text-sm text-white">
          <div className="flex items-stretch h-full">
            {tabs.map(tab => (
              <button
                key={tab.type}
                className={classNames('inline-flex items-center px-2 border-b cursor-pointer', {
                  'border-yellow-400 text-white': tabType === tab.type,
                  'border-transparent text-white/50': tabType !== tab.type,
                })}
                onClick={() => setTabType(tab.type)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            {{
              1: () => <RefreshButton onClick={refreshPreview} />,
              2: () => <LogCleaner />,
            }[tabType]()}
          </div>
        </div>
        {/* 预览 */}
        {{
          1: () => (
            <>
              <div className="p-3">
                {/* 避免 tailwindcss preflight 影响到 preview 组件 */}
                <div className="unreset">
                  <LazyLoad className="!h-[360px] !rounded !bg-white !overflow-overlay !better-scrollbar">
                    {preview}
                  </LazyLoad>
                </div>
              </div>
            </>
          ),
          2: () => (
            <>
              <LazyLoad className="h-[360px] overflow-overlay better-scrollbar">
                <LiveConsole />
              </LazyLoad>
            </>
          ),
        }[tabType]()}
      </div>
    </LiveProvider>
  )
}

export default CodePlayground
