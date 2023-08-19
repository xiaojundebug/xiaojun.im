import React from 'react'

export interface LinkCardProps {
  url: string
  title: string
  description: string
  image?: string
  icon?: string
}

const LinkCard: React.FC<LinkCardProps> = props => {
  const { url, title, description, image } = props

  return (
    <a
      className="flex items-center w-[500px] max-w-full min-h-[83px] p-2 my-12 mx-auto overflow-hidden rounded-xl border border-zinc-400/10 bg-zinc-300/10 hover:bg-zinc-400/10 transition-colors"
      href={url}
    >
      <div className="w-0 flex-1 px-3">
        <span className="block text-slate-500 dark:text-zinc-400 text-lg leading-tight	truncate">
          {title}
        </span>
        <span className="block mt-1 text-slate-400 dark:text-zinc-500 text-sm leading-tight	truncate">
          {description}
        </span>
      </div>
      {image && <img className="h-[65px] rounded" src={image} alt="og" />}
    </a>
  )
}

export default LinkCard
