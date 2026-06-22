# it-architect-document

## 目的
このリポジトリは、ITアーキテクトとして必要な知識を体系的にまとめ、後からすぐに引き出し、すぐに役に立てるような議論のベースを残しておくものである。
間違っている情報、古い情報を含むことがあるが、その上での判断を大事にする。一度出して間違っている情報があるなら修正するし、判断が変わらなければあまり気にしない。

## 各内容に含めるもの

下記の要素は必ず含める。それ以外は分かりやすいように調整する。

- ビジネスの恩恵にどうつながるか
- アイコン付きのぱっと見で分かる概念図
- トレードオフとなる要素
- 参考記事

## ドキュメント

- [WORKFLOW.md](./WORKFLOW.md) - サイト構成と記事追加ワークフロー

## ディレクトリ構造

```
.github/
  workflows/
    deploy.yml              # GitHub Pages 自動デプロイ設定
docs/
  .vitepress/
    categories.ts           # カテゴリ定義
    config.mts              # VitePress 設定
  [category]/
    index.md                # カテゴリランディング（自動生成）
    index.paths.ts          # 動的ルート生成
  ai/                       # AI系記事
  db/                       # DB系記事
  index.md                  # ホームページ
  new.md                    # 新着ページ
.git/
  hooks/
    pre-commit              # カテゴリ登録チェック
```

## クイックスタート

```bash
# インストール
npm install

# 開発サーバー起動
npm run docs:dev

# ビルド
npm run docs:build
```

詳細は [WORKFLOW.md](./WORKFLOW.md) を参照。
