import React from 'react'
import dynamic, { DynamicOptions } from 'next/dynamic'
import config from 'config'

export function withNoSSR<P = {}>(
  Component: React.ComponentType<P>,
  options = {} as Omit<DynamicOptions<P>, 'ssr'>,
) {
  return dynamic<P>(async () => Promise.resolve(Component), { ...options, ssr: false })
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function prettifyNumber(num: number, locale = config.language) {
  return new Intl.NumberFormat(Intl.getCanonicalLocales(locale), {
    notation: 'compact',
  }).format(num)
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function inRange(value: number, start: number, end: number) {
  return value >= start && value <= end
}
