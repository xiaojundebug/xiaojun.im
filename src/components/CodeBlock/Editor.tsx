import React from 'react'
import PlaygroundEditor, { EditorProps } from '@/components/CodeBlock/playground/Editor'

const Editor: React.FC<EditorProps> = props => {
  return <PlaygroundEditor {...props} />
}

export default Editor
