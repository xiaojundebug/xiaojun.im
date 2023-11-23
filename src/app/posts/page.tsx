import { getLatestPosts } from '@/utils/post'
import AllPostsPage from '@/components/post/AllPostsPage'

export default async function Posts() {
  const posts = await getLatestPosts()
  return <AllPostsPage posts={posts} />
}
