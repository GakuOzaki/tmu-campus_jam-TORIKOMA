# Azure Container Appsへ公開する（任意）

通常の発表は[発表と終了の手順](presentation.md)で進めます。Copilot appのBrowserやCodespacesの転送先を使えるため、Azureへの公開は必須ではありません。このページは、継続して使えるURLが必要になり、**Azure Container Apps**への公開を選んだチーム向けです。

mainには公開用のDockerfileやワークフローを置いていません。選んだアプリ構成に合わせてCopilotと用意します。準備済みのReact・Node構成を使いたい場合は、開発開始前に[初心者向けコース](../choose-start.md)を選びます。途中で初心者向けブランチへ切り替えて、自分たちのコードを上書きする必要はありません。

元のPRをマージ済みで、次の作業ブランチをまだ用意していなければ、ファイルを編集する前に[マージ後の作業準備](build-loop.md#after-merge)を行います。準備済みの作業ブランチや未マージのPRがあれば、それを使い、確認済みのアプリから公開用の変更を加えます。

## 1. 本番コンテナを用意し、動作確認する

[完成確認](verification.md)を終えたアプリに、次の条件で公開準備を加えます。

| 用意するもの | 確認すること |
| --- | --- |
| Dockerfile・.dockerignore | 選んだ構成でLinux/amd64のイメージを作れる。開発用サーバーではなく本番用のHTTPサーバーを起動し、秘密情報を含めない |
| 待受設定 | コンテナ内で`0.0.0.0`に待ち受ける。ポート番号と起動コマンドをdevelopment.mdへ記録する |
| 起動・readinessの確認 | 起動完了を判定するHTTPパスなどを用意し、待受ポートとともに記録する。Azureのprobesもアプリの起動時間に合わせる |
| コンテナのテスト | イメージをビルドして起動し、起動確認・主要なDoDを確かめる。テスト失敗時は公開へ進まない |
| 公開するイメージ | 確認した同じイメージを再ビルドせずレジストリへ保存し、digestで特定して配置する |

静的な画面だけのアプリでも、本番用のHTTPサーバーをコンテナに含めればこの経路を使えます。APIは企画に必要な場合に追加します。コンテナのビルド・確認はCodespacesまたはCIで実行でき、全員のPCへのDocker導入は必須ではありません。[Container Appsのコンテナ要件](https://learn.microsoft.com/en-us/azure/container-apps/containers)・[Health probes](https://learn.microsoft.com/en-us/azure/container-apps/health-probes)

次の依頼を、自分たちの構成と公開範囲に合わせて使えます。

```text
目的：
現在のアプリをAzure Container Appsへ公開するため、本番コンテナと確認方法を用意してください。

文脈：
docs/product.md、docs/development.md、docs/verification.md、現在のコード・テスト・CIを読んでください。

制約：
選んだ技術構成を維持し、Linux/amd64の本番イメージを作ってください。
起動・readinessと主要なDoDをコンテナで確かめ、失敗時は公開しないでください。
公開する場合はテストした同じイメージを再ビルドせず保存し、digestを記録してください。
秘密情報をコードやイメージへ含めず、費用・公開範囲の判断はチームへ示してください。

完成条件：
Dockerfile、必要なテスト・CIと実際のコマンドが用意され、実行できた確認の結果が残っていること。
docs/development.mdにポート・起動確認・環境変数・公開手順があり、未実行は未確認と記録されていること。
```

[Azure・レジストリの初期設定](azure-setup.md)では、GitHub Container Registry（GHCR）のPublicイメージを使う方法を説明します。コードを非公開に保ちたい場合は、運営と非公開レジストリの取得認証を準備します。**公開用ワークフローが未作成なら、先に[初期設定の手順1](azure-setup.md#1-テスト済みイメージをレジストリへ保存する)でワークフローを作成し、development.mdへの記録まで済ませて、このページの手順2へ戻ります。** ワークフローの実行とイメージの公開は、PRを確認・マージした後の手順3で行います。

## 2. GitHubへ変更と確認結果を保存する

1. コンテナの設定・テスト・[検証記録](../verification.md)の差分をチームで確認します。
2. 未保存の変更をcommit・pushします。Copilot appは[GUI手順](../copilot-app.md#codespacesへ変更を渡して確認する)、Codespacesは[開発ガイド](../codespaces.md)を使います。保存・push済みなら繰り返しません。
3. 作業ブランチのPRで、生成したCIが今回の変更に対して成功したこと、画面の操作結果、DoDを確認し、チームリポジトリの既定ブランチへマージします。

CIが存在しない・未実行の場合は、成功したものとして扱わず、作成・実行してから進みます。PRの成功だけではAzureへの公開は完了していません。

## 3. 確認済みイメージを配置する

[初期設定](azure-setup.md)に沿い、テスト済みイメージをレジストリへ保存し、そのdigestをContainer Appsに指定します。mainの配布時点では、自動デプロイや有効化フラグはありません。チームで追加した公開方法と実行結果は、次の手順4で記録します。

更新時も **編集 → 確認 → 保存・PR → 確認済みイメージの公開 → 配置 → 公開URLの確認** の順です。

## 4. 公開URLで確認する

Azure portalのContainer App概要にある **Application URL** を開きます。必須DoDに対応する操作、URLの直接表示・再読み込み、必要なAPI・実際のログイン・共有DBを確認します。起動確認の成功だけでは、すべての完成条件を満たした証拠にはなりません。

手順2でPRをマージ済みで、次の作業ブランチをまだ用意していなければ、[マージ後の作業準備](build-loop.md#after-merge)を行います。development.mdに公開方法、[verification.md](../verification.md)にURL・イメージのdigest・結果・未確認事項を記録します。この記録の保存・共有は、続く発表後の保存手順で行えます。

確認と記録を終えたら[発表と終了](presentation.md)へ戻り、公開URLを使ってデモします。未達があれば修正して同じ操作を再確認します。

## API・DB・アプリ内AIを使う場合

- **API**：選んだサーバー構成へ実装し、画面からの接続先と確認方法をdevelopment.mdへ記録します。
- **環境変数・秘密情報**：開発環境の値はAzureへ自動では移りません。AzureではContainer AppのSecretsと環境変数を設定します。ブラウザに渡る設定へ秘密のキーを含めず、必要ならサーバー側から外部APIを呼びます。[環境変数](https://learn.microsoft.com/en-us/azure/container-apps/environment-variables)・[Secrets](https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets)
- **共有DB・ファイル**：必要なチームは外部のDB・ストレージを接続します。コンテナ内の一時ファイルやメモリを、再配置後も残る保存先として扱いません。[ストレージ](https://learn.microsoft.com/en-us/azure/container-apps/storage-mounts)
- **認証・AI**：企画に必要なら利用条件・設定・課金枠を確認し、テスト用の応答と公開先の実サービスで確認した結果を分けます。

## うまくいかないとき

| 状況 | 確認する場所 |
| --- | --- |
| コンテナのビルド・テストが失敗 | 最初に失敗したステップとログ。テストを省略して公開しない |
| レジストリへ保存できない | ワークフローの権限、OrganizationのPackagesポリシー、パッケージのManage Actions access |
| Azureがイメージを取得できない | レジストリの公開範囲・取得認証、イメージ名とdigest |
| リビジョンが起動しない | コンテナログ、必要な環境変数、0.0.0.0への待受、Target port、起動・readinessの設定 |
| 公開後に機能が動かない | 再現する操作、ブラウザとサーバーのエラー、配置したdigest、外部サービスへの接続 |

利用後は[終了時の手順](azure-setup.md#5-利用を終えるとき)で費用とリソースを確認します。教材の実サービスでの確認範囲は[検証記録](../template-validation.md)を参照してください。
