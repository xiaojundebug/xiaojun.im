import { getLatestPosts } from '@/utils/post'
import AllPosts from '@/components/AllPosts'

export default async function Home() {
  const posts = await getLatestPosts()
  return <AllPosts posts={posts} />
}
