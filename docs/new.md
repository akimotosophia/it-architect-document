---
title: 新着
---

# 新着

<script setup>
import { data as posts } from './new.data.ts'
</script>

<ul class="new-list">
  <li v-for="post in posts" :key="post.url">
    <span class="new-date">{{ post.date }}</span>
    <span class="new-category">[{{ post.category }}]</span>
    <a :href="post.url">{{ post.title }}</a>
  </li>
</ul>

<p v-if="posts.length === 0">まだ記事がありません。</p>

<style scoped>
.new-list {
  list-style: none;
  padding: 0;
}
.new-list li {
  padding: 8px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.new-date {
  color: var(--vp-c-text-2);
  margin-right: 8px;
}
.new-category {
  color: var(--vp-c-brand-1);
  margin-right: 8px;
}
</style>
