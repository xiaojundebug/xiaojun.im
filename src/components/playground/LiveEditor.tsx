import React, { useContext } from 'react'
import styles from './LiveEditor.module.scss'
import { NativeProps, withNativeProps } from '@/utils/native-props'
import Highlight, { defaultProps, PrismTheme } from 'prism-react-renderer'
import Editor from 'react-simple-code-editor'
import { LiveContext } from './LiveProvider'
import classNames from "classnames";

export interface LiveEditorProps extends NativeProps {
  disabled?: boolean
  theme?: PrismTheme
  padding?: string | number
  highlights?: number[]
}

const LiveEditor: React.FC<LiveEditorProps> = props => {
  const { code, language, onCodeChange } = useContext(LiveContext)
  const { disabled, theme, padding = 15, highlights = [] } = props

  return withNativeProps(
    props,
    <div className={styles.liveEditor}>
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
                  <div
                    {...getLineProps({
                      line,
                      key: i,
                      className: classNames({ highlight: highlights.includes(i + 1) }),
                    })}
                  >
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
