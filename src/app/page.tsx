import React, { PropsWithChildren } from 'react'
import Profile from '@/components/Profile'
import useTranslation from '@/hooks/useTranslation'
import Link from 'next/link'
import { ArrowRight } from '@/components/icons'
import DesktopOnly from '@/components/DesktopOnly'
import FeaturedPosts from './FeaturedPosts'

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Vue2',
  'Angular2+',
  'NodeJS',
  'RxJS',
  'NestJS',
  'Next.js',
  'WebRTC',
  'Figma',
  'Sketch',
]

const projects = [
  {
    name: 'xiaojun.im',
    desc: 'The source code of this website',
    url: 'https://github.com/xiaojundebug/xiaojun.im',
  },
  {
    name: 'unique-ui',
    desc: 'A mobile component library for Vue2.x',
    url: 'https://github.com/xiaojundebug/unique-ui',
  },
  {
    name: 'zhuangtai',
    desc: 'A scalable reactjs state management solution powered by RxJS',
    url: 'https://github.com/xiaojundebug/zhuangtai',
  },
  {
    name: 'ngx-popup',
    desc: 'An angular popup component with customizable animations',
    url: 'https://github.com/xiaojundebug/ngx-popup',
  },
  {
    name: 'ngx-carousel',
    desc: 'A simple angular carousel component',
    url: 'https://github.com/xiaojundebug/ngx-carousel',
  },
  {
    name: 'hammerspoon-config',
    desc: 'My hammerspoon scripts',
    url: 'https://github.com/xiaojundebug/hammerspoon-config',
  },
  {
    name: 'alfred-npm-search-workflow',
    desc: 'NPM Workflow for Alfred',
    url: 'https://github.com/xiaojundebug/alfred-npm-search-workflow',
  },
  {
    name: 'alfred-system-theme',
    desc: 'Alfred themes inspired on macOS',
    url: 'https://github.com/xiaojundebug/alfred-system-theme',
  },
]

const Title: React.FC<{ text: string }> = props => {
  const { text } = props

  return <h2 className="flex items-center justify-between mt-16 text-2xl font-bold">{text}</h2>
}

const Tag: React.FC<PropsWithChildren> = props => {
  return (
    <span className="inline-block px-2 py-1 rounded border bg-amber-500/10 text-amber-900 border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-500 text-sm leading-none">
      {props.children}
    </span>
  )
}

export const revalidate = 86400

export default async function Home() {
  const { t } = useTranslation()

  return (
    <>
      <div className="prose-container">
        <Profile />

        <p className="mt-6 break-words leading-loose">
          I'm a front-end developer who is a bit of a perfectionist (2017 ~ present), currently
          working in Hangzhou, China 🇨🇳.
        </p>
        <p className="mt-6 break-words leading-loose">
          I love working in the realm between design and code. Some things that makes me excited are
          CSS, Design Systems, Animation, crafting excellent component APIs and making interfaces
          feel fun and human.
        </p>
        <p className="mt-6 break-words leading-loose">The following are some of my skills 👇</p>
        <div className="flex items-start flex-wrap gap-2 mt-6">
          {skills.map(skill => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
        <Title text={t('home-page.projects')} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 -mx-4 mt-6">
          {projects.map(project => (
            <Link
              className="group relative flex flex-col px-4 py-3 gap-1.5 rounded-xl sm:hover:bg-zinc-400/10 transition-colors"
              key={project.name}
              href={project.url}
              target="_blank"
            >
              <span className="font-medium">{project.name}</span>
              <span className="text-zinc-400 dark:text-zinc-500">{project.desc}</span>
              <DesktopOnly>
                <ArrowRight className="absolute right-2.5 bottom-2.5 text-zinc-300 dark:text-zinc-600 -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
              </DesktopOnly>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            className="inline-flex items-center justify-center gap-1 font-medium text-zinc-400 border-b border-zinc-400/10 hover:border-zinc-400/50 transition-colors"
            href="https://github.com/xiaojundebug?tab=repositories&sort=stargazers"
          >
            {t('home-page.projects.view-all')}
          </Link>
        </div>
        <Title text={t('home-page.posts')} />
        <FeaturedPosts />
        <div className="text-center mt-6">
          <Link
            className="inline-flex items-center justify-center gap-1 font-medium text-zinc-400 border-b border-zinc-400/10 hover:border-zinc-400/50 transition-colors"
            href="/posts"
          >
            {t('home-page.posts.view-all')}
          </Link>
        </div>
      </div>
    </>
  )
}
