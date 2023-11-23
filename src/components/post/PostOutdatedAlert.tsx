import React from 'react'
import useTranslation from '@/hooks/useTranslation'

export interface PostOutdatedAlertProps {
  days: number
}

const PostOutdatedAlert: React.FC<PostOutdatedAlertProps> = ({ days }) => {
  const { t } = useTranslation()

  return (
    <div
      className="relative flex justify-center items-center my-12 py-6 px-7 rounded-xl animate-[move-bg-y_linear_reverse_both] overflow-hidden"
      style={{
        background: `url('/outdated-bg.webp') center / cover`,
        animationTimeline: 'view()',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-10 dark:opacity-50"></div>
      <p className="relative sm:max-w-[90%] text-zinc-50 dark:opacity-75">
        {t('post-page.outdated-notice', { days })}
      </p>
    </div>
  )
}

export default PostOutdatedAlert
