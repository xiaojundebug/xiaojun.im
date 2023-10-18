import React from 'react'
import usePlaygroundContext from '@/components/CodeBlock/playground/usePlaygroundContext'

export interface HTMLPreviewProps {
  onConsoleReady?: (console: Console) => void
}

const HTMLPreview: React.FC<HTMLPreviewProps> = props => {
  const { onConsoleReady } = props
  const { code } = usePlaygroundContext()

  function onLoad(ev: React.SyntheticEvent<HTMLIFrameElement, Event>) {
    const iframe = ev.target as HTMLIFrameElement
    const iframeConsole = (iframe.contentWindow as any).console as Console

    onConsoleReady?.(iframeConsole)
  }

  return code ? (
    <iframe
      srcDoc={code}
      style={{ width: '100%', height: '100%', verticalAlign: 'top', border: 'none' }}
      allowFullScreen
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      onLoad={onLoad}
    />
  ) : null
}

export default HTMLPreview
