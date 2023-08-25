import { visit } from 'unist-util-visit'
import fetchSiteMetadata from 'fetch-site-metadata'
import { h } from 'hastscript'

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
export default function remarkLinkCard() {
  return async tree => {
    // 一个单独的 link 的 mdast 有什么特征？
    // 1. parent 是一个 paragraph
    // 2. parent 的 children 长度为 1，且该 child 的 type 为 text
    // 3. 不能在 list item 中
    const promises = []
    visit(tree, 'paragraph', (node, index, parent) => {
      const children = node.children || []
      if (
        children.length === 1 &&
        children[0].type === 'link' &&
        /^https?:\/\//.test(children[0].url) &&
        parent.type !== 'listItem'
      ) {
        promises.push(async () => {
          const metadata = await fetchSiteMetadata(children[0].url)

          if (metadata.title && metadata.description) {
            const data = node.data || (node.data = {})
            const tagName = 'linkcard'

            data.hName = tagName
            data.hProperties = h(tagName, {
              url: children[0].url,
              title: metadata.title,
              description: metadata.description,
              image: metadata.image?.src,
              icon: metadata.icon,
            }).properties
          }
        })
      }
    })
    await Promise.allSettled(promises.map(p => p()))
  }
}
