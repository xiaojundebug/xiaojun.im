'use client'

import React, { useEffect, useState } from 'react'
import fetcher from '@/lib/fetcher'
import { getSiteUrl } from '@/utils/url'
import Spinner from '@/components/Spinner'
import { prettifyNumber, sleep } from '@/utils'

export interface PostViewsProps {
  slug: string
}

const PostViews: React.FC<PostViewsProps> = ({ slug }) => {
  const [views, setViews] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    if (process.env.NODE_ENV === 'production') {
      fetcher<{ pv: number }>(getSiteUrl(`/api/views/${slug}`), { method: 'PATCH' })
        .then(res => {
          setViews(res.pv)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      sleep(200)
        .then(() => setViews(1024))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [slug])

  if (isLoading) return <Spinner />

  return prettifyNumber(views)
}

export default PostViews
