import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs/promises'
import path from 'path'

export async function getImageInfo(src: string) {
  const buffer = !src.startsWith('http')
    ? await fs.readFile(path.join(process.cwd(), './public', src))
    : await fetch(src).then(async res => Buffer.from(await res.arrayBuffer()))

  const {
    metadata: { height, width },
    base64,
  } = await getPlaiceholder(buffer, { size: 16 })

  return {
    src,
    width,
    height,
    lqip: base64,
  }
}
