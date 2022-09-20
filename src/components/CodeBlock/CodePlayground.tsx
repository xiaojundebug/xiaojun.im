import React from 'react'
import LiveProvider, { LiveProviderProps } from '@/components/Playground/LiveProvider'
import classNames from 'classnames'
import style from './CodePlayground.module.scss'
import { scope as builtInScope } from './react-live-scope'
import LazyLoad from 'react-lazyload'
import LivePreview from '@/components/Playground/LivePreview'
import Editor from './Editor'

const CodePlayground: React.FC<{
  code: string
  language: LiveProviderProps['language']
  scope: LiveProviderProps['scope']
  editor: boolean
}> = props => {
  const { code, language, scope, editor = true } = props

  return (
    <div className="code-playground relative mt-12 mb-8 border border-2 border-slate-500">
      <div className={classNames(style.codeBlock, 'max-h-[300px] sm:max-h-[500px]')}>
        <LiveProvider language={language} defaultCode={code} scope={{ ...builtInScope, ...scope }}>
          {/* 编辑器 */}
          {editor && (
            <div className={classNames(style.editorWrap)}>
              <div className={style.editorBody} style={{ background: '#282a36' }}>
                <Editor className={style.editor} />
              </div>
            </div>
          )}
          {/* 预览 */}
          <LazyLoad className={style.previewWrap}>
            {/* 避免 tailwindcss preflight 影响到 preview 组件 */}
            <div className={classNames(style.previewBody, 'unreset')}>
              <LivePreview />
            </div>
          </LazyLoad>
        </LiveProvider>
      </div>
    </div>
  )
}

export default CodePlayground
