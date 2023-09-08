const fetcher = <T = any>(...args: Parameters<typeof fetch>): Promise<T> => {
  return fetch(...args).then(res => {
    return res.ok ? res.json() : Promise.reject(res)
  })
}

export default fetcher
