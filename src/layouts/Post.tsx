import React, { DependencyList, useEffect, useMemo, useState } from 'react'
import TableOfContents, { TableOfContentsProps } from '@/components/TableOfContents'
import { getMDXComponent, getMDXExport } from 'mdx-bundler/client'
import Link from 'next/link'
import dayjs from 'dayjs'
import HeroImage from '@/components/HeroImage'
import { HiArrowSmLeft, HiArrowSmRight, HiOutlineClock, HiOutlineCalendar } from 'react-icons/hi'
import CodeBlock from '@/components/CodeBlock'
import Blockquote from '@/components/Blockquote'
import Image from '@/components/Image'
import DarkModeToggle from '@/components/DarkModeToggle'
import UnorderedList from '@/components/lists/UnorderedList'
import OrderedList from '@/components/lists/OrderedList'
import ListItem from '@/components/lists/ListItem'
import { YouTube } from '@/components/embeds/YouTube'
import { StackBlitz } from '@/components/embeds/StackBlitz'
import { CodeSandbox } from '@/components/embeds/CodeSandbox'
import { CodePen } from '@/components/embeds/CodePen'
import config from 'config'
import useTranslation from '@/hooks/useTranslation'

const components = {
  code: CodeBlock,
  blockquote: Blockquote,
  img: Image,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  DarkModeToggle,
  YouTube,
  StackBlitz,
  CodeSandbox,
  CodePen,
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
      updateOn,
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

  return (
    <div className="prose-container break-all">
      <h1 className="mt-14 sm:mt-16 text-2xl sm:text-4xl text-black dark:text-white !leading-snug tracking-tight font-medium">
        {title}
      </h1>
      <div className="text-gray-500 dark:text-gray-300 mt-4">
        <div className="flex items-center text-sm">
          <span className="flex items-center">
            {/* 最后更新时间 */}
            <HiOutlineCalendar className="mr-1 text-base" />
            {t('post-page.last-updated', { date: dayjs(updateOn || date).format('LL') })}
            <span className="mx-2">•</span>
            {/* 阅读时长估算 */}
            <HiOutlineClock className="mr-1 text-base" />
            {t('post-page.reading-time', { minutes: Math.ceil(readingTime.minutes) })}
          </span>
        </div>
      </div>
      {/* 标签 */}
      {tags && tags.length > 0 && (
        <div className="flex items-center flex-wrap m-auto mt-6 sm:mt-12 text-sm gap-2 sm:gap-3">
          {tags.map((tag: string) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <a className="bg-pink-500/10 text-pink-500 hover:text-pink-700 px-2 py-1 rounded font-medium transition">
                {tag}
              </a>
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
          <TableOfContents className="hidden sm:block" headings={headings} />
        )}
      </div>
      <hr className="divider" />
      {config.adjacentPosts && (
        <div className="mb-20 flex justify-between space-x-6 sm:space-x-12 sm:text-lg font-medium">
          {/* 下一篇 */}
          <span className="w-1/2">
            {prevPost ? (
              <Link href={prevPost.link}>
                <a className="group flex h-full border border-zinc-400/20 rounded-xl p-3 sm:p-6 transition gap-2">
                  <HiArrowSmLeft className="sm:-mt-[1px] shrink-0 text-2xl sm:text-3xl text-primary transition ease-out-back duration-500 sm:group-hover:-translate-x-2" />
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
                  <HiArrowSmRight className="sm:-mt-[1px] shrink-0 text-2xl sm:text-3xl text-primary transition ease-out-back duration-500 sm:group-hover:translate-x-2" />
                </a>
              </Link>
            ) : null}
          </span>
        </div>
      )}
    </div>
  )
}

export default PostLayout
