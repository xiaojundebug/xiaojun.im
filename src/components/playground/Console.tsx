import React, { useEffect } from 'react'
import classNames from 'classnames'
import { Inspector } from 'react-inspector'
import theme from '@/components/playground/console-theme'
import { NativeProps } from '@/utils/native-props'
import usePlaygroundContext from '@/components/playground/usePlaygroundContext'
import { LogType } from '@/components/playground/Provider'

// TODO: 支持外界传入 theme
export interface ConsoleProps extends NativeProps {}

const Console: React.FC<ConsoleProps> = props => {
  const { logs, setLogs, console } = usePlaygroundContext()

  useEffect(() => {
    if (!console) return
    const nativeFns: any[] = []
    const methods: LogType[] = ['debug', 'log', 'info', 'warn', 'error']
    for (const method of methods) {
      const nativeFn = console[method]
      console[method] = (...args) => {
        nativeFn.apply(console, args)
        nativeFns.push(nativeFn)
        setTimeout(() => {
          setLogs(originLogs => [...originLogs, { message: args, type: method }])
        })
      }
    }
    return () => {
      for (let nativeFn of nativeFns) {
        // @ts-ignore
        console[nativeFn.name] = nativeFn
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [console])

  return (
    <div className="text-[13px] text-white">
      {logs.map((log, idx) => (
        <div
          key={idx}
          className={classNames(
            'relative flex items-start flex-wrap gap-x-2.5 px-4 py-0.5 border-y -mt-px border-zinc-700',
            {
              'bg-red-500/10 z-10': log.type === 'error',
              'bg-yellow-500/10 z-10': log.type === 'warn',
            },
          )}
        >
          {log.message.map((item, idx) => (
            // @ts-ignore
            <Inspector key={idx} data={item} theme={theme} table={false} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Console
