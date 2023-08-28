'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import config from 'config'
import { usePathname } from 'next/navigation'
import { useSize } from 'ahooks'
import useBoolean from '@/hooks/useBoolean'
import useHasMounted from '@/hooks/useHasMounted'
import useTranslation from '@/hooks/useTranslation'
import { animated, to, useSpring, useTransition } from '@react-spring/web'
import Link from 'next/link'
import DarkModeToggle from './DarkModeToggle'
import BurgerMenu from '@/components/BurgerMenu'
import MobileOnly from '@/components/MobileOnly'
import DesktopOnly from '@/components/DesktopOnly'
import clsx from 'clsx'
import {
  animationFrameScheduler,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  pairwise,
  share,
  throttleTime,
  withLatestFrom,
} from 'rxjs'
import useSpotlight from '@/hooks/useSpotlight'

export interface HeaderProps {}

const MobileHeader: React.FC<{
  menus: { label: string; href: string }[]
  expanded: boolean
  onBurgerMenuClick: () => void
}> = props => {
  const { menus, expanded, onBurgerMenuClick } = props
  const navRef = useRef<HTMLUListElement>(null)
  const size = useSize(navRef.current) || { width: 0, height: 0 }
  const styles = useSpring({
    height: expanded ? size.height : 0,
    config: { tension: 256, friction: 28, precision: 0.005 },
  })
  const navTransitions = useTransition(expanded ? menus : [], {
    from: { x: 50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 0, opacity: 1 },
    trail: 100,
  })

  return (
    <div className="px-6 flex items-center justify-between h-[50px] bg-white dark:bg-zinc-950">
      <BurgerMenu isOpen={expanded} onChange={onBurgerMenuClick} />
      <DarkModeToggle />
      <animated.nav
        className="absolute left-0 right-0 top-[50px] bg-white dark:bg-zinc-950 z-30 border-b border-zinc-400/10 overflow-hidden"
        style={styles}
      >
        <ul ref={navRef} className="flex flex-col pb-4">
          {navTransitions((navStyles, menu) => (
            <animated.li key={menu.href} style={navStyles}>
              <Link
                className="inline-block w-full font-medium text-lg px-6 py-1 leading-loose active:bg-zinc-400/10"
                href={menu.href}
              >
                <span>{menu.label}</span>
              </Link>
            </animated.li>
          ))}
        </ul>
      </animated.nav>
    </div>
  )
}

const DesktopHeader: React.FC<{ menus: { label: string; href: string }[] }> = props => {
  const { menus } = props
  const pathname = usePathname()
  const [{ x: spotX, y: spotY, r: spotR }, onMouseMove] = useSpotlight()

  return (
    <div className="prose-container flex items-center justify-between h-[80px]">
      <Link href="/">
        <img
          className="inline-block w-8 mr-4 cursor-pointer dark:invert"
          src={config.logo}
          alt="logo"
        />
      </Link>
      <nav>
        <ul
          className="group flex items-center px-3 ring-1 ring-zinc-900/5 dark:ring-zinc-100/10 rounded-full bg-gradient-to-b from-zinc-50/70 to-white/70 dark:from-zinc-900/70 dark:to-zinc-800/70 backdrop-blur backdrop-saturate-200 shadow-lg shadow-zinc-800/5"
          onMouseMove={onMouseMove}
        >
          {/* Spotlight overlay */}
          <animated.div
            className="pointer-events-none absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-primary/[0.12]"
            style={{
              background: to(
                [spotX, spotY, spotR],
                (x, y, r) =>
                  `radial-gradient(${r}px circle at ${x}px ${y}px, currentColor 0%, transparent 65%)`,
              ),
            }}
            aria-hidden
          ></animated.div>
          {menus.map(menu => (
            <li key={menu.href}>
              <Link
                className={clsx(
                  'relative block py-2 px-3 font-medium text-sm hover:text-primary transition-colors',
                  {
                    'text-primary': pathname === menu.href,
                  },
                )}
                href={menu.href}
              >
                {menu.label}
                <span
                  className={clsx(
                    'absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/40 dark:via-primary/60 to-primary/0 transition-opacity',
                    { 'opacity-0': pathname !== menu.href },
                    { 'opacity-100': pathname === menu.href },
                  )}
                ></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <DarkModeToggle />
    </div>
  )
}

const Header: React.FC<HeaderProps> = () => {
  const [visible, { set: setVisible }] = useBoolean(true)
  const [isExpanded, { toggle: toggleIsExpanded, set: setIsExpanded }] = useBoolean(false)
  const { t } = useTranslation()
  const pathname = usePathname()
  const hasMounted = useHasMounted()
  const menus = useMemo(
    () => [
      { label: t('nav.home'), href: '/' },
      { label: t('nav.tags'), href: '/tags' },
      { label: t('nav.about'), href: '/about' },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const barTransitions = useTransition(visible, {
    from: hasMounted ? { y: '-100%' } : null,
    enter: { y: '0%' },
    leave: { y: '-100%' },
    config: { tension: 256, friction: 28, clamp: true },
  })

  useEffect(() => {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(0, animationFrameScheduler),
      map(() => window.scrollY),
      share(),
    )
    const dirChange$ = scroll$.pipe(
      pairwise(),
      map(([prev, curr]) => prev > curr),
      distinctUntilChanged(),
      map(() => window.scrollY),
    )
    const sub = scroll$
      .pipe(
        withLatestFrom(dirChange$),
        filter(([scrollY, anchor]) => Math.abs(scrollY - anchor) >= 50),
        map(([scrollY, anchor]) => scrollY <= 500 || scrollY < anchor),
        distinctUntilChanged(),
      )
      .subscribe(v => {
        setVisible(v)
      })

    return () => sub.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setVisible(true)
    setIsExpanded(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <header className="relative h-[50px] sm:h-[80px]">
      {barTransitions(
        (barStyles, item) =>
          item && (
            <animated.div
              className="fixed w-full h-[50px] sm:h-[80px] top-0 z-30"
              style={barStyles}
            >
              <MobileOnly>
                <MobileHeader
                  menus={menus}
                  expanded={isExpanded}
                  onBurgerMenuClick={toggleIsExpanded}
                />
              </MobileOnly>
              <DesktopOnly>
                <DesktopHeader menus={menus} />
              </DesktopOnly>
            </animated.div>
          ),
      )}
    </header>
  )
}

export default Header
