import React, { useMemo, useState } from 'react'
import Provider, { ProviderProps } from '@/components/CodeBlock/playground/Provider'
import { scope as builtInScope } from './react-live-scope'
import Preview from '@/components/CodeBlock/playground/Preview'
import Editor from './Editor'
import useForceUpdate from '@/hooks/useForceUpdate'
import ResetButton from '@/components/CodeBlock/ResetButton'
import RefreshButton from '@/components/CodeBlock/RefreshButton'
import LazyLoad from '@/components/LazyLoad'
import clsx from 'clsx'
import Console from '@/components/CodeBlock/playground/Console'
import ClearButton from '@/components/CodeBlock/ClearButton'
import usePlaygroundContext from '@/components/CodeBlock/playground/usePlaygroundContext'

type TabType = 1 | 2

const tabs: { label: string; type: TabType }[] = [
  { label: 'Result', type: 1 },
  // 有 bug，先暂时隐藏
  // { label: 'Console', type: 2 },
]

// CodePlayground 还未被 Provider 包裹，所以不能直接在里边使用 PlaygroundContext
const LogCleaner = () => {
  const { setLogs } = usePlaygroundContext()
  return <ClearButton onClick={() => setLogs([])} />
}

export interface CodePlaygroundProps {
  code: string
  language: ProviderProps['language']
  scope?: ProviderProps['scope']
  editor?: boolean
  lineNumbers?: boolean
  title?: string
}

const CodePlayground: React.FC<CodePlaygroundProps> = props => {
  const { code: initialCode, language, scope = {}, editor = true, lineNumbers, title } = props
  const [code, setCode] = useState(initialCode)
  const [forceUpdate, previewRefreshTrigger] = useForceUpdate()
  const [tabType, setTabType] = useState<TabType>(1)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const preview = useMemo(() => <Preview />, [previewRefreshTrigger])

  function resetCode() {
    setCode(initialCode)
  }

  function refreshPreview() {
    forceUpdate()
  }

  return (
    <Provider
      language={language}
      code={code}
      onCodeChange={setCode}
      scope={{ ...builtInScope, ...scope }}
    >
      <div className="code-playground relative prose-bleed border-2 border-zinc-600/50 bg-zinc-900 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between h-8 px-4 bg-zinc-600/50">
          <span className="text-sm text-white">{title || 'Code Playground'}</span>
          <div className="flex items-center gap-4">
            <ResetButton onClick={resetCode} />
          </div>
        </div>
        {/* 编辑器 */}
        {editor && (
          <div className="min-h-[200px] max-h-[400px] sm:max-h-[500px] text-white overflow-auto better-scrollbar">
            <Editor className="playground-editor" fontSize={14} lineNumbers={lineNumbers} />
          </div>
        )}
        <div className="flex justify-between h-10 px-3 border-t border-b border-zinc-600/50 text-sm text-white">
          <div className="flex items-stretch h-full">
            {tabs.map(tab => (
              <button
                key={tab.type}
                className={clsx('inline-flex items-center px-2 border-b cursor-pointer', {
                  'border-yellow-400 text-white': tabType === tab.type,
                  'border-transparent text-white/50': tabType !== tab.type,
                })}
                onClick={() => setTabType(tab.type)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
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
                  <LazyLoad className="!h-[360px] !rounded !bg-white !overflow-auto !better-scrollbar">
                    {preview}
                  </LazyLoad>
                </div>
              </div>
            </>
          ),
          2: () => (
            <>
              <LazyLoad className="h-[360px] overflow-auto better-scrollbar">
                <Console />
              </LazyLoad>
            </>
          ),
        }[tabType]()}
      </div>
    </Provider>
  )
}

export default CodePlayground
