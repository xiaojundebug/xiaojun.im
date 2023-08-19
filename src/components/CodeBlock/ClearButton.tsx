import React from 'react'
import { Ban } from '@/components/icons'

const ClearButton: React.FC<{ onClick: () => void }> = props => {
  const { onClick } = props

  return (
    <button
      className="cursor-pointer text-zinc-400 text-lg hover:text-zinc-300 transition-colors"
      onClick={onClick}
      aria-label="refresh"
    >
      <Ban onClick={onClick} aria-hidden />
    </button>
  )
}

export default ClearButton
