import React from 'react'
import config from 'config'

const Footer = () => {
  return (
    <div className="flex flex-col items-center mt-16 mb-6 text-sm">
      <span className="font-medium">
        Built with <a href="https://nextjs.org" className="text-primary no-underline">Next.js</a> • Deployed on <a href="https://vercel.com" className="text-primary">Vercel</a>
      </span>
      <div className="mt-2 text-zinc-500">
        &copy;{new Date().getFullYear()}&nbsp;{config.name}
      </div>
    </div>
  )
}

export default Footer
