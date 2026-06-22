import { defineConfig } from 'vitepress'
import { CATEGORIES } from './categories'

export default defineConfig({
  title: 'IT Architect Document',
  description: 'ITアーキテクトとして必要な知識を体系的にまとめたドキュメント',
  lang: 'ja-JP',
  base: '/it-architect-document/',

  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/' },
      ...CATEGORIES.map((c) => ({ text: c.label, link: `/${c.id}/` })),
      { text: '新着', link: '/new' },
    ],

    // カテゴリ自体を増やすときだけ categories.ts に1行追加すればここにも反映される。
    // 記事(末端ファイル)を追加するだけならこのファイルを触る必要はない。
    sidebar: [
      ...CATEGORIES.map((c) => ({ text: c.label, link: `/${c.id}/` })),
      { text: '新着', link: '/new' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/akimotosophia/it-architect-document' },
    ],

    search: {
      provider: 'local',
    },
  },
})
