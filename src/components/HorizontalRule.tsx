import React from 'react'

// max-width: 100px;
// width: 100%;
// margin: 64px auto;
// height: 10px;
// display: block;
// overflow: visible;
const HorizontalRule = () => {
  return (
    <svg className="block overflow-visible w-full max-w-[100px] h-[10px] mx-auto my-16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line className="stroke-zinc-500/30 dark:stroke-zinc-500/80" x1="0" y1="0" x2="20" y2="10" strokeWidth="2" strokeLinecap="round"/>
      <line className="stroke-zinc-500/30 dark:stroke-zinc-500/80" x1="20" y1="0" x2="40" y2="10" strokeWidth="2" strokeLinecap="round"/>
      <line className="stroke-zinc-500/30 dark:stroke-zinc-500/80" x1="40" y1="0" x2="60" y2="10" strokeWidth="2" strokeLinecap="round"/>
      <line className="stroke-zinc-500/30 dark:stroke-zinc-500/80" x1="60" y1="0" x2="80" y2="10" strokeWidth="2" strokeLinecap="round"/>
      <line className="stroke-zinc-500/30 dark:stroke-zinc-500/80" x1="80" y1="0" x2="100" y2="10" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export default HorizontalRule
