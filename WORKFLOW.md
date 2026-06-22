# ワークフロー

このプロジェクトは VitePress で構築した静的サイトです。サイト構成の理解と、記事追加時の手順を説明します。

## サイト構成

### ディレクトリ構造

```
.github/
  workflows/
    deploy.yml           # GitHub Pages 自動デプロイ設定
.git/
  hooks/
    pre-commit          # カテゴリ登録チェック
docs/
  .vitepress/
    categories.ts       # カテゴリ定義（AI系、DB系など）
    config.mts          # VitePress 設定
  [category]/           # 動的ルートテンプレート
    index.md            # カテゴリランディングページ（自動生成）
    index.paths.ts      # 動的ルート生成スクリプト
  ai/                   # AI系記事フォルダ
    ai_usage_strategy_to_avoid_workslop.md
  db/                   # DB系記事フォルダ
    effective_partition.md
  index.md              # ホームページ
  new.md                # 新着ページ
  new.data.ts           # 新着ページのデータローダ
```

### キー機能

- **動的ルート**: `[category]/index.md` と `[category]/index.paths.ts` で、`categories.ts` に登録されたカテゴリごとにランディングページを自動生成
- **新着ページ**: 全カテゴリの記事を日付順で表示（frontmatter の `date` フィールドで制御）
- **自動ナビゲーション**: ナビバーとサイドバーは `categories.ts` から自動生成

## 記事追加ワークフロー

### 既存カテゴリへの記事追加

既存カテゴリ（例：AI系）に記事を追加する場合：

**1. 記事ファイルを作成**

```bash
docs/ai/my_article.md
```

**2. frontmatter に `title` と `date` を記入**

```markdown
---
title: 記事のタイトル
date: 2026-06-22
---

# 記事のタイトル

本文...
```

**3. 以上です**

記事一覧（AI系カテゴリページ、新着ページ）に自動反映されます。

### 新しいカテゴリ追加

新しいカテゴリ（例：クラウド系）を追加する場合：

**1. `categories.ts` に1行追加**

```typescript
export const CATEGORIES: Category[] = [
  { id: 'ai', label: 'AI系' },
  { id: 'db', label: 'DB系' },
  { id: 'cloud', label: 'クラウド系' },  // ← 追加
]
```

**2. カテゴリフォルダを作成**

```bash
mkdir docs/cloud
```

**3. 記事を追加**

```bash
docs/cloud/article.md
```

frontmatter に `title` と `date` を付ける（既存カテゴリ同様）。

**4. コミット**

```bash
git add .
git commit -m "クラウド系カテゴリ追加"
```

pre-commit フックが `categories.ts` と `docs/` フォルダを照合し、未登録フォルダがあればコミットをブロックします。

## Pre-commit フック

### 仕組み

`.git/hooks/pre-commit` が `git commit` 実行時に自動で走ります。

**チェック内容:**
- `docs/` 直下のフォルダ（カテゴリフォルダ）が `categories.ts` に登録されているか確認
- 未登録があればエラー表示してコミットをブロック

**除外対象:**
- `.` で始まるフォルダ（`.vitepress` など）
- `[category]` フォルダ（テンプレート）

### 動作例

```bash
$ mkdir docs/network
$ git add docs/network/
$ git commit -m "ネットワーク系追加"

❌ エラー: 以下のフォルダが categories.ts に登録されていません:
  - network

📝 docs/.vitepress/categories.ts に以下を追加してください:
  { id: 'network', label: 'network系' },
```

`categories.ts` に追加して、もう一度コミットしてください。

## ローカル開発

### 開発サーバー起動

```bash
npm install
npm run docs:dev
```

ブラウザで `http://localhost:5173/it-architect-document/` にアクセス。

### ビルド

```bash
npm run docs:build
```

`docs/.vitepress/dist/` に静的サイトが生成されます。

## デプロイ

`main` ブランチに push すると GitHub Actions が自動ビルド・デプロイします。

- GitHub Pages: https://akimotosophia.github.io/it-architect-document/

## 記事の書き方

frontmatter は必須。以下のテンプレートを参考に：

```markdown
---
title: 記事タイトル
date: 2026-06-22
---

# 記事タイトル

## セクション

内容...

### サブセクション

詳細...
```

**frontmatter フィールド:**
- `title` (必須): 記事のタイトル（一覧に表示される）
- `date` (必須): 発行日（YYYY-MM-DD 形式）

記事の内容は、README の「各内容に含めるもの」に従ってください。
