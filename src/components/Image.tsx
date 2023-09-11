import React from 'react'
import NextImage from 'next/image'

export type ImageProps = {
  src: string
  alt?: string
  width?: number
  height?: number
  color?: { r: number; g: number; b: number; hex: string }
  lqip?: string
}

const Image: React.FC<ImageProps> = props => {
  const { src, alt = '', width = 1280, height = 720, lqip } = props

  return (
    <div className="relative prose-bleed my-12" style={{ aspectRatio: `${width} / ${height}` }}>
      <NextImage
        className="max-w-full h-auto mx-auto rounded-xl"
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={lqip}
      />
    </div>
  )
}

export default Image
