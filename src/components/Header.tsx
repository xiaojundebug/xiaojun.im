import React, { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import DarkModeToggle from './DarkModeToggle'
import config from 'config'
import { useBoolean, useSize } from 'ahooks'
import { animated, useSpring, useTransition } from '@react-spring/web'
import BurgerMenu from '@/components/BurgerMenu'
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
import useHasMounted from '@/hooks/useHasMounted'
import useTranslation from '@/hooks/useTranslation'
import OnlyMobile from '@/components/OnlyMobile'
import OnlyDesktop from '@/components/OnlyDesktop'
import { useRouter } from 'next/router'
import clsx from 'clsx'

export interface HeaderProps {}

const MobileHeader: React.FC<{ menus: { label: string; href: string }[] }> = props => {
  const { menus } = props
  const [expanded, { toggle: toggleExpanded, set: setExpanded }] = useBoolean(false)
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
    trail: 75,
  })

  return (
    <div className="prose-container flex items-center justify-between h-[50px] bg-white dark:bg-zinc-900">
      <BurgerMenu className="cursor-pointer" isOpen={expanded} onChange={toggleExpanded} />
      <DarkModeToggle />
      <animated.nav
        className="absolute left-0 right-0 top-[50px] bg-white dark:bg-zinc-900/100 z-10 border-b border-zinc-400/10 overflow-hidden"
        style={styles}
      >
        <ul ref={navRef} className="flex flex-col pb-4">
          {navTransitions((navStyles, menu) => (
            <animated.li key={menu.href} style={navStyles}>
              <Link href={menu.href}>
                <a className="inline-block w-full font-medium text-lg px-6 py-1 leading-loose active:bg-slate-400/10">
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

  return (
    <div className="prose-container flex items-center justify-between h-[80px]">
      <Link href="/">
        <img
          className="inline-block h-7 mr-4 cursor-pointer dark:invert"
          src={config.logo}
          alt="logo"
        />
      </Link>
      <nav>
        <ul className="flex items-center px-3 ring-1 ring-zinc-400/10 rounded-full backdrop-blur-md backdrop-saturate-150 shadow-lg shadow-zinc-800/5">
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
  const { t } = useTranslation()
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

  return (
    <header className="relative h-[50px] sm:h-[80px]">
      {barTransitions(
        (barStyles, item) =>
          item && (
            <animated.div
              className="fixed w-full h-[50px] sm:h-[80px] top-0 z-10"
              style={barStyles}
            >
              <OnlyMobile>
                <MobileHeader menus={menus} />
              </OnlyMobile>
              <OnlyDesktop>
                <DesktopHeader menus={menus} />
              </OnlyDesktop>
            </animated.div>
          ),
      )}
    </header>
  )
}

export default Header
