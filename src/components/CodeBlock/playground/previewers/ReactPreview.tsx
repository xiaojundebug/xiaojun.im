import React, { useDeferredValue, useEffect, useState } from 'react'
import { generateElement } from '../utils/transpile'
import usePlaygroundContext from '../usePlaygroundContext'

function resolveElement(node: React.ReactNode) {
  const Element =
    typeof node === 'function' ? node : () => <>{React.isValidElement(node) ? node : null}</>
  return <Element />
}

export interface ReactPreviewProps {
  onConsoleReady?: (console: Console) => void
}

const ReactPreview: React.FC<ReactPreviewProps> = props => {
  const { onConsoleReady } = props
  const { code, scope } = usePlaygroundContext()
  const deferredCode = useDeferredValue(code)
  const [node, setNode] = useState<React.ReactNode>()

  useEffect(() => {
    onConsoleReady?.(console)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    transpileAsync(code).catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredCode])

  function transpileAsync(newCode: string) {
    // - transformCode may be synchronous or asynchronous.
    // - transformCode may throw an exception or return a rejected promise, e.g.
    //   if newCode is invalid and cannot be transformed.
    // - Not using async-await to since it requires targeting ES 2017 or
    //   importing regenerator-runtime...
    try {
      return Promise.resolve(newCode).then(transformedCode => {
        const renderElement = (node: React.ReactNode) => {
          // 一定要通过这种方式更新组件，因为 setState 支持传入一个function，但是组件本身又是一个方法，直接通过 setState(FunctionalElement)
          // 会让 react 以为你传入的组件是一个更新 state 的函数
          setNode(() => node)
        }

        // Transpilation arguments
        const input = {
          code: transformedCode,
          scope,
        }

        renderElement(generateElement(input))
      })
    } catch (e) {
      return Promise.resolve()
    }
  }

  return <div style={{ margin: 8 }}>{resolveElement(node)}</div>
}

export default ReactPreview
