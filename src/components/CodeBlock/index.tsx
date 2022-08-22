import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { scope as builtInScope } from './react-live-scope'
import LazyLoad from 'react-lazyload'
import LiveProvider from '../Playground/LiveProvider'
import LiveEditor from '../Playground/LiveEditor'
import LivePreview from '../Playground/LivePreview'
import { copyToClipboard } from '@/utils/clipboard'
import { NativeProps } from '@/utils/native-props'
import { Language } from 'prism-react-renderer'
import themeOceanicNext from 'prism-react-renderer/themes/oceanicNext'
import themeGithub from 'prism-react-renderer/themes/github'
import classNames from 'classnames'
import { useSafeState } from 'ahooks'
import { HiCheck, HiOutlineClipboard } from 'react-icons/hi'
import { useTheme } from 'next-themes'

export interface CodeBlockProps extends NativeProps {
  children?: string
  live?: boolean
  editor?: boolean
  height?: number
  scope?: Record<string, any>
}

const CodeBlock: React.FC<CodeBlockProps> = props => {
  const { children, className, live, editor = true, height, scope = {} } = props
  const language = className?.replace(/language-/, '') as Language
  const [code, setCode] = useState(children || '')
  const [copied, setCopied] = useSafeState(false)
  const { resolvedTheme } = useTheme()
  const theme = live ? themeOceanicNext : resolvedTheme === 'dark' ? themeOceanicNext : themeGithub

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copied])

  if (!children) return null
  if (!language) return <code>{children}</code>

  return (
    <div className={classNames('relative my-6 border border-slate-200 dark:border-slate-700')}>
      {/*{!live && (*/}
      {/*  <div className="absolute z-1 -top-6 right-0 flex items-center justify-between rounded-tl rounded-tr text-sm px-2 h-6 bg-slate-300 text-zinc-50 dark:bg-slate-300 dark:text-zinc-800">*/}
      {/*    <span className="font-mono">{language}</span>*/}
      {/*    {copied ? (*/}
      {/*      <HiCheck type="icon-check" style={{ color: '#2FCC4E' }} />*/}
      {/*    ) : (*/}
      {/*      <HiOutlineClipboard*/}
      {/*        type="icon-clipboard"*/}
      {/*        onClick={async () => {*/}
      {/*          try {*/}
      {/*            await copyToClipboard(code)*/}
      {/*            setCopied(true)*/}
      {/*          } catch (e) {}*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*)}*/}
      <div className={classNames(style.codeBlock, 'relative')}>
        <LiveProvider
          language={language}
          defaultCode={children?.trim()}
          scope={{ ...builtInScope, ...scope }}
          onCodeChange={setCode}
        >
          {/* 编辑器 */}
          {editor && (
            <div className={style.editorWrap}>
              <div
                className={classNames(style.editorBody, {
                  [`h-[${height}]`]: height,
                  'max-h-[300px] sm:max-h-[500px]': !height,
                  'border-b border-slate-200 dark:border-slate-700': live,
                })}
                style={{ background: theme.plain.backgroundColor }}
              >
                <LiveEditor className={style.editor} disabled={!live} theme={theme} />
              </div>
            </div>
          )}
          {/* 预览 */}
          {live && (
            //  懒加载，窗口滚动到这里后才真正渲染 children
            <LazyLoad className={style.previewWrap}>
              {/*<div className={style.previewHeader}>*/}
              {/*  <div className={style.previewActions} />*/}
              {/*</div>*/}
              {/* 避免 tailwindcss preflight 影响到 preview 组件 */}
              <div className={classNames(style.previewBody, 'unreset')}>
                <LivePreview />
              </div>
            </LazyLoad>
          )}
        </LiveProvider>
      </div>
    </div>
  )
}

export default CodeBlock
