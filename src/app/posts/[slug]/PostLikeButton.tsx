import React, { useEffect, useState } from 'react'
import { animated, config, useSpring } from '@react-spring/web'
import fetcher from '@/lib/fetcher'
import { getSiteUrl } from '@/common/url'
import { useTheme } from 'next-themes'
import { VT323 } from 'next/font/google'
import clsx from 'clsx'
import { prettifyNumber } from '@/common/utils'
import useSound from '@/hooks/useSound'
import useBoolean from '@/hooks/useBoolean'

const vt323 = VT323({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export interface PostLikeButtonProps {
  slug: string
}

const PostLikeButton: React.FC<PostLikeButtonProps> = ({ slug }) => {
  const [scale, setScale] = useState(1)
  const [likes, setLikes] = useState(0)
  const [isLoading, { set: setIsLoading }] = useBoolean(true)
  const { resolvedTheme, forcedTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark' || forcedTheme === 'dark'
  const [playSound] = useSound('/sounds/02.mp3')

  // 按钮动画
  const iconStyles = useSpring({
    scale,

    config: { tension: 300, friction: 10 },
  })

  // 漂浮的数字动画
  const [numStyles, numApi] = useSpring(
    () => ({
      scale: 0,
      opacity: 0,
      y: 0,
    }),
    [],
  )

  useEffect(() => {
    setIsLoading(true)
    fetcher<{ likes: number }>(getSiteUrl(`/api/likes/${slug}`))
      .then(res => {
        setLikes(res.likes)
      })
      .finally(() => {
        setIsLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  async function incrLikes() {
    // Optimistic updates
    setLikes(likes => likes + 1)
    numApi.start({
      from: { scale: 0, opacity: 0, y: 0 },
      to: [
        { scale: 1, opacity: 1, config: config.default },
        { opacity: 0, y: -5, config: config.slow },
      ],
    })
    try {
      await fetcher(`/api/likes/${slug}`, { method: 'PATCH' })
    } catch (e) {
      // Rollback
      setLikes(likes => likes - 1)
      throw e
    }
  }

  if (isLoading) return null

  return (
    <div className="relative flex flex-col justify-center items-center w-fit mt-8 -ml-[5px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <animated.img
        className="w-[38px] h-[38px] min-w-[38px] cursor-pointer"
        style={iconStyles}
        src={isDarkMode ? '/like-dark.png' : '/like-light.png'}
        alt="like"
        onMouseEnter={() => setScale(1.1)}
        onMouseLeave={() => setScale(1)}
        onMouseDown={() => setScale(1)}
        onMouseUp={() => {
          setScale(1.1)
          playSound()
          incrLikes()
            .then(() => {
              console.log('Like added')
            })
            .catch(e => {
              console.error(e)
            })
        }}
      />
      <animated.img
        className="absolute -right-1.5 -top-1 w-3.5 origin-bottom"
        style={numStyles}
        src="/like-plus-one.png"
        alt="likes +1"
      />
      <span
        className={clsx(vt323.className, 'mt-1 text-base font-medium text-purple-400')}
        style={{ fontFeatureSettings: '"tnum"' }}
      >
        {prettifyNumber(likes, 'en')}
      </span>
    </div>
  )
}

export default PostLikeButton
