import React from 'react'

const Spinner = () => {
  return (
    <div className="inline-flex">
      <div className="text-zinc-400 animate-[intense-pulse_1.4s_ease-in-out_infinite]">•</div>
      <div className="text-zinc-400 animate-[intense-pulse_1.4s_ease-in-out_0.2s_infinite]">•</div>
      <div className="text-zinc-400 animate-[intense-pulse_1.4s_ease-in-out_0.4s_infinite]">•</div>
    </div>
  )
}

export default Spinner
