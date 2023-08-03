import { GetStaticProps } from 'next'
import { getLatestPosts } from '@/utils/post'
import AllPosts from '../layouts/AllPosts'

export default AllPosts

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getLatestPosts()

  return {
    props: { posts },
  }
}
