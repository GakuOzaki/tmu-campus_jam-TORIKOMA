# 学生ハッカソン：初心者向けスターター

アイデアを、確かめられるアプリへ。

学生チームが目的と完成条件を決め、GitHub Copilotと一緒に実装・テスト・改善するための教材兼テンプレートです。**CodespacesのCopilot ChatとGitHub Copilot appのどちらでも、同じ企画・コード・完成条件で進められます。**

## はじめる

このブランチは **初心者向け（`codex/beginner-starter`）**です。React・TypeScript・Vite・Node.jsと、起動・テスト・任意のコンテナ公開を用意しています。アプリの機能と画面は自分たちで決められます。アプリのひな形を使わず構成から選びたい場合は、配布元の[`main`コース](https://github.com/mochan-tk/hackathon-for-student-20261017/tree/main)を使います。

下の現在地に合わせて始めます。**開発中は、選んだ環境ガイドを本線として上から進み、共通ページを読んだら同じ段階へ戻ります。**

- **企画や画面案がまだない**：[企画の手順1〜5](docs/common/ideation.md)で考え、まとまったら下のコース選択・環境準備へ進みます。
- **チーム用リポジトリがまだない**：[はじめ方を選ぶ](docs/choose-start.md)で作ります。初心者向けは **Include all branches** でコピーし、チーム側のデフォルトブランチを **`codex/beginner-starter`** に変更します。
- **リポジトリを準備済み**：下の環境ガイドへ進みます。企画も決まっていれば、その資料を使い、済んだ作業を繰り返す必要はありません。
- **開発の続きから再開する**：[tasks.mdの引き継ぎ](docs/tasks.md#次のセッションへの引き継ぎ)を読み、使っていた環境ガイドの実装へ戻ります。

| 使う環境 | 最初に開くガイド | 準備 |
| --- | --- | --- |
| Codespaces + VS Code Copilot Chat | [Codespacesで進める](docs/codespaces.md) | GitHubとCopilotが使えるアカウント、ブラウザ |
| GitHub Copilot app | [Copilot appで進める](docs/copilot-app.md) | 同じアカウント、Git、Copilot app。PCで実行する場合はNode.js 24 LTS |

チームのリポジトリ作成とコース選択は上の手順で一度行います。GitHub Copilot StudentとGitHub Proを利用する想定です。権利の有効化と利用残量は事前にアカウント画面で確認してください。

Azureへの自動公開まで行う場合は、[初期設定](docs/common/azure-setup.md)にあるリポジトリの所有者・公開範囲の条件も確認してください。Organization所有のPrivateリポジトリでは、学生個人のGitHub Proだけでは公開に使うEnvironmentを利用できません。

どちらかの環境ガイドを選び、そこから共通手順を参照して進めます。企画やリポジトリの準備を済ませている場合は、その成果を使って続けてください。Copilot appで編集し、Codespacesで実行する経路もAppのガイドに含めています。

## 企画から発表まで

[![ハッカソンの流れ：課題とアイデアを考え、画面を描き、GitHub Copilotと作り、確かめて発表する](docs/images/hackathon-overview.png)](docs/images/hackathon-overview.png)

図は全体像です。実際の進行は、次の表と選んだ環境ガイドに沿います。

| 段階 | 進めること・開く資料 | 次へ渡すもの |
| --- | --- | --- |
| 1. 企画と画面を決める | [企画の手順1〜5](docs/common/ideation.md)、[締切管理の参考例](docs/examples/deadline.md) | 誰の何を解決するか、コア機能、完成条件、画面と操作 |
| 2. 開発の準備をする | [コース選択とコピー](docs/choose-start.md)、選んだ環境ガイド、[元資料の置き方](docs/source/README.md) | チーム用リポジトリ、作業ブランチ、企画メモ・画面PNG・遷移 |
| 3. Planで相談して保存する | 環境ガイドの手順4でprepare-projectを使う | 合意した[企画とDoD](docs/product.md)、[作業計画](docs/tasks.md) |
| 4. 作って、確かめて、直す | 手順5の[実装ループ](docs/common/build-loop.md)、手順6の[完成確認](docs/common/verification.md)とverify-goal | 動くアプリ、機能テスト、別の学生の操作結果、[検証記録](docs/verification.md) |
| 5. 保存・PRで共有する | [Codespacesの手順7](docs/codespaces.md#save-and-share)・[Appの手順7](docs/copilot-app.md#save-and-share) | commit・push、PRとCIの結果、チームへの共有 |
| 6. 発表して終了する | [発表・振り返り・終了](docs/common/presentation.md) | デモ、学んだこと、次の作業、環境の停止 |

企画書などを先に全部手書きする必要はありません。段階1の元資料を入力に、段階3でCopilotに整理してもらい、チームが確認して保存します。既に合意・保存した部分は再利用します。

3つの図解は、資料準備で[コンテキスト](docs/common/ai-development-tips.md#context-engineering)、Plan前に[プロンプト](docs/common/ai-development-tips.md#prompt-engineering)、実装開始時に[ハーネス](docs/common/ai-development-tips.md#harness-engineering)を各ガイドから参照します。継続して使えるURLが必要なチームだけ、発表ガイドから[Azure Container Appsへの公開](docs/common/publish.md)へ分岐します。発表には動くプレビューを使えます。

公式資料は根拠を調べたいとき、運営資料は配布・支援を準備するときに読みます。

## チームで更新する3つのファイル

| ファイル | 残すこと |
| --- | --- |
| [docs/product.md](docs/product.md) | 誰の何を解決するか、できたと判断する条件、対象外 |
| [docs/tasks.md](docs/tasks.md) | 実装計画、今の作業、残っていること |
| [docs/verification.md](docs/verification.md) | 実際に確かめた結果、証拠、未確認のこと |

入力欄はまだ空です。[締切管理の記入例](docs/examples/deadline.md)を参考に、自分たちの企画を記入してください。最初のアプリは起動と入力操作を確認するための小さな画面です。

## 共通のコマンド

Node.js 24 LTSを使います。nvmがある場合は `nvm install`、続いて `nvm use` で `.nvmrc` に合わせられます。

```sh
npm ci
npm run dev
```

**ViteとNode.jsのAPI**をまとめて起動します。PCでは `http://127.0.0.1:4280`、Codespacesではポート **4280** の転送先を開きます。普段の開発にDockerやAzureへのログインは不要です。起動・終了とAPIの追加は[共通の開発環境](docs/common/local-development.md)を参照してください。

Copilot appでPC上のコードを編集し、GitHubへpushして[Codespacesで動かす](docs/copilot-app.md)こともできます。PCとCodespacesのファイルは自動同期されません。

```sh
npm run check
npx playwright install chromium
npm run test:e2e
```

`check` はlint・型チェック・本番ビルド、`test:e2e` は本番用のNode.jsサーバーから画面とAPIを配信してブラウザで操作する確認です。Linuxのブラウザ依存ライブラリが足りない場合は `npx playwright install --with-deps chromium` を実行します。Codespacesでは初回準備に含まれています。

公開時は画面とAPIを1つのコンテナにまとめ、Azure Container Appsへ配置します。GitHub Actionsが本番用コンテナをビルド・起動してテストするため、学生のPCへのDocker導入は必須ではありません。[手元やCodespacesでコンテナを確認する手順](docs/common/local-development.md#コンテナで確認する任意)も用意しています。

`tests/starter.spec.ts` は最初の画面の確認用です。企画を実装するときに、自分たちの完成条件を確かめるテストへ更新します。`tests/runtime.spec.ts` のAPI・画面配信の基盤テストは残して、アプリの機能テストと一緒に実行します。

## Copilotとの進め方

共通指示は [.github/copilot-instructions.md](.github/copilot-instructions.md)。教材に固有の2つの作業をSkillsにしています。

- [prepare-project](.github/skills/prepare-project/SKILL.md)：企画メモと画面案を開発用の資料に整理する。
- [verify-goal](.github/skills/verify-goal/SKILL.md)：完成条件と実際の結果を照合し、残る作業を見つける。

「prepare-projectを使って企画を整理して」のように依頼できます。認識されないときはSkillファイルを添付・参照します。モード切り替えやファイルの渡し方は各環境のガイドにあります。

[図解でわかる：Copilotと開発する3つの工夫](docs/common/ai-development-tips.md)では、プロンプト・コンテキスト・ハーネスエンジニアリングを、3枚の画像と具体例で説明しています。短い依頼例と、失敗したときに何を直すかの例もあります。

## 運営・メンター向け

[事前準備とリハーサル](docs/facilitator.md)に、両環境で確認することをまとめています。[設計の根拠と公式資料](docs/references.md)も参照してください。

[スターターの検証記録](docs/template-validation.md)には、実施した確認と残る確認を記載しています。配布前に、参加者と同じ条件で企画整理から発表・終了まで通してください。Azure公開は採用する場合に追加で確認します。
