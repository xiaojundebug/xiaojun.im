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
    <NextImage
      className="max-w-full mx-auto"
      style={{ aspectRatio: `${width} / ${height}` }}
      width={width}
      height={height}
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL={lqip}
    />
  )
}

export default Image
