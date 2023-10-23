'use client'

import React, { useMemo } from 'react'
import SevenSegmentDisplayProvider from './Provider'
import Digit from './Digit'
import clsx from 'clsx'

export interface RetroHitCounterProps {
  value: number
  minLength?: number
  digitSize?: number
  digitSpacing?: number
  segmentThickness?: number
  segmentSpacing?: number
  segmentActiveColor?: string
  segmentInactiveColor?: string
  backgroundColor?: string
  padding?: number | string
  glow?: boolean // 微光效果
  overexposureSimulation?: boolean // 模拟灯光过曝效果
  flicker?: boolean // 呼吸灯效果
}

const RetroHitCounter: React.FC<RetroHitCounterProps> = props => {
  const {
    value,
    minLength = 4,
    digitSize = 40,
    digitSpacing = digitSize / 4,
    segmentThickness = digitSize / 8,
    segmentSpacing = segmentThickness / 4,
    segmentActiveColor = '#adb0b8',
    segmentInactiveColor = '#eff1f5',
    backgroundColor = '#eff1f5',
    padding = digitSize / 4,
    glow = false,
    overexposureSimulation = false,
    flicker = false,
  } = props

  const paddedValue = useMemo(() => value.toString().padStart(minLength, '0'), [value, minLength])
  const individualDigits = useMemo(() => paddedValue.split(''), [paddedValue])

  return (
    <SevenSegmentDisplayProvider
      digitSize={digitSize}
      segmentThickness={segmentThickness}
      segmentSpacing={segmentSpacing}
      segmentActiveColor={segmentActiveColor}
      segmentInactiveColor={segmentInactiveColor}
      glow={glow}
    >
      <div
        className={clsx('flex items-center justify-between w-fit', {
          'motion-safe:animate-[flicker_0.1s_linear_4_alternate]': flicker,
        })}
        style={{ padding, backgroundColor, gap: digitSpacing }}
      >
        {individualDigits.map((digit, idx) => (
          <Digit key={idx} value={Number(digit) as Digit} />
        ))}
      </div>
      {overexposureSimulation && (
        <div className="absolute inset-0 z-10 backdrop-blur-[0.25px] backdrop-brightness-150 pointer-events-none"></div>
      )}
    </SevenSegmentDisplayProvider>
  )
}

export default RetroHitCounter
