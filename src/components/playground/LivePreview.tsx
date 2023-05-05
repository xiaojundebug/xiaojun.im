import React, { useContext } from 'react'
import { NativeProps } from '@/utils/native-props'
import HtmlPreview from './components/HtmlPreview'
import ReactPreview from './components/ReactPreview'
import { LiveContext } from './LiveProvider'

export interface LiveEditorProps extends NativeProps {}

//  注意，该组件只支持 html 与 jsx
const LivePreview: React.FC<LiveEditorProps> = props => {
  const { language, setLogs } = useContext(LiveContext)

  const Preview = {
    html: HtmlPreview,
    jsx: ReactPreview,
  }[language as string]

  return Preview ? (
    <Preview
      {...props}
      onConsole={(type, message) => {
        setLogs(logs => [...logs, { type, message }])
      }}
    />
  ) : null
}

export default LivePreview
