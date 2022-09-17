import React, { useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { useTheme } from 'next-themes'

const config = { mass: 3, tension: 200, friction: 30 }

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme = 'light', setTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark'

  const moonStyles = useSpring({
    scale: isDarkMode ? 1 : 0.8,
    opacity: isDarkMode ? 1 : 0,
    x: isDarkMode ? 0 : 5,
    config,
  })

  const sunStyles = useSpring({
    scale: isDarkMode ? 0.8 : 1,
    opacity: isDarkMode ? 0 : 1,
    x: isDarkMode ? -5 : 0,
    config,
  })

  const nodeStyles = useSpring({
    x: isDarkMode ? 28 : 0,
    config,
  })

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // prettier-ignore
  const moon = (
    <animated.svg style={moonStyles} className="absolute left-[7px] top-[7px]" width="14" height="14" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M74.0585 0.200317C78.586 -1.09932 82.062 4.18208 80.2049 8.61636C72.266 27.5725 72.7852 49.8489 83.5184 68.9147C101.724 101.253 142.42 112.11 174.416 93.165C180.042 89.8335 185.025 85.8022 189.317 81.2444C192.558 77.8032 198.567 79.0309 199.174 83.7859C204.24 123.491 185.801 164.494 149.445 186.021C101.451 214.439 40.4068 198.153 13.0992 149.646C-14.2085 101.138 2.56117 38.7782 50.5552 10.3605C58.1261 5.87768 66.0217 2.5073 74.0585 0.200317Z" fill="#FBCC24"/>
    </animated.svg>
  )

  // prettier-ignore
  const sun = (
    <animated.svg style={sunStyles} className="absolute right-[6px] top-[6px]" width="16" height="16" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100.5" cy="100.5" r="55.5" fill="#FBCC24"/>
      <path d="M93 5.6C93 2.50721 96.134 0 100 0C103.866 0 107 2.50721 107 5.6V22.4C107 25.4928 103.866 28 100 28C96.134 28 93 25.4928 93 22.4V5.6Z" fill="#FBCC24"/>
      <path d="M162.037 28.5351C164.224 26.3481 168.107 26.6858 170.711 29.2893C173.314 31.8928 173.652 35.7762 171.465 37.9632L159.586 49.8426C157.399 52.0295 153.515 51.6918 150.912 49.0883C148.308 46.4848 147.971 42.6014 150.157 40.4145L162.037 28.5351Z" fill="#FBCC24"/>
      <path d="M194.4 93C197.493 93 200 96.134 200 100C200 103.866 197.493 107 194.4 107H177.6C174.507 107 172 103.866 172 100C172 96.134 174.507 93 177.6 93H194.4Z" fill="#FBCC24"/>
      <path d="M171.465 162.037C173.652 164.224 173.314 168.107 170.711 170.711C168.107 173.314 164.224 173.652 162.037 171.465L150.157 159.586C147.971 157.399 148.308 153.515 150.912 150.912C153.515 148.308 157.399 147.971 159.586 150.157L171.465 162.037Z" fill="#FBCC24"/>
      <path d="M107 194.4C107 197.493 103.866 200 100 200C96.134 200 93 197.493 93 194.4V177.6C93 174.507 96.134 172 100 172C103.866 172 107 174.507 107 177.6V194.4Z" fill="#FBCC24"/>
      <path d="M37.9632 171.465C35.7762 173.652 31.8928 173.314 29.2893 170.711C26.6858 168.107 26.3481 164.224 28.5351 162.037L40.4145 150.157C42.6014 147.971 46.4848 148.308 49.0883 150.912C51.6918 153.515 52.0295 157.399 49.8426 159.586L37.9632 171.465Z" fill="#FBCC24"/>
      <path d="M5.6 107C2.50721 107 0 103.866 0 100C0 96.134 2.50721 93 5.6 93H22.4C25.4928 93 28 96.134 28 100C28 103.866 25.4928 107 22.4 107H5.6Z" fill="#FBCC24"/>
      <path d="M28.5351 37.9632C26.3481 35.7762 26.6858 31.8928 29.2893 29.2893C31.8928 26.6858 35.7762 26.3481 37.9632 28.5351L49.8426 40.4145C52.0295 42.6014 51.6918 46.4848 49.0883 49.0883C46.4848 51.6918 42.6014 52.0295 40.4145 49.8426L28.5351 37.9632Z" fill="#FBCC24"/>
    </animated.svg>
  )

  return (
    <div
      className="relative w-[56px] h-[28px] rounded-full bg-zinc-600/80 p-[5px] cursor-pointer"
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
    >
      {moon}
      {sun}
      <animated.div
        style={nodeStyles}
        className="relative w-[18px] h-[18px] rounded-full bg-white shadow z-10"
      ></animated.div>
    </div>
  )
}

export default DarkModeToggle
