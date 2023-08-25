import React from 'react'
import useImage from '@/hooks/useImage'
import { NativeProps, withNativeProps } from '@/utils/native-props'
import { Loading } from '@/components/icons'

export interface HeroImage extends NativeProps {
  src: string
  aspectRatio?: string // 长 / 宽
}

const HeroImage: React.FC<HeroImage> = props => {
  const { src, aspectRatio = '16 / 9' } = props
  const { dataUrl, status } = useImage(src)

  const loading = (
    <div className="flex h-full items-center justify-center bg-zinc-400/10 text-zinc-500">
      <Loading className="text-4xl animate-spin" aria-hidden />
    </div>
  )

  const failed = (
    <div className="flex h-full items-center justify-center bg-zinc-400/10">
      <img
        className="opacity-10 dark:invert"
        src="/public/broken-image.png"
        alt="image broken"
        width={60}
      />
    </div>
  )

  return withNativeProps(
    props,
    <div className="w-full rounded-lg overflow-hidden isolate" style={{ aspectRatio }}>
      {status === 'loading' && loading}
      {status === 'loaded' && (
        <img className="w-full h-full object-cover" src={dataUrl} alt="hero image" />
      )}
      {status === 'failed' && failed}
    </div>,
  )
}

export default HeroImage
