import React from 'react'
import HTMLPreview, { HTMLPreviewProps } from './previewers/HTMLPreview'
import ReactPreview, { ReactPreviewProps } from './previewers/ReactPreview'
import usePlaygroundContext from './usePlaygroundContext'

export type PreviewProps = HTMLPreviewProps & ReactPreviewProps

//  注意，该组件只支持 html 与 jsx
const Preview: React.FC<PreviewProps> = props => {
  const { language, setConsole } = usePlaygroundContext()

  const Preview = {
    html: HTMLPreview,
    jsx: ReactPreview,
  }[language as string]

  function onConsoleReady(console: Console) {
    // setConsole(console)
  }

  return Preview ? <Preview {...props} onConsoleReady={onConsoleReady} /> : null
}

export default Preview
