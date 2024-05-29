import { DigitType, SegmentID } from './types'

//
//     A
//  F     B
//     G
//  E     C
//     D
//
// More info: https://en.wikipedia.org/wiki/Seven-segment_display

const segmentsByValue = {
  [0]: ['a', 'b', 'c', 'd', 'e', 'f'],
  [1]: ['b', 'c'],
  [2]: ['a', 'b', 'g', 'e', 'd'],
  [3]: ['a', 'b', 'g', 'c', 'd'],
  [4]: ['f', 'g', 'b', 'c'],
  [5]: ['a', 'f', 'g', 'c', 'd'],
  [6]: ['a', 'f', 'g', 'c', 'd', 'e'],
  [7]: ['a', 'b', 'c'],
  [8]: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  [9]: ['a', 'b', 'c', 'd', 'f', 'g'],
}

export function isSegmentActive(segmentId: SegmentID, value: DigitType) {
  return segmentsByValue[value].includes(segmentId)
}
