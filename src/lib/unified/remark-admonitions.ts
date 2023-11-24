import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import { h } from 'hastscript'
import { ContainerDirective } from 'mdast-util-directive'
import { Root } from 'mdast'

// 自定义提示块

// :::tip
// 这是一个提示
// :::

// :::warning
// 这是一个警告
// :::

// :::danger
// 这是一个危险警告
// :::

// :::tip[Title]
// 这是一个有标题的提示
// :::

const remarkAdmonitions: Plugin<[], Root> = () => {
  return tree => {
    visit(tree, 'containerDirective', (node: ContainerDirective) => {
      if (!['tip', 'warning', 'danger'].includes(node.name)) return

      const data = node.data || (node.data = {})

      data.hName = 'div'
      data.hProperties = h('div', { class: `admonition ${node.name}` }).properties

      const [firstChild] = node.children || []

      // Title
      if (
        firstChild &&
        firstChild.type === 'paragraph' &&
        firstChild.data &&
        firstChild.data.directiveLabel
      ) {
        firstChild.data.hName = 'p'
        firstChild.data.hProperties = h('p', { class: 'admonition-title' }).properties
      }
    })
  }
}

export default remarkAdmonitions
