import React, { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import DarkModeToggle from '../DarkModeToggle'
import config from '@/config'
import { useBoolean, useSize } from 'ahooks'
import { animated, useSpring, useTransition } from 'react-spring'
import BurgerMenu from '@/components/BurgerMenu'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import {
  animationFrameScheduler,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  pairwise,
  throttleTime,
  withLatestFrom,
} from 'rxjs'

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [visible, { set: setVisible }] = useBoolean(true)
  const [expanded, { toggle: toggleExpanded }] = useBoolean(false)
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
  const transitions = useTransition(expanded ? menus : [], {
    from: { x: 50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 0, opacity: 1 },
    trail: 75,
  })

  useEffect(() => {
    // 进来执行初次判断
    setVisible(window.scrollY <= 500)
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(0, animationFrameScheduler),
      map(() => window.scrollY),
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
        filter(([scrollY, anchor]) => Math.abs(scrollY - anchor) >= 80),
        map(([scrollY, anchor]) => scrollY <= 500 || scrollY < anchor),
        distinctUntilChanged(),
      )
      .subscribe(v => {
        setVisible(v)
      })

    return () => sub.unsubscribe()
  }, [])

  return (
    <header
      className={classNames(
        'w-full h-[50px] sm:h-[80px] bg-slate-50 sm:bg-slate-50/70 dark:bg-zinc-900 sm:dark:bg-zinc-900/50',
        {
          'sticky top-0 z-10 backdrop-blur sm:border-b border-zinc-400/10': visible,
        },
      )}
    >
      <div className="container h-full flex items-center justify-between">
        <BurgerMenu
          className="cursor-pointer sm:hidden"
          isOpen={expanded}
          onChange={toggleExpanded}
        />
        {/* pc */}
        <div className="hidden sm:flex relative flex items-center gap-4">
          <a href={'/'}>
            <img className="w-[45px] align-middle dark:invert" src={config.logo} alt="logo" />
          </a>
          {menus.map(menu => (
            <Link key={menu.href} href={menu.href}>
              <a className="font-medium text-lg py-0.5 px-4 rounded-lg leading-loose transition hover:bg-slate-200/50 dark:hover:bg-zinc-800/50">
                <span>{menu.label}</span>
              </a>
            </Link>
          ))}
        </div>
        {/* mobile */}
        <animated.div
          className="sm:hidden absolute left-0 right-0 top-[50px] bg-slate-50/100 dark:bg-zinc-900/100 z-10 border-b border-zinc-400/10 overflow-hidden"
          style={styles}
        >
          <div ref={mobileNavContentRef} className="flex flex-col pb-4">
            {transitions((navStyles, menu) => (
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
        <DarkModeToggle />
      </div>
    </header>
  )
}

export default Header
