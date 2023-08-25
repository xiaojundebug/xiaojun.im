import React from 'react'
import LazyLoad from '@/components/LazyLoad'

export interface StackBlitzProps {
  id: string
  height?: string | number
}

const StackBlitz: React.FC<StackBlitzProps> = props => {
  const { id, height = 500 } = props

  return (
    <LazyLoad className="relative w-full bg-zinc-400/10" style={{ height }}>
      <iframe
        className="absolute left-0 top-0 w-full h-full"
        src={`https://stackblitz.com/edit/${id}?embed=1}`}
        allowFullScreen
      ></iframe>
    </LazyLoad>
  )
}

export default StackBlitz
