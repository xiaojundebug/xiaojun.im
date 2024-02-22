import { useCallback } from 'react'
import config from 'config'
import en from '@/locales/en.json'
import zhCN from '@/locales/zh-CN.json'

const { language } = config
const json = {
  en: en,
  'zh-CN': zhCN,
}[language]

function useTranslation() {
  const t = useCallback((key: keyof typeof en, values: Record<string, any> = {}) => {
    if (!json || (json && !json[key])) return key
    return json[key].replace(/{{\s*(\w+)\s*}}/g, (_, key: string) => values[key])
  }, [])

  return { t }
}

export default useTranslation
