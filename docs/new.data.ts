import { createContentLoader } from 'vitepress'
import { CATEGORIES } from './.vitepress/categories'

interface NewItem {
  title: string
  date: string
  category: string
  url: string
}

declare const data: NewItem[]
export { data }

export default createContentLoader('*/*.md', {
  transform(raw) {
    return raw
      .filter((page) => page.frontmatter.date)
      .map((page) => {
        const segment = page.url.split('/')[1]
        const category = CATEGORIES.find((c) => c.id === segment)
        return {
          title: page.frontmatter.title ?? page.url,
          date: page.frontmatter.date,
          category: category?.label ?? segment,
          url: page.url,
        }
      })
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  },
})
