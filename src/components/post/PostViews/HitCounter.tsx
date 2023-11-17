'use client'

import React, { useContext, useMemo, useState } from 'react'
import Spinner from '@/components/Spinner'
import SevenSegmentDisplay from '@/components/SevenSegmentDisplay'
import { useTheme } from 'next-themes'
import { PostViewsContext } from './Provider'
import useSound from '@/hooks/useSound'
import useBoolean from '@/hooks/useBoolean'
import clsx from 'clsx'
import color from 'color'

const neonColors = [
  { background: '#0c0c0c', activeColor: '#ff5e00', inactiveColor: '#161616' },
  { background: '#0c0c0c', activeColor: '#ffffff', inactiveColor: '#161616' },
  { background: '#0c0c0c', activeColor: '#6cb71b', inactiveColor: '#161616' },
  { background: '#0c0c0c', activeColor: '#7556ff', inactiveColor: '#161616' },
  { background: '#0c0c0c', activeColor: '#568cff', inactiveColor: '#161616' },
  { background: '#0c0c0c', activeColor: '#ff5656', inactiveColor: '#161616' },
]

const Screw: React.FC<{ className?: string }> = props => {
  const { className } = props

  return (
    <div
      className={clsx(className, 'w-[5px] h-[5px] rounded-full ring-1 ring-zinc-800')}
      style={{
        background: `conic-gradient(#333, #666, #333, #666, #333)`,
      }}
    ></div>
  )
}

const HitCounter = () => {
  const { views, isLoading } = useContext(PostViewsContext)
  const { resolvedTheme, forcedTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark' || forcedTheme === 'dark'
  const [playSound] = useSound('/sounds/02.mp3')
  const [isToggled, { toggle }] = useBoolean(false)
  const [neonColorIdx, setNeonColorIdx] = useState(0)

  const colorPattern = useMemo(() => {
    if (isDarkMode) {
      return neonColors[neonColorIdx % neonColors.length]
    }
    if (isToggled) {
      return {
        background: '#ccc75f',
        activeColor: '#5a571c',
        inactiveColor: '#c4bf48',
      }
    }
    return {
      background: '#eff1f5',
      activeColor: '#adb0b8',
      inactiveColor: '#eff1f5',
    }
  }, [isDarkMode, isToggled, neonColorIdx])

  if (isLoading)
    return (
      <div className="h-[38px]">
        <Spinner />
      </div>
    )

  return (
    <button
      className="relative"
      aria-label={`Retro-style hit counter, showing that ${views} people have visited this page.`}
      onClick={() => {
        if (!isDarkMode) {
          toggle()
        } else {
          setNeonColorIdx(neonColorIdx + 1)
        }
      }}
      onMouseDown={() => playSound({ playbackRate: 0.6 })}
      onMouseUp={() => playSound({ playbackRate: 0.8 })}
    >
      <SevenSegmentDisplay
        value={views}
        minLength={6}
        digitSize={18}
        digitSpacing={4}
        segmentThickness={2}
        segmentSpacing={0.5}
        segmentActiveColor={colorPattern.activeColor}
        segmentInactiveColor={colorPattern.inactiveColor}
        backgroundColor={colorPattern.background}
        padding={'10px 14px'}
        glow
      />
      <div
        className={clsx('absolute inset-0 z-10', {
          'motion-safe:animate-[backdrop-flicker_0.1s_linear_4_alternate]': isDarkMode,
          'active:backdrop-blur-[1px] active:backdrop-brightness-0 transition': isDarkMode,
        })}
      ></div>
      {/* 使中心看起来更亮 */}
      {isDarkMode && (
        <div
          className="absolute inset-0 z-10 mix-blend-overlay pointer-events-none"
          style={{
            // 通过 luminosity 获取颜色相对亮度，如果一个颜色很亮，我们则减少亮度增益
            background: `radial-gradient(rgba(255, 255, 255, ${
              1 - color(colorPattern.activeColor).luminosity()
            }), transparent 50%)`,
          }}
        ></div>
      )}
      {/* Glass cover */}
      <div
        className={clsx('absolute inset-0 z-10 pointer-events-none', {
          // backdrop-blur + backdrop-brightness 可以使它看起来更接近真实灯光（每个片段的中心更亮，外侧更深），
          // 同时配合上边的中心高亮效果，看起来更更更真实
          'backdrop-blur-[0.25px] backdrop-brightness-150': isDarkMode,
        })}
        style={{
          backgroundImage: 'url(/hit-counter-glass-cover.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: `
            0 0 1px rgba(255, 255, 255, 0.1) inset,
            0 1px 1px rgba(255, 255, 255, 0.1) inset
          `,
        }}
      >
        {/* 4 颗小螺丝儿 */}
        {isDarkMode && (
          <>
            <Screw className="absolute left-1 top-1 -rotate-45" />
            <Screw className="absolute left-1 bottom-1 rotate-45" />
            <Screw className="absolute right-1 top-1 rotate-45" />
            <Screw className="absolute right-1 bottom-1 -rotate-45" />
          </>
        )}
      </div>
    </button>
  )
}

export default HitCounter
