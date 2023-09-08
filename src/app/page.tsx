import { getLatestPosts } from '@/utils/post'
import AllPostsPage from '@/components/post/AllPostsPage'

export default async function Home() {
  const posts = await getLatestPosts()
  return <AllPostsPage posts={posts} />
}
