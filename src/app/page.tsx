import React, { PropsWithChildren } from 'react'
import Profile from '@/components/Profile'
import useTranslation from '@/hooks/useTranslation'
import Link from 'next/link'
import Projects from './Projects'
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
        <Projects />
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
