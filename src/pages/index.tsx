import React from 'react'
import { GetStaticProps } from 'next'
import { getLatestPosts } from '@/utils/post'
import DefaultLayout from '../layouts/Default'

export default DefaultLayout

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await getLatestPosts()

  return {
    props: { posts },
  }
}
