import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'IT Architect Document',
  description: 'ITアーキテクトとして必要な知識を体系的にまとめたドキュメント',
  lang: 'ja-JP',
  base: '/it-architect-document/',

  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/' },
    ],

    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/akimotosophia/it-architect-document' },
    ],

    search: {
      provider: 'local',
    },
  },
})
