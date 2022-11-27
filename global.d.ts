type NextPageWithCustomProps<P = {}, IP = P> = import('next').NextPage<P, IP> & {
  getLayout?: (page: import('react').ReactElement) => import('react').ReactNode
  theme?: string
}

interface Post {
  path: string
  slug: string
  frontmatter: PostFrontmatter
}

interface PostFrontmatter {
  title: string // 标题
  date: string // 创建日期
  updateOn?: string // 最后更新日期，git commit 之前会自动更新此字段
  tags?: string[] // 标签
  toc?: boolean // 侧边导航是否可见，默认为 true
  heroImage?: string // 顶部图片地址
  heroImageAspectRatio?: string // 图片长宽比，默认 16 / 9
  draft?: boolean // 为 true 则不会展示该文章
  pinned?: boolean // 是否置顶显示
}

interface ReadingTime {
  minutes: number
  text: string
  time: number
  words: number
}
