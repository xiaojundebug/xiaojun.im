import React from 'react'
import style from './about.module.scss'
import classNames from 'classnames'
import Link from 'next/link'
import {GetStaticProps} from "next";
import {getLatestPosts} from "@/utils/post";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const About = () => {
  return (
    <div className={classNames('container py-12', style.about)}>
      <h2>🎨 关于本站</h2>
      <p>本站是我用来分享技术、记录笔记的一个自由空间，另一个目的是为了练手前端的一些新技术</p>
      <ul>
        <li>本站技术栈 - Next.js、MDX、Tailwind CSS、TypeScript</li>
      </ul>

      <h2>📜 本站历史</h2>
      <ul>
        <li>2022 - 至今，使用 Next.js 从零开发，部署在 Vercel </li>
        <li>2018 - 2022，初版使用 Hexo 搭建，部署在海外服务器</li>
      </ul>

      <h2>👶🏻 关于我</h2>
      <p>一个前端开发工程师（2017年 - 至今），目前从事于 toB 直播行业，可以熟练使用以下技术栈 👇🏻</p>
      <ul className={style.skills}>
        <li><span className={style.skill}>Vue2</span> - 工作前几年大部分时间都是用 Vue2 开发，并且业余时间出于学习目的开源过一个<Link href="https://github.com/xiaojun1994/unique-ui">组件库</Link></li>
        <li><span className={style.skill}>Angular</span> - 这家公司原来使用 Angular2+（不是 AngularJS），进来被迫学习，后来 Angular 反而成为了前端三大框架中我最爱的</li>
        <li><span className={style.skill}>React</span> - 截止至今一直在使用 React</li>
        <li><span className={style.skill}>TypeScript</span> - 使用 Angular 与 React 时候我都会搭配 TypeScript 使用</li>
        <li><span className={style.skill}>RxJS</span> - 由于 Angular 捆绑了 RxJS，所以 RxJS 也能使用很熟练，并且在我们现在的 React 项目中也有用到 RxJS + 自定义 hook 做状态管理</li>
        <li><span className={style.skill}>UmiJS</span> - 用过半年 UmiJS，并且有给 Ant Design ProComponents 与 UmiJS Plugins 提过 PR</li>
        <li><span className={style.skill}>NestJS</span> - 使用它来开发过一个直播流媒体服务，偏 Angular 的写法是我选择它的主要原因</li>
        <li><span className={style.skill}>Next.js</span> - 初次使用它是用来开发公司的对外 SDK 在线文档，该文档支持代码块的实时运行，后来以此为灵感重构了本站</li>
      </ul>

      <h2>📮 找到我</h2>
      <ul>
        <li>Email - <Link href="mailto:362896731@qq.com">362896731@qq.com</Link></li>
        <li>Github - <Link href="https://github.com/xiaojun1994">https://github.com/xiaojun1994</Link></li>
      </ul>

      <h2>🧭 参考</h2>
      本站灵感与部分代码参考或直接来自以下网站
      <ul>
        <li><Link href="https://www.joshwcomeau.com">https://www.joshwcomeau.com</Link>👍</li>
        <li><Link href="https://leerob.io">https://leerob.io</Link></li>
        <li><Link href="https://blog.maximeheckel.com">https://blog.maximeheckel.com</Link></li>
        <li><Link href="https://vuepress.vuejs.org">https://vuepress.vuejs.org</Link></li>
        <li><Link href="https://react-spring.dev">https://react-spring.dev</Link></li>
        <li><Link href="https://github.com/iissnan/hexo-theme-next">https://github.com/iissnan/hexo-theme-next</Link></li>
        <li><Link href="https://github.com/sanjinhub/hexo-theme-geek">https://github.com/sanjinhub/hexo-theme-geek</Link></li>
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<any, { slug: string }> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

export default About
