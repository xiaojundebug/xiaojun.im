'use client'

import React, { useContext, useMemo, useState } from 'react'
import Spinner from '@/components/Spinner'
import SevenSegmentDisplay from '@/components/SevenSegmentDisplay'
import { useTheme } from 'next-themes'
import { PostViewsContext } from './Provider'
import useSound from '@/hooks/useSound'
import useBoolean from '@/hooks/useBoolean'

const neonColors = [
  { background: '#0c0c0c', activeColor: '#ff5e00', inactiveColor: '#161616' },
  { background: '#0c0c0c', activeColor: '#fff', inactiveColor: '#161616' },
  { background: '#0c0c0c', activeColor: '#ccff00', inactiveColor: '#161616' },
  { background: '#0c0c0c', activeColor: '#0ff0fc', inactiveColor: '#161616' },
  { background: '#0c0c0c', activeColor: '#ff1493', inactiveColor: '#161616' },
]

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

  if (isLoading) return <Spinner />

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
        minLength={4}
        digitSize={18}
        digitSpacing={4}
        segmentThickness={2}
        segmentSpacing={0.5}
        segmentActiveColor={colorPattern.activeColor}
        segmentInactiveColor={colorPattern.inactiveColor}
        backgroundColor={colorPattern.background}
        glow={isDarkMode}
        overexposureSimulation={isDarkMode}
        flicker={isDarkMode}
        padding={'10px 14px'}
      />
      {isDarkMode && (
        <div
          className="absolute inset-0 z-10 active:backdrop-brightness-50 transition"
          style={{
            backgroundImage: 'url(/hit-counter-glass-bg.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: `
              0 0 1px rgba(255, 255, 255, 0.1) inset,
              0 1px 1px rgba(255, 255, 255, 0.1) inset
            `,
          }}
        >
          <img
            className="absolute left-0.5 top-0.5 rotate-45"
            src="/hit-counter-glass-screw.svg"
            alt="screw"
          />
          <img
            className="absolute left-0.5 bottom-0.5 -rotate-45"
            src="/hit-counter-glass-screw.svg"
            alt="screw"
          />
          <img
            className="absolute right-0.5 top-0.5 -rotate-45"
            src="/hit-counter-glass-screw.svg"
            alt="screw"
          />
          <img
            className="absolute right-0.5 bottom-0.5 rotate-45"
            src="/hit-counter-glass-screw.svg"
            alt="screw"
          />
        </div>
      )}
    </button>
  )
}

export default HitCounter
