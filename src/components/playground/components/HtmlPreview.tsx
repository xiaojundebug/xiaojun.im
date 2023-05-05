import React, { useContext } from 'react'
import { NativeProps, withNativeProps } from '@/utils/native-props'
import {LiveContext, LogType} from '../LiveProvider'

export interface LiveEditorProps extends NativeProps {
  onConsole?: (type: LogType, message: any[]) => void
}

const HtmlPreview: React.FC<LiveEditorProps> = props => {
  const { onConsole } = props
  const { code } = useContext(LiveContext)

  function onLoad(ev: React.SyntheticEvent<HTMLIFrameElement, Event>) {
    const iframe = ev.target as HTMLIFrameElement
    const iframeConsole = (iframe.contentWindow as any).console as Console
    const consoleLog = iframeConsole.log
    const consoleWarn = iframeConsole.warn
    const consoleError = iframeConsole.error

    iframeConsole.log = (...args) => {
      onConsole?.('log', args)
      consoleLog.apply(console, args)
    }

    iframeConsole.warn = (...args) => {
      onConsole?.('warn', args)
      consoleWarn.apply(console, args)
    }

    iframeConsole.error = (...args) => {
      onConsole?.('error', args)
      consoleError.apply(console, args)
    }
  }

  return code
    ? withNativeProps(
        props,
        <iframe
          srcDoc={code}
          style={{ width: '100%', height: '100%', verticalAlign: 'top', border: 'none' }}
          allowFullScreen
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          onLoad={onLoad}
        />,
      )
    : null
}

export default HtmlPreview
