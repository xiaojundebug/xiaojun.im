import React, { useMemo } from 'react'
import { getMDXExport } from 'mdx-bundler/client'
import NextLink from 'next/link'
import dayjs from 'dayjs'
import config from 'config'
import useTranslation from '@/hooks/useTranslation'
import HorizontalRule from '@/components/HorizontalRule'
import DesktopOnly from '@/components/DesktopOnly'
import { ArrowLeft, ArrowRight, Calender, Clock, Click } from '@/components/icons'
import BleedThroughImage, { BleedThroughImageProps } from '@/components/BleedThroughImage'
import PostViews from '@/components/post/PostViews'
import PostContent from '@/components/post/PostContent'
import PostAside from '@/components/post/PostAside'

export interface PostPageProps {
  slug: string
  code: string
  frontmatter: PostFrontmatter
  prevPost?: { link: string; title: string }
  nextPost?: { link: string; title: string }
  heroImageInfo?: BleedThroughImageProps
}

const PostPage: React.FC<PostPageProps> = props => {
  const { t } = useTranslation()
  const {
    slug,
    code,
    frontmatter: { title, date, updatedOn, tags, toc = config.toc, heroImage },
    prevPost,
    nextPost,
    heroImageInfo,
  } = props
  const { readingTime } = useMemo(
    () => getMDXExport<{ readingTime: PostReadingTime }, unknown>(code),
    [code],
  )

  return (
    <>
      <div className="prose-container relative flex mt-4 sm:mt-28 break-all">
        <main className="flex-1 w-0">
          {/* Hero Image */}
          {heroImage && heroImageInfo && (
            <div className="sm:-mx-8 mb-14">
              <BleedThroughImage {...heroImageInfo} />
            </div>
          )}

          <h1 className="mt-6 text-3xl sm:text-5xl text-black dark:text-white !leading-snug font-medium">
            {title}
          </h1>

          <div className="mt-4 text-zinc-400 dark:text-zinc-500">
            <div className="flex items-center text-sm">
              <span className="flex items-center">
                {/* Create time */}
                <>
                  <Calender className="mr-1 text-base" aria-hidden />
                  {dayjs(date).format('MMM D, YYYY')}
                </>
                <span className="mx-2">•</span>
                {/* Reading time */}
                <>
                  <Clock className="mr-1 text-base" aria-hidden />
                  {readingTime.text}
                </>
                {/* Views */}
                <span className="mx-2">•</span>
                <>
                  <Click className="mr-1 text-base" />
                  <PostViews slug={slug} />
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
                  className="bg-primary/[0.12] text-primary px-2.5 py-0.5 rounded-full font-medium"
                  href={`/tags/${tag}`}
                  prefetch={false}
                >
                  #{tag}
                </NextLink>
              ))}
            </div>
          )}

          {/* Markdown 内容 */}
          <article className="markdown-body w-full mt-10">
            <PostContent code={code} />
          </article>

          <p className="mt-24 mb-0 text-right text-zinc-500 text-sm italic">
            {t('post-page.last-updated', { date: dayjs(updatedOn || date).format('MMM D, YYYY') })}
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
        </main>

        <DesktopOnly>
          <PostAside slug={slug} toc={toc} />
        </DesktopOnly>
      </div>
    </>
  )
}

export default PostPage
