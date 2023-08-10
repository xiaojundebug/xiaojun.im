import React, { MouseEvent, useEffect, useMemo, useRef } from 'react'
import config from 'config'
import { useRouter } from 'next/router'
import { useSize } from 'ahooks'
import useBoolean from '@/hooks/useBoolean'
import useHasMounted from '@/hooks/useHasMounted'
import useTranslation from '@/hooks/useTranslation'
import { animated, to, useSpring, useSpringValue, useTransition } from '@react-spring/web'
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
    <div className="px-6 flex items-center justify-between h-[50px] bg-white dark:bg-zinc-900">
      <BurgerMenu className="cursor-pointer" isOpen={expanded} onChange={onBurgerMenuClick} />
      <DarkModeToggle />
      <animated.nav
        className="absolute left-0 right-0 top-[50px] bg-white dark:bg-zinc-900/100 z-10 border-b border-zinc-400/10 overflow-hidden"
        style={styles}
      >
        <ul ref={navRef} className="flex flex-col pb-4">
          {navTransitions((navStyles, menu) => (
            <animated.li key={menu.href} style={navStyles}>
              <Link href={menu.href}>
                <a className="inline-block w-full font-medium text-lg px-6 py-1 leading-loose active:bg-zinc-400/10">
                  <span>{menu.label}</span>
                </a>
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
  const router = useRouter()
  const spotlightX = useSpringValue(0)
  const spotlightY = useSpringValue(0)
  const spotlightR = useSpringValue(0)

  const onMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const bounds = currentTarget.getBoundingClientRect()
    spotlightX.set(clientX - bounds.left)
    spotlightY.set(clientY - bounds.top)
    spotlightR.set(Math.sqrt(bounds.width ** 2 + bounds.height ** 2) / 2.5)
  }

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
          className="group flex items-center px-3 ring-1 ring-zinc-900/5 dark:ring-zinc-100/10 rounded-full bg-gradient-to-b from-zinc-50/70 to-white/70 dark:from-zinc-900/50 dark:to-zinc-700/50 backdrop-blur-md backdrop-saturate-200 shadow-lg shadow-zinc-800/5"
          onMouseMove={onMouseMove}
        >
          {/* Spotlight overlay */}
          <animated.div
            className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 text-primary/[0.12]"
            style={{
              background: to(
                [spotlightX, spotlightY, spotlightR],
                (x, y, r) =>
                  `radial-gradient(${r}px circle at ${x}px ${y}px, currentColor 0%, transparent 65%)`,
              ),
            }}
            aria-hidden
          ></animated.div>
          {menus.map(menu => (
            <li key={menu.href}>
              <Link href={menu.href}>
                <a
                  className={clsx(
                    'relative block py-2 px-3 font-medium text-sm hover:text-primary transition-colors',
                    {
                      'text-primary': router.route === menu.href,
                    },
                  )}
                >
                  {menu.label}

                  <span
                    className={clsx(
                      'absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/50 dark:via-primary to-primary/0 transition-opacity',
                      { 'opacity-0': router.route !== menu.href },
                      { 'opacity-100': router.route === menu.href },
                    )}
                  ></span>
                </a>
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
  const router = useRouter()
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
    // 进来执行初次判断
    setVisible(window.scrollY <= 500)
  }, [router])

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
    setIsExpanded(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    if (!visible) {
      setIsExpanded(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <header className="relative h-[50px] sm:h-[80px]">
      {barTransitions(
        (barStyles, item) =>
          item && (
            <animated.div
              className="fixed w-full h-[50px] sm:h-[80px] top-0 z-10"
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
