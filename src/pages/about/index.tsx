import React, { PropsWithChildren } from 'react'
import style from './styles.module.scss'
import clsx from 'clsx'
import Link from 'next/link'

const Tag: React.FC<PropsWithChildren> = props => {
  return (
    <span className="inline-block rounded border bg-amber-500/10 text-amber-900 border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-500 px-2 py-1 text-xs leading-none">
      {props.children}
    </span>
  )
}
const Index: NextPageWithCustomProps = () => {
  return (
    <div className={clsx('prose-container py-12', style.about)}>
      <h2>🎨 关于本站</h2>
      <p>搭建它的初衷主要是为了练习新技术，其次是记录笔记 + 分享一些平时遇到的问题解决经验，本站技术栈为 Next.js、MDX、Tailwind CSS、TypeScript</p>

      <h2>📜 本站历史</h2>
      <ul>
        <li>2022 - 至今，使用 Next.js 从零开发，部署在 Vercel</li>
        <li>2018 - 2022，初版使用 Hexo 搭建，部署在海外服务器</li>
      </ul>

      <h2>👶🏻 关于我</h2>
      <p>一个前端开发工程师（2017年 - 至今），目前从事于 toB 直播行业，我的技能 👇🏻</p>
      <div className="flex items-start flex-wrap gap-2">
        <Tag>React</Tag>
        <Tag>Vue2</Tag>
        <Tag>Angular2+</Tag>
        <Tag>TypeScript</Tag>
        <Tag>NodeJS</Tag>
        <Tag>Canvas</Tag>
        <Tag>WebRTC</Tag>
        <Tag>RxJS</Tag>
        <Tag>NestJS</Tag>
        <Tag>Next.js</Tag>
        <Tag>UmiJS</Tag>
        ...
      </div>

      <h2>📮 找到我</h2>
      <ul>
        <li>Email - <Link href="mailto:362896731@qq.com">362896731@qq.com</Link></li>
        <li>Github - <Link href="https://github.com/xiaojundebug">https://github.com/xiaojundebug</Link></li>
      </ul>
    </div>
  )
}

export default Index
