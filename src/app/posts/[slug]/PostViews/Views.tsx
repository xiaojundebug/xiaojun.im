'use client'

import React, { useContext } from 'react'
import Spinner from '@/components/Spinner'
import { prettifyNumber } from '@/common/utils'
import { PostViewsContext } from './Provider'

const PostViews = () => {
  const { views, isLoading } = useContext(PostViewsContext)

  if (isLoading) return <Spinner />

  return prettifyNumber(views)
}

export default PostViews
