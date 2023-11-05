import React from 'react'

export interface CheckboxProps {
  checked?: boolean
  onChange?: (value: boolean) => void
  label?: string
}

const Checkbox: React.FC<CheckboxProps> = props => {
  const { checked, onChange, label } = props

  return (
    <div>
      <label className="relative flex items-center gap-2">
        <input
          type="checkbox"
          className="appearance-none relative inline-flex items-center justify-center w-5 h-5 rounded-md border-2 border-zinc-400 active:scale-75 transition ease-out-back duration-300
            before:absolute before:block before:w-[11px] before:h-[11px] before:rounded-sm before:bg-pink-500
            before:scale-0 checked:before:scale-100 before:transition before:ease-in-out before:duration-300"
          checked={checked}
          onChange={evt => onChange?.(evt.target.checked)}
        />
        <span className="text-zinc-400 select-none">{label}</span>
      </label>
    </div>
  )
}

export default Checkbox
