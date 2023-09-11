import React, { useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import fetcher from '@/lib/fetcher'
import { getSiteUrl } from '@/utils/url'
import Spinner from '@/components/Spinner'

export interface LikeProps {
  slug: string
}

const Like: React.FC<LikeProps> = ({ slug }) => {
  const [scale, setScale] = useState(1)
  const [likes, setLikes] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const styles = useSpring({
    to: { scale },
    config: { tension: 300, friction: 10 },
  })

  useEffect(() => {
    setIsLoading(true)
    fetcher<{ likes: number }>(getSiteUrl(`/api/likes/${slug}`))
      .then(res => {
        setLikes(res.likes)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [slug])

  async function incrLikes() {
    // Optimistic updates
    setLikes(likes => likes + 1)
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
    <div className="flex flex-col justify-center items-center w-fit mt-8 -ml-[5px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <animated.img
        className="w-[40px] h-[40px] max-w-[40px] dark:brightness-[0.9] cursor-pointer"
        style={styles}
        src="/like.svg"
        alt=""
        onMouseEnter={() => setScale(1.1)}
        onMouseLeave={() => setScale(1)}
        onMouseDown={() => setScale(1)}
        onMouseUp={() => {
          setScale(1.1)
          incrLikes()
            .then(() => {
              console.log('Like added')
            })
            .catch(e => {
              console.error(e)
            })
        }}
      />
      <span className="mt-1 text-sm font-medium text-zinc-500" style={{ fontFeatureSettings: '"tnum"' }}>
        {likes}
      </span>
    </div>
  )
}

export default Like
