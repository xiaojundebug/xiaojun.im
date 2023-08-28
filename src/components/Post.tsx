'use client'

import React, { DependencyList, useEffect, useMemo, useState } from 'react'
import TableOfContents, { TableOfContentsProps } from '@/components/TableOfContents'
import { getMDXComponent, getMDXExport } from 'mdx-bundler/client'
import NextLink from 'next/link'
import dayjs from 'dayjs'
import CodeBlock from '@/components/CodeBlock'
import DarkModeToggle from '@/components/DarkModeToggle'
import UnorderedList from '@/components/lists/UnorderedList'
import OrderedList from '@/components/lists/OrderedList'
import ListItem from '@/components/lists/ListItem'
import config from 'config'
import useTranslation from '@/hooks/useTranslation'
import tagRenderer from '@/utils/tag-renderer'
import Image from '@/components/Image'
import HorizontalRule from '@/components/HorizontalRule'
import LinkCard from '@/components/LinkCard'
import DesktopOnly from '@/components/DesktopOnly'
import { ArrowLeft, ArrowRight, Calender, Clock } from '@/components/icons'
import Link from '@/components/Link'
import * as embeds from '@/components/embeds'
import NextImage from 'next/image'

const components = {
  h1: tagRenderer('h1'),
  h2: tagRenderer('h2'),
  h3: tagRenderer('h3'),
  h4: tagRenderer('h4'),
  h5: tagRenderer('h5'),
  h6: tagRenderer('h6'),
  p: tagRenderer('p'),
  blockquote: tagRenderer('blockquote'),
  table: tagRenderer('table'),
  thead: tagRenderer('thead'),
  tbody: tagRenderer('tbody'),
  tr: tagRenderer('tr'),
  th: tagRenderer('th'),
  td: tagRenderer('td'),
  em: tagRenderer('em'),
  strong: tagRenderer('strong'),
  del: tagRenderer('del'),
  img: Image,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  hr: HorizontalRule,
  code: CodeBlock,
  a: Link,
  linkcard: LinkCard,
  DarkModeToggle,
  ...embeds,
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

export interface PostProps {
  code: string
  frontmatter: PostFrontmatter
  prevPost?: { link: string; title: string }
  nextPost?: { link: string; title: string }
  heroImageInfo?: { src: string; width: number; height: number; lqip: string }
}

const Post: React.FC<PostProps> = props => {
  const { t } = useTranslation()
  const {
    code,
    frontmatter: { title, date, updatedOn, tags, toc = true, heroImage },
    prevPost,
    nextPost,
    heroImageInfo,
  } = props
  const headings = useHeadings([code])
  const Component = useMemo(() => getMDXComponent(code), [code])
  const { readingTime } = useMemo(
    () => getMDXExport<{ readingTime: PostReadingTime }, unknown>(code),
    [code],
  )

  return (
    <>
      <div className="prose-container break-all">
        <h1 className="mt-14 sm:mt-16 text-2xl sm:text-3xl text-black dark:text-white !leading-snug tracking-tight font-medium">
          {title}
        </h1>
        <div className="mt-4 text-zinc-400 dark:text-zinc-500">
          <div className="flex items-center text-sm">
            <span className="flex items-center">
              {/* 创建时间 */}
              <>
                <Calender className="mr-1 text-base" aria-hidden />
                {dayjs(date).format('MMMM D, YYYY')}
              </>
              <span className="mx-2">•</span>
              {/* 阅读时长估算 */}
              <>
                <Clock className="mr-1 text-base" aria-hidden />
                {readingTime.text}
              </>
            </span>
          </div>
        </div>
        {/* 标签 */}
        {tags && tags.length > 0 && (
          <div className="flex items-center flex-wrap m-auto mt-6 text-sm gap-2 sm:gap-3">
            {tags.map((tag: string) => (
              <NextLink
                key={tag}
                className="bg-primary/10 text-primary px-2.5 rounded-full"
                href={`/tags/${tag}`}
              >
                #{tag}
              </NextLink>
            ))}
          </div>
        )}
        <div className="relative flex w-full">
          <div className="flex-1 w-0">
            {/* hero image */}
            {heroImage && heroImageInfo && (
              <NextImage
                className="mt-6"
                src={heroImageInfo.src}
                alt="Hero Image"
                width={heroImageInfo.width}
                height={heroImageInfo.height}
                placeholder="blur"
                blurDataURL={heroImageInfo.lqip}
              />
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
          {t('post-page.last-updated', { date: dayjs(updatedOn || date).format('MMMM D, YYYY') })}
        </p>
        <HorizontalRule />
        {config.adjacentPosts && (
          <div className="mb-20 flex justify-between space-x-6 sm:space-x-12 sm:text-lg font-medium">
            {/* 上一篇 */}
            <span className="w-1/2">
              {prevPost ? (
                <NextLink
                  className="group flex h-full border border-zinc-400/20 rounded-xl p-3 sm:p-6 transition gap-2"
                  href={prevPost.link}
                >
                  <ArrowLeft
                    className="sm:-mt-[1px] shrink-0 text-2xl sm:text-3xl text-primary transition ease-out-back duration-500 sm:group-hover:-translate-x-2"
                    aria-hidden
                  />
                  {prevPost.title}
                </NextLink>
              ) : null}
            </span>
            {/* 下一篇 */}
            <span className="w-1/2 text-right">
              {nextPost ? (
                <NextLink
                  className="group flex justify-end h-full border border-zinc-400/20 rounded-xl p-3 sm:p-6 transition gap-2"
                  href={nextPost.link}
                >
                  {nextPost.title}
                  <ArrowRight
                    className="sm:-mt-[1px] shrink-0 text-2xl sm:text-3xl text-primary transition ease-out-back duration-500 sm:group-hover:translate-x-2"
                    aria-hidden
                  />
                </NextLink>
              ) : null}
            </span>
          </div>
        )}
      </div>
    </>
  )
}

export default Post
