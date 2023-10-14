'use client'

import React, { useContext, useMemo, useState } from 'react'
import Spinner from '@/components/Spinner'
import SevenSegmentDisplay from '@/components/SevenSegmentDisplay'
import { useTheme } from 'next-themes'
import { PostViewsContext } from './Provider'
import useSound from '@/hooks/useSound'

const HitCounter = () => {
  const { views, isLoading } = useContext(PostViewsContext)
  const [isToggled, setIsToggled] = useState(false)
  const { resolvedTheme, forcedTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark' || forcedTheme === 'dark'
  const [playSound] = useSound('/sounds/02.mp3')

  const colorPattern = useMemo(() => {
    if (isDarkMode) {
      return {
        background: '#18181b',
        activeColor: '#f97316',
        inactiveColor: '#111',
      }
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
  }, [isDarkMode, isToggled])

  if (isLoading) return <Spinner />

  return (
    <button
      className="p-1.5 dark:border dark:border-zinc-800"
      style={{ background: colorPattern.background }}
      aria-label={`Retro-style hit counter, showing that ${views} people have visited this page.`}
      onClick={() => {
        if (!isDarkMode) {
          setIsToggled(!isToggled)
        }
      }}
      onMouseDown={() => playSound({ playbackRate: 0.6 })}
      onMouseUp={() => playSound({ playbackRate: 0.8 })}
    >
      <SevenSegmentDisplay
        value={views}
        minLength={4}
        digitSize={22}
        digitSpacing={4}
        segmentThickness={2}
        segmentSpacing={0.5}
        segmentActiveColor={colorPattern.activeColor}
        segmentInactiveColor={colorPattern.inactiveColor}
      />
    </button>
  )
}

export default HitCounter
