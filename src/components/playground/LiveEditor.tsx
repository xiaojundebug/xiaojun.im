import React, { useContext } from 'react'
import styles from './LiveEditor.module.scss'
import { NativeProps, withNativeProps } from '@/utils/native-props'
import Highlight, { defaultProps, PrismTheme } from 'prism-react-renderer'
import Editor from 'react-simple-code-editor'
import { LiveContext } from './LiveProvider'
import classNames from 'classnames'

export interface LiveEditorProps extends NativeProps {
  fontSize?: number
  disabled?: boolean
  theme?: PrismTheme
  highlightLines?: number[]
  addedLines?: number[]
  removedLines?: number[]
  focusedLines?: number[]
  errorLines?: number[]
  warningLines?: number[]
  lineNumbers?: boolean
}

const LiveEditor: React.FC<LiveEditorProps> = props => {
  const { code, language, onCodeChange } = useContext(LiveContext)
  const {
    fontSize = 16,
    disabled,
    theme,
    highlightLines = [],
    addedLines = [],
    removedLines = [],
    focusedLines = [],
    errorLines = [],
    warningLines = [],
    lineNumbers,
  } = props

  return withNativeProps(
    props,
    <div className={styles.liveEditor}>
      <Editor
        className={classNames('code-block', {
          'has-focused-lines': focusedLines.length > 0,
          'has-line-numbers': lineNumbers,
        })}
        value={code}
        onValueChange={onCodeChange}
        disabled={disabled}
        tabSize={2}
        padding={{ top: '2em', right: '2em', bottom: '2em', left: lineNumbers ? '5em' : '2em' }}
        style={{
          fontFamily: '"Fira Code", monospace',
          fontSize,
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
                      className: classNames({
                        highlight: highlightLines.includes(i + 1),
                        added: addedLines.includes(i + 1),
                        removed: removedLines.includes(i + 1),
                        focused: focusedLines.includes(i + 1),
                        error: errorLines.includes(i + 1),
                        warning: warningLines.includes(i + 1),
                      }),
                    })}
                  >
                    <>
                      {lineNumbers && (
                        <span
                          className="line-number"
                          style={{
                            display: 'inline-block',
                            width: '3em',
                            marginLeft: '-3em',
                          }}
                        >
                          {i + 1}
                        </span>
                      )}
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
