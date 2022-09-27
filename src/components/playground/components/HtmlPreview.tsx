import React, { useContext } from 'react'
import { NativeProps, withNativeProps } from '@/utils/native-props'
import { LiveContext } from '../LiveProvider'

export interface LiveEditorProps extends NativeProps {}

const HtmlPreview: React.FC<LiveEditorProps> = props => {
  const { code } = useContext(LiveContext)

  return code
    ? withNativeProps(
        props,
        <iframe
          srcDoc={code}
          style={{ width: '100%', height: '100%', verticalAlign: 'top', border: 'none' }}
          allowFullScreen
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        />,
      )
    : null
}

export default HtmlPreview
