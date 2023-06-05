import { FiGithub, FiLink } from 'react-icons/fi'

const config = {
  name: 'IMZXJ',
  title: "IMZXJ",
  description: '你好 👋',
  avatar: '/avatar.png',
  logo: '/logo.svg',
  socials: [
    { label: 'Github', icon: <FiGithub className="text-lg" aria-hidden />, link: 'https://github.com/imzxj' },
    { label: '友链', icon: <FiLink className="text-lg" aria-hidden />, link: '/blogroll' },
  ],
  blogroll: [
    { name: '赖同学', link: 'https://www.laibh.com' },
    { name: '鯊手', link: 'https://www.cnblogs.com/Scooby' },
    { name: 'mghio', link: 'https://www.mghio.cn' },
  ],
  language: 'zh-CN', // en | zh-CN
  toc: true, // table of content
  adjacentPosts: true, // prev next links
  markdown: {
    lineNumbers: false
  }
}

export default config
