import React, { useContext } from 'react'
import { SevenSegmentDisplayContext } from './Provider'
import { SegmentID } from './types'
import color from 'color'

export interface SegmentProps {
  segmentId: SegmentID
  isActive: boolean
}

const Segment: React.FC<SegmentProps> = props => {
  const { segmentId, isActive } = props
  const {
    digitSize,
    segmentThickness,
    segmentSpacing,
    segmentActiveColor,
    segmentInactiveColor,
    glow,
  } = useContext(SevenSegmentDisplayContext)
  const halfThickness = segmentThickness / 2
  const aspectRatio = 0.5 * (1 + segmentThickness / digitSize)
  const width = digitSize * aspectRatio - segmentThickness

  const segments = {
    a: {
      top: 0,
      left: halfThickness,
    },
    b: {
      top: halfThickness,
      left: width + segmentThickness,
      transform: 'rotate(90deg)',
      transformOrigin: 'top left',
    },
    c: {
      top: halfThickness + width,
      left: width + segmentThickness,
      transform: 'rotate(90deg)',
      transformOrigin: 'top left',
    },
    d: {
      bottom: 0,
      left: halfThickness,
    },
    e: {
      top: halfThickness + width,
      left: segmentThickness,
      transform: 'rotate(90deg)',
      transformOrigin: 'top left',
    },
    f: {
      top: halfThickness,
      left: segmentThickness,
      transform: 'rotate(90deg)',
      transformOrigin: 'top left',
    },
    g: {
      top: width,
      left: halfThickness,
    },
  }

  return (
    <svg
      className="absolute"
      style={{
        ...segments[segmentId],
        // prettier-ignore
        filter:
          isActive && glow
            ? `
                drop-shadow(0 0 ${segmentThickness * 1.5}px ${color(segmentActiveColor).fade(0.25).hexa()})
              `
            : 'none',
        zIndex: isActive ? 1 : 0,
      }}
      width={width}
      height={segmentThickness}
      viewBox={`0 0 ${width} ${segmentThickness}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={isActive ? segmentActiveColor : segmentInactiveColor}
        // prettier-ignore
        d={
          `
            M ${segmentSpacing} ${halfThickness}
            L ${halfThickness + segmentSpacing} 0
            L ${width - halfThickness - segmentSpacing} 0
            L ${width - segmentSpacing} ${halfThickness}
            L ${width - halfThickness - segmentSpacing} ${segmentThickness}
            L ${halfThickness + segmentSpacing} ${segmentThickness}
          `
        }
      />
    </svg>
  )
}

export default Segment
