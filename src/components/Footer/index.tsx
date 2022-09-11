import React from 'react'
import config from '@/config'
import Script from 'next/script'
import { HiEye, HiUserGroup } from 'react-icons/hi'

const Footer = () => {
  return (
    <div className="flex flex-col items-center mt-16 mb-6 text-sm">
      <span className="font-medium">
        Built with <a href="https://nextjs.org" className="text-blue-500">Next.js</a> • Deployed on <a href="https://vercel.com" className="text-blue-500">Vercel</a>
      </span>
      <div className="mt-2 opacity-50">
        &copy;{new Date().getFullYear()}&nbsp;{config.name}
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
