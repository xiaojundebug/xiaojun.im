import React from 'react'
import { GetStaticProps } from 'next'
import { getLatestPosts } from '@/utils/post'
import DefaultLayout from '../layouts/Default'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default DefaultLayout

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await getLatestPosts()

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}
