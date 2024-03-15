import React, { PropsWithChildren } from 'react'
import useTranslation from '@/hooks/useTranslation'
import Link from '@/components/Link'
import { ArrowRight, GitHub, Juejin, RSS, X } from '@/components/icons'
import config from 'config'
import Image from 'next/image'
import DesktopOnly from '@/components/DesktopOnly'

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

const links: { name: string; link: string }[] = config.links

// prettier-ignore
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  'GitHub': <GitHub aria-hidden />,
  'X': <X aria-hidden />,
  '稀土掘金': <Juejin aria-hidden />,
  'RSS': <RSS aria-hidden />,
}

const Tag: React.FC<PropsWithChildren> = props => {
  return (
    <span className="inline-block px-2 py-1 rounded border bg-amber-500/10 text-amber-900 border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-500 text-sm leading-none">
      {props.children}
    </span>
  )
}

export default async function Home() {
  const { t } = useTranslation()

  return (
    <>
      <div className="prose-container">
        <Image
          className="object-cover rounded-full mt-16 p-1 mb-8 bg-white dark:bg-zinc-900 ring-1 ring-zinc-400/20 shadow-lg dark:shadow-none shadow-zinc-600/10"
          src={config.avatar}
          alt="avatar"
          width={64}
          height={64}
          unoptimized
          priority
        />
        <div>
          <h1 className="text-4xl sm:text-6xl !leading-snug tracking-tight font-semibold">
            {config.title} <br />
          </h1>
          <span className="inline-block mt-1 text-xl sm:text-2xl font-medium font-mono text-primary bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            &lt;Front End Developer /&gt;
          </span>
        </div>
        <p className="my-6 break-words leading-loose">
          I'm a front-end developer who is a bit of a perfectionist (2017 ~ present), currently
          working in Hangzhou, China 🇨🇳.
        </p>
        <p className="my-6 break-words leading-loose">
          I love working in the realm between design and code. Some things that makes me excited are
          CSS, Design Systems, Animation, crafting excellent component APIs and making interfaces
          feel fun and human.
        </p>
        <div className="flex items-center -mx-2">
          {links.map(({ name, link }) => (
            <a
              key={link}
              className="inline p-2 rounded-full text-2xl transition-opacity opacity-50 hover:opacity-100"
              href={link}
              target="_blank"
              title={name}
              aria-label={name}
            >
              {SOCIAL_ICONS[name]}
            </a>
          ))}
        </div>
        <h2 className="flex items-center justify-between mt-16 mb-6 text-2xl font-medium">
          {t('home-page.skills')}
        </h2>
        <div className="flex items-start flex-wrap gap-2 my-6">
          {skills.map(skill => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
        <h2 className="flex items-center justify-between mt-16 mb-6">
          <span className="text-2xl font-medium">{t('home-page.projects')}</span>
          <Link
            href="https://github.com/xiaojundebug?tab=repositories&sort=stargazers"
            className="flex items-center gap-1 my-4 hover:underline"
          >
            {t('home-page.projects.view-all')}
            <ArrowRight className="text-xl" />
          </Link>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 -mx-4">
          {projects.map(project => (
            <Link
              className="group relative flex flex-col px-4 py-3 gap-1.5 rounded-xl sm:hover:bg-zinc-400/5 transition-colors"
              key={project.name}
              href={project.url}
            >
              <span className="font-medium">{project.name}</span>
              <span className="text-zinc-400 dark:text-zinc-500">{project.desc}</span>
              <DesktopOnly>
                <ArrowRight className="absolute right-2.5 bottom-2.5 text-zinc-300 dark:text-zinc-600 -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
              </DesktopOnly>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
