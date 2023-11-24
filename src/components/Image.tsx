import React from 'react'
import NextImage from 'next/image'

export type ImageProps = {
  src: string
  width?: number
  height?: number
  lqip?: string
  alt?: string
}

const Image: React.FC<ImageProps> = props => {
  const { src, alt = '', width = 1280, height = 720, lqip } = props

  return (
    <NextImage
      className="mdx-img max-w-full mx-auto"
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
