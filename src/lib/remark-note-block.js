import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

// 自定义提示块
//
// :::tip
// 这是一个提示
// :::
//
// :::warning
// 这是一个警告
// :::
//
// :::danger
// 这是一个危险警告
// :::

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
export default function remarkNoteBlock() {
  return tree => {
    visit(tree, node => {
      if (node.type === 'containerDirective') {
        if (!['tip', 'warning', 'danger'].includes(node.name)) return

        const data = node.data || (node.data = {})
        const tagName = 'div'

        data.hName = tagName
        data.hProperties = h(tagName, { class: `note ${node.name}` }).properties
      }
    })
  }
}
