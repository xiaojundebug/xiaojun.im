import React from 'react'
import clsx from 'clsx'
import { animated, useTransition } from '@react-spring/web'
import { Copy } from '@/components/icons'
import useTranslation from '@/hooks/useTranslation'
import useHasMounted from '@/hooks/useHasMounted'

export interface CopyButtonProps {
  copied: boolean
  onCopy: () => void
}

const CopyButton: React.FC<CopyButtonProps> = props => {
  const { copied, onCopy } = props
  const { t } = useTranslation()
  const hasMounted = useHasMounted()

  const transitions = useTransition(copied, {
    from: { opacity: 0, y: -6 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -6 },
    config: { tension: 300, friction: 30 },
    immediate: !hasMounted,
  })

  return (
    <button
      className={clsx(
        'group/clipboard w-[70px] h-[28px] rounded-full overflow-hidden backdrop-blur bg-slate-500/10 dark:bg-white/5 cursor-pointer',
        {
          'border border-green-500/50 !bg-green-500/10': copied,
        },
      )}
      onClick={onCopy}
      aria-label="copy"
    >
      {transitions((style, item) =>
        !item ? (
          <animated.div
            className="absolute inset-0 -left-[1px] flex items-center justify-center gap-0.5 text-slate-400
              group-hover/clipboard:text-slate-500
              dark:text-zinc-400
              dark:group-hover/clipboard:text-zinc-300"
            style={style}
          >
            <Copy
              className="text-base opacity-70 group-hover/clipboard:opacity-100 transition"
              aria-hidden
            />
            <span className="text-xs transition-colors">{t('code.copy')}</span>
          </animated.div>
        ) : (
          <animated.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: style.opacity,
              transform: style.y.to(v => `translate(0px, ${-v}px)`),
            }}
          >
            <span className="text-xs text-green-500">{t('code.copied')}</span>
          </animated.div>
        ),
      )}
    </button>
  )
}

export default CopyButton
