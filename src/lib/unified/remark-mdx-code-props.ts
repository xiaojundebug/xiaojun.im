import type { Plugin } from 'unified'
import { Code, Root } from 'mdast'
import { visit } from 'unist-util-visit'
import { Parser } from 'acorn'
import jsx from 'acorn-jsx'

const parser = Parser.extend(jsx())

const remarkMdxCodeProps: Plugin<[], Root> = () => {
  return tree => {
    visit(tree, 'code', (node: Code, idx, parent) => {
      const code = JSON.stringify(`${node.value}`)
      const value = `<code className="language-${node.lang || 'text'}" ${
        node.meta || ''
      }>{${code}}</code>`
      const estree = parser.parse(value, { ecmaVersion: 'latest' })
      parent!.children[idx as number] = {
        type: 'mdxFlowExpression' as any,
        value,
        data: { estree },
      }
    })
  }
}

export default remarkMdxCodeProps
