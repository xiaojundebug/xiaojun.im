import React, { useContext, useMemo } from 'react'
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
  const width = digitSize * 0.5

  const segments = {
    a: {
      top: 0,
      left: 0,
    },
    b: {
      top: 0,
      left: width,
      transform: 'rotate(90deg)',
      transformOrigin: 'top left',
    },
    c: {
      top: width * 2,
      left: width,
      transform: 'rotate(270deg) scaleY(-1)',
      transformOrigin: 'top left',
    },
    d: {
      top: width * 2,
      left: width,
      transform: 'rotate(180deg)',
      transformOrigin: 'top left',
    },
    e: {
      top: width * 2,
      left: 0,
      transform: 'rotate(270deg)',
      transformOrigin: 'top left',
    },
    f: {
      top: 0,
      left: 0,
      transform: 'rotate(90deg) scaleY(-1)',
      transformOrigin: 'top left',
    },
    g: {
      top: width - halfThickness,
      left: 0,
    },
  }

  // a, d
  const path_ad = `
    M ${segmentSpacing} ${0}
    L ${width - segmentSpacing} 0
    L ${width - segmentThickness - segmentSpacing} ${segmentThickness}
    L ${segmentThickness + segmentSpacing} ${segmentThickness} Z
  `

  // b, c, e, f
  const path_bcef = `
    M ${segmentSpacing} ${0}
    L ${width - halfThickness - segmentSpacing} 0
    L ${width - segmentSpacing} ${halfThickness}
    L ${width - halfThickness - segmentSpacing} ${segmentThickness}
    L ${segmentThickness + segmentSpacing} ${segmentThickness} Z
  `

  // g
  const path_g = `
    M ${halfThickness + segmentSpacing} ${halfThickness}
    L ${segmentThickness + segmentSpacing} 0
    L ${width - segmentThickness - segmentSpacing} 0
    L ${width - halfThickness - segmentSpacing} ${halfThickness}
    L ${width - segmentThickness - segmentSpacing} ${segmentThickness}
    L ${segmentThickness + segmentSpacing} ${segmentThickness} Z
  `

  const d = useMemo(
    () => ({ a: path_ad, b: path_bcef, c: path_bcef, d: path_ad, e: path_bcef, f: path_bcef, g: path_g }[segmentId]),
    [path_ad, path_bcef, path_g, segmentId],
  )

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
        d={d}
      />
    </svg>
  )
}

export default Segment
