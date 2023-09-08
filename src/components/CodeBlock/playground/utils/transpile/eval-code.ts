const evalCode = (code: string, scope: Record<string, any>) => {
  const scopeKeys = Object.keys(scope)
  const scopeValues = Object.values(scope)
  return new Function(...scopeKeys, code)(...scopeValues)
}

export default evalCode
