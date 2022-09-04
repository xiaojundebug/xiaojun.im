import React from 'react'
import useImage from '@/hooks/useImage'
import { NativeProps, withNativeProps } from '@/utils/native-props'

export interface HeroImage extends NativeProps {
  src: string
}

const loading = (
  <div className="w-full h-full flex items-center justify-center bg-slate-200/70 dark:bg-zinc-600/20 animate-pulse">
    <img className="opacity-10 dark:invert" src="/placeholder.png" alt="image placeholder" width={60} />
  </div>
)

const failed = (
  <div className="w-full h-full flex items-center justify-center bg-slate-200/70 dark:bg-zinc-600/20">
    <img className="opacity-10 dark:invert" src="/broken-image.png" alt="image broken" width={60} />
  </div>
)

const HeroImage: React.FC<HeroImage> = props => {
  const { src } = props
  const { dataUrl, status } = useImage(src)

  return withNativeProps(
    props,
    <div className="w-full aspect-video rounded-md sm:rounded-lg overflow-hidden isolate">
      {status === 'loading' && loading}
      {status === 'loaded' && <img className="w-full h-full object-cover dark:brightness-75" src={dataUrl} alt="hero image" />}
      {status === 'failed' && failed}
    </div>
  )
}

export default HeroImage
