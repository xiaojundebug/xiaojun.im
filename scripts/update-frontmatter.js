const fs = require('fs').promises
const matter = require('gray-matter')

const updateFrontmatter = async () => {
  const [, , ...mdFilePaths] = process.argv

  for (const path of mdFilePaths) {
    const file = matter.read(path)
    const { data: frontmatter } = file
    const newFrontmatter = {
      ...frontmatter,
      updatedOn: new Date().toISOString(),
    }
    const updatedFileContent = matter.stringify(file.content, newFrontmatter)
    await fs.writeFile(path, updatedFileContent)
  }
}

updateFrontmatter().then(() => console.log('Frontmatters updated!'))
