import React, { DependencyList, useEffect, useMemo, useState } from 'react'
import TableOfContents, { TableOfContentsProps } from '@/components/TableOfContents'
import { getMDXComponent, getMDXExport } from 'mdx-bundler/client'
import Link from 'next/link'
import dayjs from 'dayjs'
import HeroImage from '@/components/HeroImage'
import CodeBlock from '@/components/CodeBlock'
import DarkModeToggle from '@/components/DarkModeToggle'
import UnorderedList from '@/components/lists/UnorderedList'
import OrderedList from '@/components/lists/OrderedList'
import ListItem from '@/components/lists/ListItem'
import YouTube from '@/components/embeds/YouTube'
import StackBlitz from '@/components/embeds/StackBlitz'
import CodeSandbox from '@/components/embeds/CodeSandbox'
import CodePen from '@/components/embeds/CodePen'
import Bilibili from '@/components/embeds/Bilibili'
import config from 'config'
import useTranslation from '@/hooks/useTranslation'
import tagRenderer from '@/utils/tag-renderer'
import HorizontalRule from '@/components/HorizontalRule'
import useTitle from '@/hooks/useTitle'
import * as process from 'process'
import { NextSeo } from 'next-seo'
import LinkCard from '@/components/LinkCard'
import DesktopOnly from '@/components/DesktopOnly'
import { ArrowLeft, ArrowRight, Calender, Clock } from '@/components/icons'

const components = {
  h1: tagRenderer('h1'),
  h2: tagRenderer('h2'),
  h3: tagRenderer('h3'),
  h4: tagRenderer('h4'),
  h5: tagRenderer('h5'),
  h6: tagRenderer('h6'),
  p: tagRenderer('p'),
  a: tagRenderer('a'),
  blockquote: tagRenderer('blockquote'),
  table: tagRenderer('table'),
  thead: tagRenderer('thead'),
  tbody: tagRenderer('tbody'),
  tr: tagRenderer('tr'),
  th: tagRenderer('th'),
  td: tagRenderer('td'),
  img: tagRenderer('img'),
  em: tagRenderer('em'),
  strong: tagRenderer('strong'),
  del: tagRenderer('del'),
  code: CodeBlock,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  hr: HorizontalRule,
  DarkModeToggle,
  YouTube,
  StackBlitz,
  CodeSandbox,
  CodePen,
  Bilibili,
  linkcard: LinkCard,
}

function useHeadings(deps: DependencyList = []) {
  const [headings, setHeadings] = useState<TableOfContentsProps['headings']>([])

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll(
        '.markdown-body > h2, .markdown-body > h3, .markdown-body > h4, .markdown-body > h5, .markdown-body > h6',
      ),
    )
      .filter(element => element.id)
      .map(element => ({
        id: element.id,
        text: element.textContent ?? '',
        level: Number(element.tagName.substring(1)),
      }))
    setHeadings(elements)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return headings
}

export interface PostLayoutProps {
  slug: string
  code: string
  frontmatter: PostFrontmatter
  prevPost?: { link: string; title: string }
  nextPost?: { link: string; title: string }
}

const PostLayout: React.FC<PostLayoutProps> = props => {
  const { t } = useTranslation()
  const {
    code,
    frontmatter: {
      title,
      date,
      updatedOn,
      tags,
      toc = true,
      heroImage,
      heroImageAspectRatio = '16 / 9',
    },
    prevPost,
    nextPost,
  } = props
  const headings = useHeadings([code])
  const Component = useMemo(() => getMDXComponent(code), [code])
  const { readingTime } = useMemo(
    () => getMDXExport<{ readingTime: PostReadingTime }, unknown>(code),
    [code],
  )

  useTitle(title)

  return (
    <>
      <NextSeo
        openGraph={{
          type: 'article',
          title,
          images: [
            {
              url: `${
                process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : config.siteUrl
              }/api/og?title=${encodeURIComponent(title)}`,
            },
          ],
        }}
      />
      <div className="prose-container break-all">
        <h1 className="mt-14 sm:mt-16 text-2xl sm:text-3xl text-black dark:text-white !leading-snug tracking-tight font-medium">
          {title}
        </h1>
        <div className="text-zinc-500 dark:text-zinc-300 mt-4">
          <div className="flex items-center text-sm">
            <span className="flex items-center">
              {/* 创建时间 */}
              <>
                <Calender className="mr-1 text-base" />
                {dayjs(date).format('LL')}
              </>
              <span className="mx-2">•</span>
              {/* 阅读时长估算 */}
              <>
                <Clock className="mr-1 text-base" />
                {readingTime.text}
              </>
            </span>
          </div>
        </div>
        {/* 标签 */}
        {tags && tags.length > 0 && (
          <div className="flex items-center flex-wrap m-auto mt-6 text-sm gap-2 sm:gap-3">
            {tags.map((tag: string) => (
              <Link key={tag} href={`/tags/${tag}`}>
                <a className="bg-teal-500/10 text-teal-500 px-2.5 rounded-full">#{tag}</a>
              </Link>
            ))}
          </div>
        )}
        <div className="relative flex w-full">
          <div className="flex-1 w-0">
            {/* 文章顶部图片 */}
            {heroImage && (
              <HeroImage className="mt-6" src={heroImage} aspectRatio={heroImageAspectRatio} />
            )}
            {/* markdown 内容 */}
            <article className="markdown-body w-full mt-10">
              {/* @ts-ignore */}
              <Component components={components} />
            </article>
          </div>
          {/* 侧边目录导航 */}
          {config.toc && toc && headings.length > 1 && (
            <DesktopOnly>
              <TableOfContents headings={headings} />
            </DesktopOnly>
          )}
        </div>
        <p className="mt-24 mb-0 text-right text-zinc-500 text-sm italic">
          {t('post-page.last-updated', { date: dayjs(updatedOn || date).format('LL') })}
        </p>
        <HorizontalRule />
        {config.adjacentPosts && (
          <div className="mb-20 flex justify-between space-x-6 sm:space-x-12 sm:text-lg font-medium">
            {/* 下一篇 */}
            <span className="w-1/2">
              {prevPost ? (
                <Link href={prevPost.link}>
                  <a className="group flex h-full border border-zinc-400/20 rounded-xl p-3 sm:p-6 transition gap-2">
                    <ArrowLeft className="sm:-mt-[1px] shrink-0 text-2xl sm:text-3xl text-primary transition ease-out-back duration-500 sm:group-hover:-translate-x-2" />
                    {prevPost.title}
                  </a>
                </Link>
              ) : null}
            </span>
            {/* 上一篇 */}
            <span className="w-1/2 text-right">
              {nextPost ? (
                <Link href={nextPost.link}>
                  <a className="group flex justify-end h-full border border-zinc-400/20 rounded-xl p-3 sm:p-6 transition gap-2">
                    {nextPost.title}
                    <ArrowRight className="sm:-mt-[1px] shrink-0 text-2xl sm:text-3xl text-primary transition ease-out-back duration-500 sm:group-hover:translate-x-2" />
                  </a>
                </Link>
              ) : null}
            </span>
          </div>
        )}
      </div>
    </>
  )
}

export default PostLayout
