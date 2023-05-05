import React, { useContext } from 'react'
import { LiveContext } from '@/components/playground/LiveProvider'
import classNames from 'classnames'
import { Inspector } from 'react-inspector'
import { theme } from '@/components/playground/console-theme'

const LiveConsole = () => {
  const { logs } = useContext(LiveContext)

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
            <Inspector key={idx} data={item} theme={theme} table={false}/>
          ))}
        </div>
      ))}
    </div>
  )
}

export default LiveConsole
