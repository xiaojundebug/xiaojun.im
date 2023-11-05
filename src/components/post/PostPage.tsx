import React, { useMemo } from 'react'
import { getMDXExport } from 'mdx-bundler/client'
import NextLink from 'next/link'
import dayjs from 'dayjs'
import config from 'config'
import useTranslation from '@/hooks/useTranslation'
import HorizontalRule from '@/components/HorizontalRule'
import DesktopOnly from '@/components/DesktopOnly'
import { ArrowLeft, ArrowRight, Calender, Click, Clock } from '@/components/icons'
import { PostHitCounter, PostViews, PostViewsProvider } from './PostViews'
import BleedThroughImage, { BleedThroughImageProps } from '@/components/BleedThroughImage'
import PostContent from './PostContent'
import PostRightAside from './PostRightAside'

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
    () => getMDXExport(code) as { readingTime: PostReadingTime },
    [code],
  )
  const diffDays = useMemo(() => dayjs().diff(updatedOn || date, 'day'), [updatedOn, date])

  return (
    <>
      <PostViewsProvider slug={slug}>
        <div className="prose-container relative flex mt-4 sm:mt-28">
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
                    <PostViews />
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

            {/* 旧文章提醒 */}
            {diffDays >= config.outdatedPostThresholdDays && (
              <div className="relative flex justify-center items-center my-12 py-6 px-7 rounded-xl bg-amber-100 dark:bg-zinc-900 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-around text-7xl sm:text-9xl opacity-5 pointer-events-none">
                  <span className="relative -rotate-45">👻</span>
                  <span className="relative top-6 rotate-45">🤖</span>
                  <span className="relative -top-6 -rotate-12">🎃</span>
                </div>
                <p className="relative text-center bg-gradient-to-r from-indigo-500 to-amber-500 bg-clip-text text-transparent">
                  {t('post-page.outdated-notice', { days: diffDays })}
                </p>
              </div>
            )}

            {/* Markdown 内容 */}
            <article className="markdown-body w-full mt-10">
              <PostContent code={code} />
            </article>

            {/* 阅读计数器 & 最后修改时间 */}
            <div className="flex justify-between mt-24">
              <div className="flex flex-col items-start gap-1">
                <h3 className="text-[13px] font-bold text-zinc-400 dark:text-zinc-500">
                  {t('post-page.hits')}
                </h3>
                <PostHitCounter />
              </div>
              <div className="flex flex-col items-end gap-1">
                <h3 className="text-[13px] font-bold text-zinc-400 dark:text-zinc-500">
                  {t('post-page.last-updated')}
                </h3>
                <span className="font-medium text-lg">
                  {dayjs(updatedOn || date).format('MMM D, YYYY')}
                </span>
              </div>
            </div>

            <HorizontalRule />

            {config.adjacentPosts && (
              <div className="my-16 flex justify-between space-x-6 sm:space-x-12 sm:text-lg font-medium">
                {/* 上一篇 */}
                <span className="w-1/2">
                  {prevPost ? (
                    <NextLink
                      className="group flex h-full border border-zinc-400/20 rounded-xl p-3 sm:p-5 transition gap-2"
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
                      className="group flex justify-end h-full border border-zinc-400/20 rounded-xl p-3 sm:p-5 transition gap-2"
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
            <PostRightAside slug={slug} toc={toc} />
          </DesktopOnly>
        </div>
      </PostViewsProvider>
    </>
  )
}

export default PostPage
