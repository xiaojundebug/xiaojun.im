import React, { useMemo, useRef } from 'react'
import Link from 'next/link'
import DarkModeToggle from '../DarkModeToggle'
import config from '@/config'
import { useBoolean, useSize } from 'ahooks'
import { animated, useSpring, useTransition } from 'react-spring'
import BurgerMenu from '@/components/BurgerMenu'
import { useTranslation } from 'next-i18next'

// const menus = [
//   { label: 'Home', href: '/' },
//   { label: 'Tags', href: '/tags' },
//   { label: 'About', href: '/about' },
// ]

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [expanded, { toggle }] = useBoolean(false)
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

  return (
    <header className="fixed w-full h-[50px] sm:h-[80px] bg-slate-50 sm:bg-slate-50/70 dark:bg-zinc-900 sm:dark:bg-zinc-900/50 backdrop-blur border-0 sm:border-b border-zinc-400/10 z-10">
      <div className="container h-full flex items-center justify-between">
        <BurgerMenu className="cursor-pointer sm:hidden" isOpen={expanded} onChange={toggle} />
        {/* pc */}
        <div className="hidden sm:flex relative flex items-center gap-4">
          <a href={'/'}>
            <img className="w-[50px] align-middle" src={config.logo} alt="logo" />
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
