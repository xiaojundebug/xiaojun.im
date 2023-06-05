import React, { useEffect } from 'react'
import HtmlPreview, { HtmlPreviewProps } from '@/components/playground/previewers/HtmlPreview'
import ReactPreview, { ReactPreviewProps } from '@/components/playground/previewers/ReactPreview'
import usePlaygroundContext from '@/components/playground/usePlaygroundContext'
import { LogType } from '@/components/playground/Provider'

export type PreviewProps = HtmlPreviewProps & ReactPreviewProps

//  注意，该组件只支持 html 与 jsx
const Preview: React.FC<PreviewProps> = props => {
  const { language, setConsole } = usePlaygroundContext()

  const Preview = {
    html: HtmlPreview,
    jsx: ReactPreview,
  }[language as string]

  function onConsoleReady(console: Console) {
    // setConsole(console)
  }

  return Preview ? <Preview {...props} onConsoleReady={onConsoleReady} /> : null
}

export default Preview
