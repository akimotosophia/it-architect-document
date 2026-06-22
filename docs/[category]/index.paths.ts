import fs from 'fs'
import path from 'path'
import { CATEGORIES } from '../.vitepress/categories'

interface Article {
  title: string
  date: string
  url: string
}

function parseFrontmatter(content: string): Record<string, any> {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const fm = match[1]
  const result: Record<string, any> = {}
  fm.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim()
      result[key.trim()] = value
    }
  })
  return result
}

export default {
  paths: () => {
    const docsDir = path.join(__dirname, '..')
    const articles: Record<string, Article[]> = {}

    // スキャンするカテゴリーフォルダ
    CATEGORIES.forEach((category) => {
      const categoryDir = path.join(docsDir, category.id)
      articles[category.id] = []

      if (fs.existsSync(categoryDir)) {
        const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.md') && f !== 'index.md')

        files.forEach((file) => {
          const filePath = path.join(categoryDir, file)
          const content = fs.readFileSync(filePath, 'utf-8')
          const fm = parseFrontmatter(content)

          if (fm.date) {
            const url = `/${category.id}/${file.replace('.md', '')}`
            articles[category.id].push({
              title: fm.title || url,
              date: fm.date,
              url,
            })
          }
        })
      }

      // 日付降順でソート
      articles[category.id].sort((a, b) => +new Date(b.date) - +new Date(a.date))
    })

    return CATEGORIES.map((category) => ({
      params: {
        category: category.id,
        label: category.label,
        articles: articles[category.id],
      },
    }))
  },
}
