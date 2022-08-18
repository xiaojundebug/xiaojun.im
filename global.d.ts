type NextPageWithLayout<P = {}, IP = P> = import('next').NextPage<P, IP> & {
  getLayout?: (page: import('react').ReactElement) => import('react').ReactNode;
};

interface PostFrontmatter {
  title: string
  date: string // 创建日期
  updateOn?: string // 最后更新日期，git commit 之前会自动更新此字段
  tags?: string[]
  toc?: boolean // 侧边导航是否可见，默认为 true
  heroImage?: string // 顶部图片地址
}

interface ReadingTime {
  minutes: number;
  text: string;
  time: number;
  words: number;
}
