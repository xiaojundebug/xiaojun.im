import React from 'react'
import { GeneralObserver } from './GeneralObserver'

export interface CodePenProps {
  id?: string
  height?: string | number
}

export const CodePen: React.FC<CodePenProps> = props => {
  const { id, height = 500 } = props

  return (
    <GeneralObserver style={{ height }}>
      <iframe
        src={`https://codepen.io/team/embed/${id}?default-tab=result&editable=true&theme-id=dark`}
        title={id}
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
