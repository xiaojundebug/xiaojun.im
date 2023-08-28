'use client'

import React from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  return <NextThemeProvider {...props} />
}

export default ThemeProvider
