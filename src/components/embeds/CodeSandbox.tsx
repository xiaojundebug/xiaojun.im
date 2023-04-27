import React from 'react'
import LazyLoad from "@/components/LazyLoad";

export interface CodeSandboxProps {
  id?: string
  height?: string | number
}

export const CodeSandbox: React.FC<CodeSandboxProps> = props => {
  const { id, height = 500 } = props

  return (
    <LazyLoad className="relative w-full bg-zinc-500/10" style={{ height }}>
      <iframe
        className="absolute left-0 top-0 w-full h-full"
        src={`https://codesandbox.io/embed/${id}`}
        title={id}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        frameBorder="0"
      ></iframe>
    </LazyLoad>
  )
}
