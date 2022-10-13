import React from 'react'
import { GeneralObserver } from './GeneralObserver'

export interface StackBlitzProps {
  id?: string
  height?: string | number
}

export const StackBlitz: React.FC<StackBlitzProps> = props => {
  const { id, height = 500 } = props

  return (
    <GeneralObserver style={{ height }}>
      <iframe
        src={`https://stackblitz.com/edit/${id}?embed=1}`}
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
