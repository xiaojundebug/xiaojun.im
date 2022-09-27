import React from 'react'
import LiveEditor, { LiveEditorProps } from '@/components/playground/LiveEditor'

const Editor: React.FC<LiveEditorProps> = props => {
  return <LiveEditor {...props} />
}

export default Editor
