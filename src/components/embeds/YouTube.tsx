import React from 'react'
import LazyLoad from '@/components/LazyLoad'

export interface YouTubeProps {
  /** YouTube id */
  vid?: string
  /** YouTube Playlist id */
  lid?: string
  /** Skip to a time in the video */
  start?: number
  /** Autoplay the video */
  autoplay?: boolean
  /** No Cookie option */
  noCookie?: boolean
}

const YouTube: React.FC<YouTubeProps> = props => {
  const { vid, lid, autoplay = false, start = 0, noCookie = false } = props
  const provider = noCookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com'
  const baseUrl = `${provider}/embed/`
  const src = `${baseUrl}${
    vid ? `${vid}?&autoplay=${autoplay ? 1 : 0}&start=${start}` : `videoseries?list=${lid}`
  }`

  return (
    <LazyLoad className="relative w-full bg-zinc-400/10 aspect-video">
      <iframe
        className="absolute left-0 top-0 w-full h-full"
        title={`YouTube-${vid || lid}`}
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </LazyLoad>
  )
}

export default YouTube
