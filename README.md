[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fxiaojundebug%2Fxiaojun.im)

# xiaojun.im

[English](./README.md) • [中文](./README.zh-CN.md)

My personal blog, built with Next.js, TypeScript, MDX, and TailwindCSS.

👀 [Live Demo](https://xiaojun.im/)

## Features

- 🎨 Simple, smooth and fast
- ✨ Support dark mode, responsive design
- 🎮 Built-in lightweight code playground (native html and single react component), front-end friendly
- ⚡️ Powered by Next.js, TypeScript, MDX, TailwindCSS, convenient for secondary development, deployed on [Vercel](https://vercel.com)
- 🧩 Support reading time, tags, table of contents, i18n, KaTeX...
- More features are in the works...

TODO:

- RSS
- SEO
- Pagination
- Comment system
- More social links support
- Migration to [Contentlayer](https://github.com/contentlayerdev/contentlayer)

## Getting Started

1. Please fork this repository and modify the configuration in [site.config.js](./site.config.js) with your own information
2. Register for Upstash service, create a .env file, and fill in the following information

   ```env
   UPSTASH_REDIS_REST_URL = xxx
   UPSTASH_REDIS_REST_TOKEN = xxx
   ```

3. run `npm i`
4. run `npm run new:post filename title [tag1] [tag2] ...`, the \*.mdx file will be created in the `posts` folder
5. Deploy it to [Vercel](https://vercel.com)
6. If you like, please star the repo 🙏

## Sounds

Sounds from https://zapsplat.com

## Thanks

- https://www.joshwcomeau.com
- https://cali.so
- https://leerob.io
- https://blog.maximeheckel.com
- https://vuepress.vuejs.org
- https://vitepress.dev
- https://docusaurus.io
- https://react-spring.dev
- https://github.com/iissnan/hexo-theme-next
- https://github.com/sanjinhub/hexo-theme-geek
- https://github.com/nanxiaobei/hugo-paper
