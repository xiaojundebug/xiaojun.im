import { useControllableValue } from 'ahooks'
import React, { createContext, PropsWithChildren, useState } from 'react'
import Highlight from 'prism-react-renderer'

export type Language = React.ComponentProps<typeof Highlight>['language']
export type LogType = 'log' | 'warn' | 'error'
export type Log = { message: any[]; type: LogType }

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
  setCode: (code: React.SetStateAction<string>, ...args: any[]) => void
  language: Language
  logs: Log[]
  setLogs: React.Dispatch<React.SetStateAction<Log[]>>
  scope: Record<string, any>
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
  const [logs, setLogs] = useState<Log[]>([])

  function onCodeChange(newCode: string) {
    setCode(newCode)
  }

  return (
    <LiveContext.Provider
      value={{
        code,
        setCode,
        language,
        logs,
        setLogs,
        scope,
      }}
    >
      {children}
    </LiveContext.Provider>
  )
}

export default LiveProvider
