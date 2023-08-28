import React from 'react'
import NextImage from 'next/image'

export type ImageProps = {
  src: string
  alt?: string
  width?: number
  height?: number
  lqip?: string
}

const Image: React.FC<ImageProps> = props => {
  const { src, alt = '', width = 1280, height = 720, lqip } = props

  return (
    <div className="relative mdx-img" style={{ aspectRatio: `${width} / ${height}` }}>
      <NextImage
        className="object-contain"
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
