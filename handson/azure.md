# Azure Container Appsへ公開する（任意）

継続して共有するURLが必要なチームだけが使います。通常はPCやCodespacesのプレビューで[発表](../README.md#finish)できます。**mainにはDockerfile・公開ワークフロー・Azure接続設定はありません。** 合意した構成に合わせて作ります。ここに記載したmainの公開経路は、Azureでの一気通貫の実機確認は未実施です。

この手順は **本番コンテナの作成 → 保存・PR・CI → テスト済みの同じイメージをGHCRへ公開 → digestを指定してAzureへ配置 → 公開URLの確認** の順です。元のPRをマージ済みなら、編集前に[次の作業ブランチ](../README.md#after-merge)を用意します。

## CodespacesでAzure MCPを使う準備（任意）

[devcontainer](../.devcontainer/devcontainer.json)に.NET 10とAzure CLI、[VS CodeのMCP設定](../.vscode/mcp.json)にAzure MCP `3.0.0-beta.48`を用意しています。

1. 既存Codespaceでは、更新した設定を取り込んでからコマンドパレットの **Codespaces: Rebuild Container** で環境を再構築します。新規作成では設定が最初から適用されます。
2. CodespacesのTerminalで`az login --use-device-code`を実行し、案内に従ってAzureへサインインします。`az account set --subscription '<使用するSubscription ID>'`で対象を選びます。
3. コマンドパレットで **MCP: List Servers → com.microsoft/azure → Start** を選びます。信頼の確認が出たら設定内容を確認して進み、Copilot Chatのツール一覧でAzure MCPが利用できることを確かめます。起動に失敗したら同じサーバーの **Show Output** でログを確認します。

この設定はCodespacesのVS Codeで使います。Copilot appで編集している場合も、[変更をCodespacesへ渡す手順](copilot-app.md#codespaces-transfer)で同じ設定を取り込み、上の準備を行えます。以降の手順で公開に必要な設定を整え、公開URLまで確認します。[Azure MCPの認証](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started/tools/visual-studio-code)・[VS CodeでのMCP管理](https://code.visualstudio.com/docs/agent-customization/mcp-servers)

## 1. コンテナと公開ワークフローを作る

[完成確認](../README.md#verify)を終えたアプリで、編集できるモードのCopilotへ次を依頼します。

```text
目的：
現在のアプリをAzure Container Appsへ公開する準備をしてください。
文脈：
PLAN.md、PROGRESS.md、現在のアプリ・テスト・CI、handson/azure.mdを読んでください。
制約：
採用構成を維持し、linux/amd64の本番イメージを作ってください。
コンテナ内で0.0.0.0に待ち受け、起動確認と主要なDoDをそのイメージでテストしてください。
秘密情報・私的な資料をイメージへ含めず、commit・push・公開・Azure操作はまだしないでください。
完成条件：
Dockerfile・.dockerignore、必要なテストとPR用CI、下記条件の公開ワークフローを用意してください。
PLAN.mdに実際のビルド・起動・終了・確認方法、ポート、設定、公開操作を残してください。
実行した結果はPROGRESS.mdへ残し、未実行は未確認と明記してください。
```

公開ワークフローは次の条件にします。配布済みの設定を有効にする操作ではありません。

- **手動実行（workflow_dispatch）・チームの既定ブランチのみ**を公開対象にする。
- `linux/amd64`のイメージを一度ビルドして起動し、起動確認・主要なDoDをテストする。失敗時は公開しない。
- 成功した**同じイメージを再ビルドせず**、`GITHUB_TOKEN`と`packages: write`でGHCRへpushする。PRの確認ジョブへ公開権限を与えない。
- Summaryに対象コミット・結果・タグ・完全なdigest参照（`ghcr.io/所有者/名前@sha256:...`）を残す。

開発用サーバーではなく本番用HTTPサーバーを起動し、コンテナ内のポートと起動・readinessを判定する方法を記録します。ビルド・確認はCodespacesまたはCIで行えるため、全員のPCへDockerを導入する必要はありません。CodespacesでDockerが使えなければ`.devcontainer/`と環境の再構築を確認します。[コンテナ要件](https://learn.microsoft.com/en-us/azure/container-apps/containers)

## 2. 保存してPR・CIを確認する

[READMEの保存とPR](../README.md#share)へ進み、設定・アプリ・テスト・記録をGUIでcommit・pushします。PRのbase repositoryとhead repositoryを**同じチームのFork**にし、実際のCI成功とチームの確認後に既定ブランチへマージします。CIが未作成・未実行なら成功とは扱いません。

公開ワークフローもこのPRで確認してからマージします。**Run workflowは、対応するファイルが既定ブランチに入ってから**使います。保存・CI確認後はこのページの手順3へ戻ります。

## 3. テスト済みイメージをGHCRへ公開する

GitHubの **Actions → 作成した公開ワークフロー → Run workflow** で既定ブランチを選びます。ワークフロー名は`PLAN.md`で確認します。[ForkのActions](../README.md#enable-actions)が有効であることも確かめます。

成功した実行のSummaryで対象コミットとテスト結果を確認し、完全なdigest参照を控えます。初回は所有者の **Packages → 対象パッケージ → Package settings → Change visibility → Public** で、Azureが取得できるようにします。

この標準手順は公開イメージを使います。内容をチームで確認してください。**Public化したパッケージはPrivateへ戻せません。** 非公開が必要な場合は実行せず、運営と非公開レジストリ・取得認証を用意します。Publicのチーム用ForkもPrivateへ変更できません。[GHCRの認証・digest](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)・[公開範囲](https://docs.github.com/en/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility)

## 4. Azureを準備して配置する

チームの代表者が運営・メンターと、利用するサブスクリプション・残額・リージョン・作成権限を確認します。クレジットがあるだけで全サービスを利用できるとは判断しません。

Azure portalでチーム専用の **Resource group** と **Container Apps Environment（Consumption）** を用意します。必要ならサブスクリプションの **Resource providers** で`Microsoft.App`などを登録します。[作成の前提](https://learn.microsoft.com/en-us/azure/container-apps/quickstart-portal)

**Cloud Shell → Bash** を開き、次の`<...>`を実際の値へ置き換えます。初回はストレージをマウントしない一時セッションも使えます。ポートは`PLAN.md`に記録した**コンテナ内の待受ポート**です。

```bash
az account set --subscription '<使用するSubscription ID>'
az extension add --name containerapp --upgrade
az containerapp create \
  --name '<チームのアプリ名>' \
  --resource-group '<チームのResource group>' \
  --environment '<Container Apps Environment名>' \
  --image 'ghcr.io/<所有者>/<名前>@sha256:<成功したdigest>' \
  --ingress external \
  --target-port <コンテナ内の待受ポート> \
  --min-replicas 0 --max-replicas 1 \
  --cpu 0.5 --memory 1Gi --revisions-mode single
```

CPU・メモリは最初の目安で、必要量に合わせます。公開イメージの取得用パスワードは不要です。この操作はAzureリソースを作成します。[CLIの仕様](https://learn.microsoft.com/en-us/cli/azure/containerapp?view=azure-cli-latest#az-containerapp-create)

APIキー等が必要なら、対象Container Appの **Secrets** と **Containersの環境変数参照**へ設定します。開発環境から自動同期されません。秘密の値をGit・イメージ・チャットへ含めず、ブラウザ用の公開変数へも入れません。必要な設定、Target port、起動・readinessのprobeが揃ってから起動を判断します。共有・永続データは外部のDBやストレージへ保存し、コンテナ内の一時ファイル・メモリを永続保存先にしません。[Secrets](https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets)・[Health probes](https://learn.microsoft.com/en-us/azure/container-apps/health-probes)

## 5. 公開URLを確認し、記録する

**Revision management** で新しいリビジョンが準備できたことを確認し、概要の **Application URL** を開きます。主要なDoD、URLの直接表示・再読み込み、必要なAPI・実際の認証・共有DBを操作します。起動確認だけで全機能の成功とは扱いません。

起動しなければ、コンテナログ、イメージ取得、待受ポート、必要な環境変数とprobeを確認します。機能が動かなければ再現操作・期待結果・エラーをCopilotへ渡します。

マージ後の記録用ブランチがまだなければ[次の作業の準備](../README.md#after-merge)を行い、`PLAN.md`へ公開方法、`PROGRESS.md`へURL・コミット・digest・結果・未確認を残します。[保存とPR](../README.md#share)で共有し、[発表と終了](../README.md#finish)へ戻ります。

アプリを更新するときも、変更のPR・CI・マージ、手順3のテストと公開を経て、成功した新しいdigestだけを配置します。

```bash
az containerapp update \
  --name '<チームのアプリ名>' \
  --resource-group '<チームのResource group>' \
  --image 'ghcr.io/<所有者>/<名前>@sha256:<今回成功したdigest>'
```

更新後もリビジョンと公開URLを確認します。変化する`latest`タグや別のビルドへ置き換えません。GitHub ActionsからAzureまで自動化する場合は、この経路が動いてからOIDCを追加します。mainにはその接続は未設定です。[Actionsからのデプロイ](https://learn.microsoft.com/en-us/azure/container-apps/github-actions)

<a id="finish"></a>

## 6. 利用を終了・継続する

公開を続けるかをチームで決めます。不要なアプリ・環境・関連サービスはAzure portalで削除します。チーム専用Resource groupごと削除する場合も、残すDBやデータがないか先に確認します。Codespaceを停止してもAzureのリソースは消えません。

継続する場合は担当を決め、**Cost Management** で使用額・残額を確認します。0レプリカでもDB・ログ・通信・外部AI等の費用は別に確認します。[Container Appsの課金](https://learn.microsoft.com/en-us/azure/container-apps/billing)

[全体の流れ](../README.md) · [公式情報](references.md)
