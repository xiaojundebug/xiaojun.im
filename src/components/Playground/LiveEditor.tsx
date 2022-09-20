import React, { useContext } from 'react'
import style from './LiveEditor.module.scss'
import { NativeProps, withNativeProps } from '@/utils/native-props'
import Highlight, { defaultProps, PrismTheme } from 'prism-react-renderer'
import Editor from 'react-simple-code-editor'
import { LiveContext } from './LiveProvider'

export interface LiveEditorProps extends NativeProps {
  disabled?: boolean
  theme?: PrismTheme
  padding?: string | number
}

const LiveEditor: React.FC<LiveEditorProps> = props => {
  const { code, language, onCodeChange } = useContext(LiveContext)
  const { disabled, theme, padding = 15 } = props

  return withNativeProps(
    props,
    <div className={style.liveEditor}>
      <Editor
        value={code}
        onValueChange={onCodeChange}
        disabled={disabled}
        tabSize={2}
        padding={padding}
        style={{
          fontFamily: '"Fira Code", monospace',
          fontSize: 16,
          outline: 'none',
          // plain 中包含一些预设样式
          ...(theme?.plain || {}),
        }}
        highlight={code => (
          <Highlight {...defaultProps} theme={theme} code={code} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <>
                {tokens.map((line, i) => (
                  // eslint-disable-next-line react/jsx-key
                  <div {...getLineProps({ line, key: i })}>
                    {/* 行号 */}
                    {/* https://github.com/satya164/react-simple-code-editor/blob/809d5f042637918dc41524ab40ec1d1d581e335d/example/App.js */}
                    {/*<div*/}
                    {/*  style={{*/}
                    {/*    position: 'absolute',*/}
                    {/*    left: 0,*/}
                    {/*    width: 40,*/}
                    {/*    textAlign: 'right',*/}
                    {/*    userSelect: 'none',*/}
                    {/*    opacity: 0.5,*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  {i + 1}*/}
                    {/*</div>*/}
                    <>
                      {line.map((token, key) => (
                        // eslint-disable-next-line react/jsx-key
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </>
                  </div>
                ))}
              </>
            )}
          </Highlight>
        )}
      />
    </div>,
  )
}

export default LiveEditor
