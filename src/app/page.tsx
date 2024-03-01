import React, { PropsWithChildren } from 'react'
import Profile from '@/components/Profile'
import useTranslation from '@/hooks/useTranslation'
import Link from '@/components/Link'

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
        <Profile />
        <h2 className="mt-16 mb-6 text-2xl font-medium">{t('home-page.about')}</h2>
        <p className="my-6 break-words leading-loose">
          A front-end developer who is a bit of a perfectionist (2017 ~ present), currently engaged
          in the ToB live streaming industry in Hangzhou, China 🇨🇳, occasionally contributing to{' '}
          <Link
            className="text-primary font-medium underline underline-offset-4 decoration-primary/20 hover:decoration-primary transition"
            href="https://github.com/xiaojundebug"
          >
            open-source projects
          </Link>
          .
        </p>
        <p className="my-6 break-words leading-loose">
          I love working in the realm between design and code. Some things that makes me excited are
          CSS, Design Systems, Animation, crafting excellent component APIs and making interfaces
          feel fun and human.
        </p>
        <p className="my-6 break-words leading-loose">The following are some of my skills 👇</p>
        <div className="flex items-start flex-wrap gap-2 my-6">
          <Tag>HTML</Tag>
          <Tag>CSS</Tag>
          <Tag>JavaScript</Tag>
          <Tag>TypeScript</Tag>
          <Tag>React</Tag>
          <Tag>Vue2</Tag>
          <Tag>Angular2+</Tag>
          <Tag>NodeJS</Tag>
          <Tag>RxJS</Tag>
          <Tag>NestJS</Tag>
          <Tag>Next.js</Tag>
          <Tag>WebRTC</Tag>
          <Tag>Figma</Tag>
          <Tag>Sketch</Tag>
          ...
        </div>
      </div>
    </>
  )
}
