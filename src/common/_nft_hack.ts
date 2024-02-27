// This is a hack to solve the problem of not being able to access project files in the vercel serverless function
// https://github.com/vercel/next.js/discussions/32236?sort=new#discussioncomment-3029649

import path from 'path'

function _hack_fn(slug: string) {
  path.join(process.cwd(), `posts/${slug}.mdx`)
}
