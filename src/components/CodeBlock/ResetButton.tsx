import React from 'react'
import { animated } from '@react-spring/web'
import { MdSettingsBackupRestore } from 'react-icons/md'
import useBoop from '@/hooks/useBoop'

const ResetButton: React.FC<{ onClick: () => void }> = props => {
  const { onClick } = props
  const [style, trigger] = useBoop({ scale: 1.1 })

  return (
    <animated.button
      className="cursor-pointer text-gray-300 text-lg"
      style={style as any}
      onMouseEnter={trigger}
      onClick={onClick}
    >
      <MdSettingsBackupRestore />
    </animated.button>
  )
}

export default ResetButton
