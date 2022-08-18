import React from 'react'
import config from '@/config'
import Script from 'next/script'
import Link from 'next/link'
import { HiEye, HiUserGroup } from "react-icons/hi";


const Footer = () => {
  return (
    <div className="flex flex-col items-center py-8">
      {config.socials.map(item => (
        <Link key={item.link} href={item.link}>
          <a target="_blank" className="text-3xl">
            {item.icon}
          </a>
        </Link>
      ))}
      <div className="my-3">
        &copy;{new Date().getFullYear()} • {config.name}
      </div>
      {config.busuanzi && (
        <>
          <Script src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js" />
          <div className="flex items-center text-sm">
            <HiEye />
            &nbsp;
            <span id="busuanzi_value_site_pv">0</span>&nbsp;&nbsp;
            <HiUserGroup />
            &nbsp;
            <span id="busuanzi_value_site_uv">0</span>
          </div>
        </>
      )}
    </div>
  )
}

export default Footer
