import React from 'react'
import { animated, to } from '@react-spring/web'
import useSpotlight from '@/hooks/useSpotlight'
import DarkModeOnly from './DarkModeOnly'

export interface LinkCardProps {
  url: string
  title: string
  description: string
  image?: string
  icon?: string
}

const LinkCard: React.FC<LinkCardProps> = props => {
  const { url, title, description, image } = props
  const [{ x: spotX, y: spotY, r: spotR }, onMouseMove] = useSpotlight()

  return (
    <a
      className="group block relative w-[460px] max-w-full min-h-[83px] my-12 mx-auto rounded-xl bg-zinc-400/20 overflow-hidden"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMouseMove}
    >
      {/* Border shimmer layer */}
      <DarkModeOnly>
        <animated.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white/10 pointer-events-none"
          style={{
            background: to(
              [spotX, spotY, spotR],
              (x, y, r) =>
                `radial-gradient(${r}px circle at ${x}px ${y}px, currentColor, transparent)`,
            ),
          }}
        ></animated.div>
      </DarkModeOnly>
      {/* Spotlight layer */}
      <animated.div
        className="absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-black/5 dark:text-white/10 pointer-events-none"
        style={{
          background: to(
            [spotX, spotY, spotR],
            (x, y, r) =>
              `radial-gradient(${r}px circle at ${x}px ${y}px, currentColor, transparent)`,
          ),
        }}
        aria-hidden
      ></animated.div>
      {/* Content layer */}
      <div className="absolute inset-px flex items-center p-2 rounded-[11px] bg-zinc-50 dark:bg-zinc-900">
        <div className="relative z-[1] w-0 flex-1 px-3">
          <span className="block text-lg leading-tight truncate">{title}</span>
          <span className="block mt-1 text-zinc-500 text-sm leading-tight	truncate">
            {description}
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {image && <img className="relative z-[1] h-[65px] rounded" src={image} alt="og" />}
      </div>
    </a>
  )
}

export default LinkCard
