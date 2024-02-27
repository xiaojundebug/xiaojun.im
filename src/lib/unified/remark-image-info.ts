import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Image, Root } from 'mdast'
import { getImageInfo } from '@/common/image'

const remarkImageInfo: Plugin<[], Root> = () => {
  return async tree => {
    const promises: (() => Promise<void>)[] = []
    visit(tree, 'image', (node: Image) => {
      promises.push(async () => {
        const { src, width, height, lqip } = await getImageInfo(node.url)

        node.data = {
          hProperties: { src, width, height, lqip },
        }
      })
    })
    await Promise.allSettled(promises.map(t => t()))
  }
}

export default remarkImageInfo
