import React from 'react'
import { GeneralObserver } from './GeneralObserver'

export interface CodeSandboxProps {
  id?: string
  height?: string | number
}

export const CodeSandbox: React.FC<CodeSandboxProps> = props => {
  const { id, height = 500 } = props

  return (
    <GeneralObserver style={{ height }}>
      <iframe
        src={`https://codesandbox.io/embed/${id}`}
        title={id}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        frameBorder="0"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      ></iframe>
    </GeneralObserver>
  )
}
