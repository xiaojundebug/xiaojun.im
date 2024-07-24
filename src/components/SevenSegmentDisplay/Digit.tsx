import React, { useContext, useMemo } from 'react'
import { DigitType, SegmentID } from './types'
import Segment from './Segment'
import { isSegmentActive } from './utils'
import { SevenSegmentDisplayContext } from './Provider'
import color from 'color'

const segments: SegmentID[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

export interface DigitProps {
  value: DigitType
}

const Digit: React.FC<DigitProps> = props => {
  const { value } = props
  const { digitSize, segmentThickness, segmentActiveColor, glow } = useContext(
    SevenSegmentDisplayContext,
  )
  const width = digitSize * 0.5
  const height = digitSize
  const activeSegments = useMemo(
    () => segments.filter(seg => isSegmentActive(seg, value)),
    [value],
  )
  const inactiveSegments = useMemo(
    () => segments.filter(seg => !isSegmentActive(seg, value)),
    [value],
  )

  return (
    <div className="relative" style={{ width, height }}>
      {/* 未点亮的 */}
      <svg
        className="absolute"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {inactiveSegments.map(seg => (
          <Segment key={seg} segmentId={seg} isActive={false} />
        ))}
      </svg>
      {/* 点亮的 */}
      <svg
        className="relative"
        style={{
          filter: glow
            ? `drop-shadow(0 0 ${segmentThickness * 1.5}px ${color(segmentActiveColor)
                .fade(0.25)
                .hexa()})`
            : 'none',
        }}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {activeSegments.map(seg => (
          <Segment key={seg} segmentId={seg} isActive />
        ))}
      </svg>
    </div>
  )
}

export default Digit
