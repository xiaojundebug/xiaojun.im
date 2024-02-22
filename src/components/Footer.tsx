import React from 'react'
import config from 'config'
import { Heart } from '@/components/icons'

const Footer = () => {
  return (
    <div className="flex items-center justify-center gap-1 my-16 text-sm font-medium text-zinc-500">
      Made with
      <Heart className="text-xl text-rose-600" />
      by
      <em className="font-bold not-italic">{config.name}</em>
    </div>
  )
}

export default Footer
