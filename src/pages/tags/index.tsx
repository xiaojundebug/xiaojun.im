import React, {useMemo} from 'react'
import { GetStaticProps, NextPage } from 'next'
import { getLatestPosts } from '@/utils/post'
import Link from 'next/link'
import { animated, useSpring, useTransition } from 'react-spring'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { AiOutlineTags } from 'react-icons/ai'

const AnimatedAiOutlineTags = animated(AiOutlineTags)

interface TagsInfo {
  tagName: string
  postsNum: number
}

export interface TagsProps {
  tags: TagsInfo[]
}

const Tags: NextPage<TagsProps> = props => {
  const { tags } = props
  const { t } = useTranslation('common')
  const transitions = useTransition(tags, {
    from: { scale: 0.5, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    leave: { scale: 0.5, opacity: 0 },
    trail: 20,
    reset: true,
  })

  const iconStyles = useSpring({
    from: { rotate: -90 },
    to: { rotate: 0 },
    config: { mass: 3, tension: 300, friction: 15 },
  })

  const totalNum = useMemo(() => tags.reduce((acc, cur) => acc + cur.postsNum, 0), [tags])

  return (
    <div className="container flex flex-col items-center justify-center">
      <h2 className="relative font-medium font-serif text-5xl mt-20 sm:mt-40">
        {t('tags-page.title')}{' '}
        <AnimatedAiOutlineTags
          className="inline-block origin-[30px_13.5px]"
          style={{ ...iconStyles, transformBox: 'fill-box' }}
          aria-hidden
        />
      </h2>
      <p className="font-medium text-sm m-10 sm:m-14">
        {t('tags-page.desc', { count: tags.length })}
      </p>
      <div className="flex items-center justify-center flex-wrap gap-7">
        {transitions((navStyles, { tagName, postsNum }) => (
          <animated.div key={tagName} style={navStyles}>
            <Link href={`/tags/${tagName}`}>
              <a
                className="border-b border-solid border-current transition hover:!opacity-100 hover:text-primary"
                style={{
                  // 该 tag 文章数占总数 20% 时字体达到最大
                  fontSize: Math.min(12 + (postsNum / totalNum) * 180, 48),
                  // 该 tag 文章数占总数 15% 时字体颜色达到最深
                  opacity: Math.min(0.1 + (postsNum / totalNum) * 6, 1),
                }}
              >
                {tagName}
              </a>
            </Link>
          </animated.div>
        ))}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<any, { slug: string }> = async ({ locale }) => {
  const posts = await getLatestPosts({ orderBy: 'asc' })
  const tags: Record<string, TagsInfo> = {}

  for (const post of posts) {
    for (const tag of post.frontmatter.tags || []) {
      if (!tags[tag]) tags[tag] = { tagName: tag, postsNum: 0 }
      tags[tag].postsNum++
    }
  }

  return {
    props: {
      tags: Object.values(tags),
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

export default Tags
