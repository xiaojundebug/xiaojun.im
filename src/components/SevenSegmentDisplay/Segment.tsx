import React, { useContext, useMemo } from 'react'
import { SevenSegmentDisplayContext } from './Provider'
import { SegmentID } from './types'

export interface SegmentProps {
  segmentId: SegmentID
  isActive: boolean
}

const Segment: React.FC<SegmentProps> = props => {
  const { segmentId, isActive } = props
  const { digitSize, segmentThickness, segmentSpacing, segmentActiveColor, segmentInactiveColor } =
    useContext(SevenSegmentDisplayContext)
  const halfThickness = segmentThickness / 2
  const width = digitSize * 0.5
  const height = digitSize

  const pathA = `
    M ${segmentSpacing} 0
    L ${width - segmentSpacing} 0
    L ${width - segmentThickness - segmentSpacing} ${segmentThickness}
    L ${segmentThickness + segmentSpacing} ${segmentThickness} Z
  `

  const pathB = `
    M ${width} ${segmentSpacing}
    L ${width} ${width - halfThickness - segmentSpacing}
    L ${width - halfThickness} ${width - segmentSpacing}
    L ${width - segmentThickness} ${width - halfThickness - segmentSpacing}
    L ${width - segmentThickness} ${segmentThickness + segmentSpacing} Z
  `

  const pathC = `
    M ${width - halfThickness} ${width + segmentSpacing}
    L ${width} ${width + halfThickness + segmentSpacing}
    L ${width} ${height - segmentSpacing}
    L ${width - segmentThickness} ${height - segmentThickness - segmentSpacing}
    L ${width - segmentThickness} ${width + halfThickness + segmentSpacing} Z
  `

  const pathD = `
    M ${segmentThickness + segmentSpacing} ${height - segmentThickness}
    L ${width - segmentThickness - segmentSpacing} ${height - segmentThickness}
    L ${width - segmentSpacing} ${height}
    L ${segmentSpacing} ${height} Z
  `

  const pathE = `
    M ${halfThickness} ${width + segmentSpacing}
    L ${segmentThickness} ${width + halfThickness + segmentSpacing}
    L ${segmentThickness} ${height - segmentThickness - segmentSpacing}
    L 0 ${height - segmentSpacing}
    L 0 ${width + halfThickness + segmentSpacing} Z
  `

  const pathF = `
    M 0 ${segmentSpacing}
    L ${segmentThickness} ${segmentThickness + segmentSpacing}
    L ${segmentThickness} ${width - halfThickness - segmentSpacing}
    L ${halfThickness} ${width - segmentSpacing}
    L 0 ${width - halfThickness - segmentSpacing} Z
  `

  const pathG = `
    M ${halfThickness + segmentSpacing} ${width}
    L ${segmentThickness + segmentSpacing} ${width - halfThickness}
    L ${width - segmentThickness - segmentSpacing} ${width - halfThickness}
    L ${width - halfThickness - segmentSpacing} ${width}
    L ${width - segmentThickness - segmentSpacing} ${width + halfThickness}
    L ${segmentThickness + segmentSpacing} ${width + halfThickness} Z
  `

  const d = { a: pathA, b: pathB, c: pathC, d: pathD, e: pathE, f: pathF, g: pathG }[segmentId]

  return <path fill={isActive ? segmentActiveColor : segmentInactiveColor} d={d} />
}

export default Segment
