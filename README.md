# sample-todo-editor

Azure CosmosDBを使ってtodoを管理するサンプルプログラムです。

## How to use

本サンプリングプログラムはNode.js環境で開発しています。
また、フレームワークはVue.jsをベースに使用しています。

### Setup

リポジトリをクローンしたら、BashやPowerShellなどで下記コマンドを実行し、必要なモジュールをインストールします。

```bash
npm install
```

アプリケーションをローカルで実行する場合は、ルートディレクトリに `.env`ファイルを作成し、下記のプロパティを設定します。
サーバーで実行する場合は、環境変数に下記を登録します。

| key | value |
| --- | --- |
| COSMOS_ENDPOINT | CosmosDBのエンドポイントURL |
| COSMOS_KEY | CosmosDBのプライマリ/セカンダリキーのどちらか |
| COSMOS_DATABASE_ID | CosmosDBのデータベース名 |
| COSMOS_CONTAINER_ID | CosmosDBのコンテナ名 |

### Build

インストールが完了したら、下記コマンドでアプリケーションをビルドします。

```bash
npm run build
```

### Execution

ビルドが完了したら、下記コマンドでアプリケーションを実行します。

```bash
npm run start
```

上記コマンドを実行後、アプリケーションの実行環境にポート番号3000でアクセスします。

例：ローカル環境で実行した場合
`http://localhost:3000/`
