# Exam Prep Frontend（オンライン試験システム UI）

React + Vite で作った、オンライン試験システムのフロントエンドです。
バックエンドは [Petproject/exam-prep-backend](https://github.com/dobby30102001-cpu/Petproject) と連携します。

## 画面構成

| ロール | 画面例 |
|--------|--------|
| 学生 | ダッシュボード、練習問題、模擬試験、本試験、受験履歴、お気に入り |
| 教員 | ダッシュボード、問題管理、試験管理、担当クラス、学生一覧 |
| 管理者 | ダッシュボード、ユーザー管理、クラス管理、教員割当 |

## 使用技術

| 分類 | 技術 |
|------|------|
| ライブラリ | React 19, React Router v7 |
| ビルドツール | Vite 7 |
| UI | Ant Design 6, Bootstrap 5, Font Awesome |
| HTTP | Axios |
| 通知 | React Toastify |
| 日付 | Day.js |
| Lint | ESLint 9 |

## 動作要件

- Node.js v20 LTS 以上
- npm v10 以上

## セットアップ

### 1. リポジトリを取得

```bash
git clone https://github.com/dobby30102001-cpu/FrontendPetproject.git
cd FrontendPetproject/exam-prep-frontend
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.example` をコピーして `.env` を作成し、バックエンドの URL を設定します。

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:8080/api
```

### 4. 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いて動作確認できます。

## よく使うコマンド

| コマンド | 内容 |
|----------|------|
| `npm run dev` | 開発サーバー（HMR 有効） |
| `npm run build` | 本番用ビルド |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run lint` | ESLint によるコードチェック |

## ディレクトリ構成

```
src/
├── assets/         # 画像・フォント
├── components/     # 再利用可能なコンポーネント
├── context/        # React Context（認証情報など）
├── hooks/          # カスタムフック
├── layouts/        # ヘッダー・サイドバー等の共通レイアウト
├── pages/
│   ├── admin/      # 管理者画面
│   ├── auth/       # ログイン・登録
│   ├── student/    # 学生画面
│   └── teacher/    # 教員画面
├── route/          # ルーティング設定
├── services/       # API 呼び出し（Axios ラッパー）
└── App.jsx
```

## 工夫した点

- **API クライアントを `services/apiClient.js` に一元化**し、JWT の付与・401 時の自動ログアウトを共通処理化。各画面から `api.get('/...')` と書くだけで済みます。
- **ロール別にルート・レイアウトを分離**（`admin/`, `teacher/`, `student/`）することで、権限外のページに素で入れないようにしました。
- **Ant Design と Bootstrap の併用**：管理系のテーブル・フォームは Ant Design、レイアウトの余白・グリッドは Bootstrap に寄せる、というルールを決めて衝突を防ぎました。
- **`VITE_API_URL` を必須化**し、未設定なら起動時にコンソールで警告。デプロイ環境の設定漏れで「なぜか通信できない」問題を防ぎます。

## つまずいた点・学んだこと

- 最初は Axios のインスタンスを画面ごとに作っていて、JWT の付け替えが漏れる事故が起きました。共通クライアント化してからは 401 制御が一箇所で完結し、コード量も減りました。
- Ant Design v6 で一部 API が変わっており、v5 のサンプルコードをそのまま使うとエラーになる箇所がありました。公式マイグレーションガイドを読む習慣がつきました。
