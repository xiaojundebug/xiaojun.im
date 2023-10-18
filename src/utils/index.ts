import React from 'react'
import dynamic, { DynamicOptions } from 'next/dynamic'
import config from 'config'

export const isObject = (value: unknown): value is Record<any, any> =>
  value !== null && typeof value === 'object'
export const isFunction = (value: unknown): value is (...args: any) => any =>
  typeof value === 'function'
export const isString = (value: unknown): value is string => typeof value === 'string'
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'
export const isNumber = (value: unknown): value is number => typeof value === 'number'
export const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined'

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function inRange(value: number, start: number, end: number) {
  return value >= start && value <= end
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function withNoSSR<P = {}>(
  Component: React.ComponentType<P>,
  options = {} as Omit<DynamicOptions<P>, 'ssr'>,
) {
  return dynamic<P>(async () => Promise.resolve(Component), { ...options, ssr: false })
}

export function prettifyNumber(num: number, locale = config.language) {
  return new Intl.NumberFormat(Intl.getCanonicalLocales(locale), {
    notation: 'compact',
  }).format(num)
}
