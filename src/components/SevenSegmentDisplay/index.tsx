'use client'

import React, { useMemo } from 'react'
import SevenSegmentDisplayProvider from './Provider'
import Digit from './Digit'

export interface RetroHitCounterProps {
  value: number
  minLength?: number
  digitSize?: number
  digitSpacing?: number
  segmentThickness?: number
  segmentSpacing?: number
  segmentActiveColor?: string
  segmentInactiveColor?: string
  glow?: boolean
}

const RetroHitCounter: React.FC<RetroHitCounterProps> = props => {
  const {
    value,
    minLength = 4,
    digitSize = 40,
    digitSpacing = 6,
    segmentThickness = 4,
    segmentSpacing = 0.5,
    segmentActiveColor = '#76FF03',
    segmentInactiveColor = '#315324',
    glow = true,
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
      <div className="flex w-fit" style={{ gap: digitSpacing }}>
        {individualDigits.map((digit, idx) => (
          <Digit key={idx} value={Number(digit) as any} />
        ))}
      </div>
    </SevenSegmentDisplayProvider>
  )
}

export default RetroHitCounter
