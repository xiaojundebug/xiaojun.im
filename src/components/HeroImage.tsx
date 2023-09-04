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
