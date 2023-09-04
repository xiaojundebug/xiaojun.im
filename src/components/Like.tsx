import React, { useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'

export interface LikeProps {
  slug: string
}

const Like: React.FC<LikeProps> = props => {
  const { slug } = props
  const [scale, setScale] = useState(1)
  const [likes, setLikes] = useState(0)
  const [loading, setLoading] = useState(true)

  const styles = useSpring({
    to: { scale },
    config: { tension: 300, friction: 10 },
  })

  useEffect(() => {
    setLoading(true)
    fetch(`/api/likes?slug=${slug}`).then(async res => {
      if (res.ok) {
        const data = await res.json()
        setLikes(data.likes)
      }
      setLoading(false)
    })
  }, [slug])

  function incrLike() {
    setLikes(likes => likes + 1)
    fetch(`/api/likes`, { method: 'PATCH', body: JSON.stringify({ slug }) }).then(res => {
      if (res.ok) {
        // ...
      } else {
        setLikes(likes => likes - 1)
      }
    })
  }

  if (loading) return null

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
          incrLike()
        }}
      />
      <span className="mt-1 text-sm text-zinc-400" style={{ fontFeatureSettings: '"tnum"' }}>
        {likes}
      </span>
    </div>
  )
}

export default Like
