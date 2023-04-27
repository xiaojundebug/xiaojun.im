import { FiGithub, FiLink } from 'react-icons/fi'

const config = {
  name: 'xiaojun',
  title: "xiaojun's blog",
  desc: '为什么不问问神奇海螺 🐚 呢？',
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
  toc: true, // table of content
  adjacentPosts: true, // prev next links
  markdown: {
    lineNumbers: false
  }
}

export default config
