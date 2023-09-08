import React, { createContext, PropsWithChildren, useState } from 'react'

export interface ConfigContext {
  soundEnabled?: boolean
  setSoundEnabled?: (enabled: boolean) => void
}

export const ConfigContext = createContext({} as ConfigContext)

const ConfigProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true)

  return (
    <ConfigContext.Provider value={{ soundEnabled, setSoundEnabled }}>
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigProvider
