import React from 'react'
import NextImage from 'next/image'

export type HeroImageProps = {
  src: string
  width: number
  height: number
  lqip: string
}

const HeroImage: React.FC<HeroImageProps> = props => {
  const { src, width, height, lqip } = props

  return (
    <div className="relative" style={{ aspectRatio: `${width} / ${height}` }}>
      <div
        className="absolute inset-0 z-0 hidden sm:block blur-xl saturate-150
          after:absolute after:inset-0 after:hidden sm:after:block after:bg-white/50 dark:after:bg-black/50"
      >
        <NextImage className="w-full h-full sm:rounded-2xl" aria-hidden src={lqip} alt="" fill />
      </div>
      <NextImage
        className="relative sm:rounded-2xl"
        src={src}
        alt="Hero Image"
        fill
        placeholder="blur"
        blurDataURL={lqip}
      />
    </div>
  )
}

export default HeroImage
