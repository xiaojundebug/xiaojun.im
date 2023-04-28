[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fimzxj%2Fxiaojun.im)

# xiaojun.im

[English](./README.md) • [中文](./README.zh-CN.md)

我的个人博客，它使用 Next.js、TypeScript、MDX 和 TailwindCSS 构建。

👀 [在线预览](https://xiaojun.im/)

## 功能

- 🎨 简洁、丝滑、快速
- ✨ 支持黑暗模式，支持响应式设计
- 🎮 内置轻量级的在线代码运行组件（目前仅支持 html 与 单个 jsx 组件），可直接在文章中运行代码块，还可以在文章中随意嵌入 react 组件，对前端开发者友好，请尽情释放自己的想象力
- ⚡️ 由 Next.js、TypeScript、MDX、TailwindCSS 驱动，方便二次开发，可一键部署在 [Vercel](https://vercel.com)，不需要自己的服务器
- 🧩 支持阅读时间估算、标签分类，目录导航，多语言...
- 更多功能还在开发中...

待办:

- RSS
- SEO 优化
- 文章分页
- 集成第三方评论
- 更多社交分享按钮支持
- 迁移到 [Contentlayer](https://github.com/contentlayerdev/contentlayer)

## 使用方法

1. fork 该仓库
2. 运行 `npm i`
3. 使用 `npm run new:post posttile [tag1] [tag2] ...` 命令在 `posts` 中创建一篇文章，更多语法可参考[示例文章](https://www.xiaojun.im/posts/2023-04-27-mdx-syntax-guide)
4. 将它部署在 [Vercel](https://vercel.com)，具体很简单，可以跟着 vercel 官方一步步来
5. 如果你喜欢的话，麻烦给这个项目一个 start ✨，这对我是很大鼓励 🙏

_配置文件在 `site.config.js` 文件中，你可以在这里修改你的个人信息，例如名字与头像_

## 站点音效

声音文件来自 https://zapsplat.com

## 感谢

该项目参考但不限于以下网站，特别是第一个，给了我很多启发。

- https://www.joshwcomeau.com
- https://leerob.io
- https://blog.maximeheckel.com
- https://vuepress.vuejs.org
- https://vitepress.dev
- https://react-spring.dev
- https://github.com/iissnan/hexo-theme-next
- https://github.com/sanjinhub/hexo-theme-geek~~
