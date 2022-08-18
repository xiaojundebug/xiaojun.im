const fs = require('fs').promises;
const path = require('path');
const dayjs = require('dayjs');
const pangu = require('pangu');

// npm run new:post name [tag1] [tag2] ...
const createPost = async () => {
  const [, , filename, ...tags] = process.argv;

  await fs.writeFile(
    path.resolve(process.cwd(), `./src/posts/${dayjs().format('YYYY-MM-DD')}-${filename}.mdx`),
    `---
title: '${pangu.spacing(filename)}'
date: '${dayjs().format('YYYY-MM-DD HH:mm:ss')}'
tags:${tags.map(tag => `\n  - '${tag}'`).join('')}
---
`,
  );
};

createPost();
