import React, { useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { useTheme } from 'next-themes'

const config = { mass: 3, tension: 200, friction: 30 }

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme = 'light', setTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark'

  const starStyles = useSpring({
    scale: isDarkMode ? 1 : 0.9,
    opacity: isDarkMode ? 1 : 0,
    x: isDarkMode ? 0 : 5,
    config,
  })

  const cloudStyles = useSpring({
    scale: isDarkMode ? 0.9 : 1,
    opacity: isDarkMode ? 0 : 1,
    x: isDarkMode ? -5 : 0,
    config,
  })

  const nodeStyles = useSpring({
    x: isDarkMode ? 28 : 0,
    rotate: isDarkMode ? 0 : 180,
    backgroundColor: isDarkMode ? '#c6d0d1' : '#fde047',
    config,
  })

  const containerStyles = useSpring({
    backgroundColor: isDarkMode ? '#475569' : '#7dd3fc',
    outlineColor: isDarkMode ? '#6c798c' : '#64abcc',
    config,
  })

  const craterStyles = useSpring({
    opacity: isDarkMode ? 1 : 0,
    config,
  })

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // prettier-ignore
  const starts = (
    <animated.svg style={starStyles} className="absolute left-[7px] top-[7px]" width="16" height="14" viewBox="0 0 89 77" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 10L31.7523 28.2477L50 35L31.7523 41.7523L25 60L18.2477 41.7523L0 35L18.2477 28.2477L25 10Z" fill="#C6D0D1"/>
      <path d="M71.5 42L76.2266 54.7734L89 59.5L76.2266 64.2266L71.5 77L66.7734 64.2266L54 59.5L66.7734 54.7734L71.5 42Z" fill="#C6D0D1"/>
      <path d="M61 0L63.7009 7.29909L71 10L63.7009 12.7009L61 20L58.2991 12.7009L51 10L58.2991 7.29909L61 0Z" fill="#C6D0D1"/>
    </animated.svg>
  )

  // prettier-ignore
  const clouds = (
    <animated.svg style={cloudStyles} className="absolute right-[10px] top-[10px]" width="16" height="8" viewBox="0 0 104 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.0258 10.7296C18.0258 4.80381 22.8296 0 28.7554 0H93.1331C99.0589 0 103.863 4.80381 103.863 10.7296C103.863 16.6554 99.0589 21.4592 93.1331 21.4592H60.9442V28.5408H75.1073C81.0331 28.5408 85.8369 33.3446 85.8369 39.2704C85.8369 45.1962 81.0331 50 75.1073 50H10.7296C4.80381 50 0 45.1962 0 39.2704C0 33.3446 4.80381 28.5408 10.7296 28.5408H50.2146V21.4592H28.7554C22.8296 21.4592 18.0258 16.6554 18.0258 10.7296Z" fill="white"/>
    </animated.svg>
  )

  return (
    <animated.div
      style={containerStyles}
      className="relative w-[56px] h-[28px] rounded-full p-[5px] cursor-pointer"
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
    >
      {starts}
      {clouds}
      <animated.div style={nodeStyles} className="relative w-[18px] h-[18px] rounded-full z-10">
        <animated.div style={craterStyles} className="relative w-full h-full">
          <div className="absolute top-[6px] left-[4px] w-[4px] h-[4px] rounded-full bg-slate-400/50 shadow-inner"></div>
          <div className="absolute top-[8px] left-[11px] w-[1px] h-[1px] rounded-full bg-slate-400/50 shadow-inner"></div>
          <div className="absolute top-[11px] left-[9px] w-[2px] h-[2px] rounded-full bg-slate-400/50 shadow-inner"></div>
        </animated.div>
      </animated.div>
    </animated.div>
  )
}

export default DarkModeToggle
