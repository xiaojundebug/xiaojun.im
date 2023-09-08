import React from 'react'
import { Ban } from '@/components/icons'

export interface ClearButtonProps {
  onClick: () => void
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
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
