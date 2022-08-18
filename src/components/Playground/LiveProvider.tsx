import { useControllableValue } from 'ahooks'
import React, { createContext, PropsWithChildren } from 'react'
import Highlight from 'prism-react-renderer'

type Language = React.ComponentProps<typeof Highlight>['language']

export interface LiveProviderProps {
  code?: string
  defaultCode?: string
  language: Language
  // 目前仅在 language=jsx 时生效
  scope?: Record<string, any>
  onCodeChange?: (code: string) => void
}

export interface Context {
  code: string
  language: Language
  onCodeChange: (code: string) => void
  scope?: Record<string, any>
}

export const LiveContext = createContext<Context>({} as Context)

const LiveProvider: React.FC<PropsWithChildren<LiveProviderProps>> = props => {
  const { children, language, scope = {} } = props
  const [code, setCode] = useControllableValue(props, {
    defaultValue: '',
    defaultValuePropName: 'defaultCode',
    valuePropName: 'code',
    trigger: 'onCodeChange',
  })

  function onCodeChange(newCode: string) {
    setCode(newCode)
  }

  return (
    <LiveContext.Provider
      value={{
        code,
        language,
        onCodeChange,
        scope,
      }}
    >
      {children}
    </LiveContext.Provider>
  )
}

export default LiveProvider
