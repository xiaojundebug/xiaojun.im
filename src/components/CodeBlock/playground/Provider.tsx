import useControllableValue from '@/hooks/useControllableValue'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import Highlight from 'prism-react-renderer'

export type Language = React.ComponentProps<typeof Highlight>['language']
export type LogType = 'debug' | 'log' | 'info' | 'warn' | 'error'
export type Log = { message: any[]; type: LogType }

export interface ProviderProps {
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
  console?: Console
  setConsole: (console: Console) => void
}

export const PlaygroundContext = createContext({} as Context)

const Provider: React.FC<PropsWithChildren<ProviderProps>> = props => {
  const { children, language, scope = {} } = props
  const [code, setCode] = useControllableValue(props, {
    defaultValue: '',
    defaultValuePropName: 'defaultCode',
    valuePropName: 'code',
    trigger: 'onCodeChange',
  })
  const [logs, setLogs] = useState<Log[]>([
    // { message: [1, 'string', null, undefined, { a: 123, b: 456 }, new Date(), true], type: 'log' },
    { message: ['this is a warn message'], type: 'warn' },
    { message: ['this is an error message'], type: 'error' },
    { message: ['this is an error message'], type: 'error' },
  ])
  const [c, setC] = useState<Console>()

  useEffect(() => {
    setC(console)
  }, [])

  function onCodeChange(newCode: string) {
    setCode(newCode)
  }

  return (
    <PlaygroundContext.Provider
      value={{
        code,
        setCode,
        language,
        logs,
        setLogs,
        scope,
        console: c,
        setConsole: setC,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}

export default Provider
