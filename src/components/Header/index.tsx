import React, { createElement, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import DarkModeToggle from '../DarkModeToggle'
import config from '@/config'
import { useBoolean, useSize } from 'ahooks'
import { animated, useSpring, useTransition } from 'react-spring'
import BurgerMenu from '@/components/BurgerMenu'
import { useTranslation } from 'next-i18next'
import {
  animationFrameScheduler,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  pairwise,
  throttleTime,
  withLatestFrom,
  share,
} from 'rxjs'

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [visible, { set: setVisible }] = useBoolean(false)
  const [expanded, { toggle: toggleExpanded, set: setExpanded }] = useBoolean(false)
  const { t } = useTranslation('common')
  const menus = useMemo(
    () => [
      { label: t('nav.home'), href: '/' },
      { label: t('nav.tags'), href: '/tags' },
      { label: t('nav.about'), href: '/about' },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const mobileNavContentRef = useRef<HTMLDivElement>(null)
  const size = useSize(mobileNavContentRef.current) || { width: 0, height: 0 }
  const styles = useSpring({
    height: expanded ? size.height : 0,
    config: { tension: 256, friction: 28, precision: 0.005 },
  })
  const mobileNavTransitions = useTransition(expanded ? menus : [], {
    from: { x: 50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 0, opacity: 1 },
    trail: 75,
  })
  const barTransitions = useTransition(visible, {
    from: { y: '-100%' },
    enter: { y: '0%' },
    leave: { y: '-100%' },
    config: { tension: 256, friction: 28, clamp: true },
  })

  useEffect(() => {
    if (!visible) setExpanded(false)
  }, [visible])

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
  }, [])

  return (
    <header className="relative h-[50px] sm:h-[80px]">
      {barTransitions(
        (barStyles, item) =>
          item && (
            <animated.div
              className="fixed w-full h-[50px] sm:h-[80px] top-0 z-10 bg-slate-50 sm:bg-slate-50/50 dark:bg-zinc-900 sm:dark:bg-zinc-900/60 sm:backdrop-blur-md sm:backdrop-saturate-150"
              style={barStyles}
            >
              <div className="container h-full flex items-center justify-between">
                <BurgerMenu
                  className="cursor-pointer sm:hidden"
                  isOpen={expanded}
                  onChange={toggleExpanded}
                />
                {/* logo (desktop) */}
                <Link href="/">
                  <img
                    className="hidden sm:inline-block h-7 mr-4 cursor-pointer dark:invert"
                    src={config.logo}
                    alt="logo"
                  />
                </Link>
                {/* nav (mobile) */}
                <animated.div
                  className="sm:hidden absolute left-0 right-0 top-[50px] bg-slate-50/100 dark:bg-zinc-900/100 z-10 border-b border-zinc-400/10 overflow-hidden"
                  style={styles}
                >
                  <div ref={mobileNavContentRef} className="flex flex-col pb-4">
                    {mobileNavTransitions((navStyles, menu) => (
                      <animated.div key={menu.href} style={navStyles}>
                        <Link href={menu.href}>
                          <a className="inline-block w-full font-medium sm:text-lg px-6 py-1 leading-loose active:bg-slate-400/10">
                            <span>{menu.label}</span>
                          </a>
                        </Link>
                      </animated.div>
                    ))}
                  </div>
                </animated.div>
                {/* nav (desktop) */}
                <div className="flex items-center">
                  <div className="hidden sm:block mr-8">
                    {menus.map(menu => (
                      <Link key={menu.href} href={menu.href}>
                        <a className="font-medium text-lg mx-2 py-2 px-4 rounded-lg leading-loose transition hover:bg-slate-200/50 dark:hover:bg-zinc-800/50">
                          {menu.label}
                        </a>
                      </Link>
                    ))}
                  </div>
                  {/* social links (desktop) */}
                  <div className="hidden sm:flex items-center gap-4 mr-6">
                    {config.socials.map(social => (
                      <Link key={social.link} href={social.link}>
                        <a className="inline text-2xl leading-none">
                          {createElement(social.icon as any)}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <DarkModeToggle />
                </div>
              </div>
            </animated.div>
          ),
      )}
    </header>
  )
}

export default Header
