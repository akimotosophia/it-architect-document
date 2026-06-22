---
title: '{{ $params.label }}'
---

<script setup>
import { useData } from 'vitepress'
const { params, site } = useData()

const getUrl = (url) => site.value.base + url.replace(/^\//, '')
</script>

# {{ params.label }}

<ul v-if="params.articles.length" class="category-list">
  <li v-for="article in params.articles" :key="article.url">
    <span class="category-date">{{ article.date }}</span>
    <a :href="getUrl(article.url)">{{ article.title }}</a>
  </li>
</ul>
<p v-else>準備中です。記事はまだありません。</p>

<style scoped>
.category-list {
  list-style: none;
  padding: 0;
}
.category-list li {
  padding: 8px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.category-date {
  color: var(--vp-c-text-2);
  margin-right: 8px;
}
</style>
