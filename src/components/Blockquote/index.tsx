import React, { PropsWithChildren } from 'react'

const Blockquote: React.FC<PropsWithChildren> = props => {
  return (
    <blockquote className="relative rounded-md my-4 px-10 py-8 sm:px-14 sm:py-10 bg-white dark:bg-night font-medium shadow shadow-slate-100 dark:shadow-none">
      <svg className="absolute top-2 left-3 fill-emerald-500 w-4 h-4 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
      {props.children}
      <svg className="absolute bottom-2 right-3 fill-emerald-500 w-4 h-4 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/></svg>
    </blockquote>
  )
}

export default Blockquote
