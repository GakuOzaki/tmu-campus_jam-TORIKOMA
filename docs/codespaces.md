# Codespacesで作る

ブラウザの中でVS CodeとGitHub Copilotを使う、`main`コースの手順です。PCへのNode.jsやDockerのインストールは不要です。まず環境を開き、企画に合う構成を選んでからアプリを作ります。**開いた直後はアプリや起動コマンドがありません。**

**企画 → 環境準備 → 構成と計画の相談 → アプリ作成と検証 → チームで確認 → 発表**

開発中はこのページを順に進め、共通ガイドや図解を読んだら元の手順へ戻ります。企画とチーム用リポジトリが準備済みなら[手順2](#2-codespaceを開く)、Codespaceも開いていれば[手順3](#prepare-materials)から進めます。途中の作業を再開する場合は[再開の手順](common/build-loop.md#resume-work)を使い、計画やアプリを作り直さず続けます。

## 1. チームのリポジトリを作る

1. [企画の進め方](common/ideation.md)の手順1〜5で、誰の何を解決するかと画面案をチームで決め、このページへ戻ります。企画済みならその資料を使います。文書整理は、このガイドの[手順4](#planning)で行います。
2. [コースの選び方](choose-start.md)に沿って、`main`コースのチーム用リポジトリを作ります。すでに作ったものがあれば、そのリポジトリを使います。初心者向けを選んだ場合は、そのブランチのガイドに従ってください。
3. チーム全員が編集する場合は、所有者が **Settings → Collaborators** からメンバーを追加します。

最初の実装は一人が操作し、ほかのメンバーが企画・画面・動作を確認すると進めやすくなります。

## 2. Codespaceを開く

1. チームのリポジトリで **Code → Codespaces → Create codespace on main** を選びます。マシンを選べる場合は、まず2-coreを使います。
2. ブラウザにVS Codeが開き、環境の準備が終わるまで待ちます。
3. Copilot Chatを開き、今回使う学生アカウントでサインインしていることを確認します。**Session Target** が表示される場合は **Local** を選び、開いているCodespaceのファイルとTerminalを使うチャットで進めます。
4. GitHubの[Copilot設定](https://github.com/settings/copilot)で **Copilot Student** の利用権利を確認します。モデルは **Auto** を使います。

初回は環境の構築と接続に時間がかかります。準備の表示やログが進んでいる間は待ちます。長く進まない場合は[Codespaces一覧](https://github.com/codespaces)から開き直します。改善しなければ運営と確認して **… → Stop codespace** で停止し、同じCodespaceを再度開きます。[公式の接続トラブル対処](https://docs.github.com/en/codespaces/troubleshooting/troubleshooting-your-connection-to-github-codespaces)

**Restricted Mode（制限モード）**や信頼の確認が表示された場合は、今回のチームのリポジトリであることと内容を確認して、このワークスペースを信頼します。制限モードではTerminalやAIエージェントが使えないことがあります。[Workspace Trust](https://code.visualstudio.com/docs/editing/workspaces/workspace-trust)

ここでの **Local** はVS Codeのチャットの種類です。実行する場所はCodespacesであり、PCへの実行環境の導入は必要ありません。[セッションの違い](https://code.visualstudio.com/docs/agents/run/agent-harnesses)

この時点では環境だけが準備できています。`package.json` やアプリはまだないので、`npm ci` や `npm run dev` は実行しません。Node.js 24を使える環境ですが、アプリの構成は次の計画で選びます。

Copilot appからpushした変更を確認する場合は、`main`の代わりにその作業ブランチからCodespaceを開き、[Appの確認手順](copilot-app.md#codespacesへ変更を渡して確認する)へ戻ります。企画やブランチを作り直す必要はありません。

<a id="prepare-materials"></a>

## 3. 作業用ブランチと資料を準備する

**Terminal → New Terminal** を開き、作業ブランチを作ります。

```sh
git switch -c feat/first-demo
```

同名のブランチをすでに使っている場合は `git switch feat/first-demo` で戻ります。複数人が編集する場合は、作業ごとに別の名前を使います。

[元資料の置き方](source/README.md)に沿って `docs/source/` へ、共有してよい企画メモや画面PNGを入れます。Figmaを使った場合も、画面PNGと「押すとどうなるか」のメモがあれば進められます。[締切管理の例](examples/deadline.md)も参考にできます。

[コンテキストの図解](common/ai-development-tips.md#context-engineering)で元資料と決定事項の置き場所を確かめ、資料が揃ったらこのページの手順4へ進みます。

<a id="planning"></a>

## 4. Planで企画と作り方を相談する

[プロンプトの図解](common/ai-development-tips.md#prompt-engineering)で「目的・文脈・制約・完成条件」の役割を確認し、この手順へ戻ってCopilot Chatで **Plan** を選び、次を送ります。

送る前に、文脈の「今回の入力資料」を[実際に置いたファイルのパス](source/README.md#share-screens)に置き換えます。

Planが見当たらない場合は、サインインを確認して拡張の準備が終わるまで待ち、モードの選択欄を開き直します。

```text
目的：
企画と画面案を整理し、短い開発時間で完成できる最小構成と実装・検証の計画を提案してください。

文脈：
今回の入力資料：〈docs/source/に置いた実際のファイルパスを列挙〉
指定した入力資料、prepare-projectスキル、docs/product.md、docs/development.mdを読んでください。
docs/images/は教材の説明図です。アプリの画面案として扱わないでください。
このmainコースにはアプリ本体も起動コマンドもまだありません。
編集・実行・ブラウザ確認はCodespacesで行います。

制約：
曖昧な点は質問し、勝手に機能を増やさないでください。
React + Viteを含め、企画に必要な最小の技術構成を提案し、チームと選んでください。
不要なフレームワーク、API、DB、Docker化を最初から追加しないでください。
このPlanではファイルを編集せず、アプリの実装も始めないでください。

完成条件：
企画・DoD・対象外、採用する構成と理由、小さい実装単位・対応するDoD・確認方法を草案にしてください。
最初の実装単位に、最小アプリ、起動方法、必要なテストとPR用CIの作成を含めてください。
未決定の点を示し、チームが確認できる計画にしてください。
```

初回の送信後に「MCP拡張機能をアクティブ化しています… スキップしますか?」で待機した場合、今回は外部MCPを使わずリポジトリ内の資料で進めるなら、画面の **「スキップしますか?」** を選んで続けられます。外部サービスのMCPが必要なチームは、その接続の準備を確認してください。

スキルが認識されない場合は、`.github/skills/prepare-project/SKILL.md` を読んで進めるよう伝えます。

対象者、最初に通す操作、完成条件、採用する構成をチームで確認します。計画がまとまったら **Agent** に切り替え、「合意内容を `docs/product.md`、`docs/development.md`、`docs/tasks.md` へ保存し、アプリの実装はまだ始めないでください」と依頼します。保存先と内容は次のとおりです。

| ファイル | 残す内容 |
| --- | --- |
| [product.md](product.md) | 企画・DoD・対象外 |
| [development.md](development.md) | 採用構成、必要な実行環境、編集・実行場所。作成前のコマンドは「未作成」 |
| [tasks.md](tasks.md) | 実装順、各作業の確認方法、次への引き継ぎ |

Node.js以外の実行環境を選んだ場合は、`.devcontainer/` の調整も最初の作業に含めます。既に同じ内容を合意・保存できていれば、計画をやり直す必要はありません。

<a id="implementation"></a>

## 5. 最小アプリを作り、完成条件まで検証する

[ハーネスの図解](common/ai-development-tips.md#harness-engineering)で「実装・起動・観察・照合・修正」のつながりを確認し、この手順へ戻ってAgentへ次を送ります。

```text
目的：
最初の未完了タスクから実装し、合意した完成条件まで確認と修正を進めてください。

文脈：
docs/product.md、docs/tasks.md、docs/development.mdと、作業に関係するコードを読んでください。

制約：
合意した範囲と採用構成を守り、編集・実行・ブラウザ確認はCodespacesで行ってください。
commit・pushはこちらがSource Controlの画面で行うので、自動実行せず待ってください。
人の判断、認証、外部サービスの準備が必要なら、その理由と次の操作を知らせてください。
実行できなかった確認は未確認とし、成功扱いにしないでください。

完成条件：
初回は最小アプリと起動方法、必要なテスト、同じ確認をPRで行うCIを用意してください。
実際の準備・起動・終了・確認コマンドとポート、環境設定をdocs/development.mdへ記録してください。
ブラウザテストを採用する場合は、失敗時の画像・操作記録（Playwrightならtraceなど）とCIのartifact保存を設定し、取得方法も同じ文書へ残してください。
アプリ生成後はREADMEの初期状態の説明を更新し、起動・確認の案内をdocs/development.mdへつないでください。
並び替えなど期待結果が明確な機能は、先にテストを書いて未実装時の失敗も確認してください。
記録した確認を実行し、verify-goalスキルでDoDと実装を照合してください。
実際の結果をdocs/verification.mdに残し、未達をdocs/tasks.mdへ戻して修正・再確認してください。
```

変更やコマンドの確認が表示されたら、対象と操作を読んで進めます。差分は **Source Control** で確認できます。[起動と終了の共通手順](common/local-development.md#起動する)で開くURLと停止方法を確認し、起動後は `docs/development.md` に記録したポートを **Ports → Open in Browser** で開きます。最初から4280のアプリが動いているわけではありません。

最初の起動と確認ができたら、[共通の実装ループの手順3](common/build-loop.md#3-実装検証修正を続ける)を使って残る機能を進めます。計画や初回生成はやり直さず、チームの完成条件を確かめる段階になったら、このページの[手順6](#6-自分たちでも操作する)へ進みます。

途中でセッションが終わった場合は、[再開の手順](common/build-loop.md#resume-work)で前回のブランチと記録から続けます。Appで編集していた作業をCodespacesで確認する場合は、[Appの受け渡し手順](copilot-app.md#codespacesへ変更を渡して確認する)を使います。

## 6. 自分たちでも操作する

[確認の進め方](common/verification.md)に沿って、実装した人とは別の学生が転送URLでアプリを操作します。必須DoDの主要な操作経路、関係する空の状態・入力ミス、スマートフォン幅を確かめ、実際の結果を記録します。

ポートは **Private** のまま使い、ログイン済みの同じPCで交代して構いません。このURLはCodespaceとサーバーの起動中に使う確認用です。

ブラウザ版Codespacesでは、VS Code Desktopと同じ内蔵Browser Toolsが使えることを前提にしません。採用した構成に必要な自動テストと、人のブラウザ操作で確認できます。

Playwrightを選んだ場合は、ブラウザ本体に加え、LinuxのOS依存パッケージも必要になることがあります。たとえばnpmでPlaywrightを追加し、Chromiumを使う構成なら、初回に `npx playwright install --with-deps chromium` で両方を準備します。採用した構成で実際に使った準備手順を `docs/development.md` へ記録してください。初期環境への自動インストールはありません。[Playwright公式の依存関係の準備](https://playwright.dev/docs/browsers#install-system-dependencies)

同じ変更・同じ環境で直前に成功し、記録済みの自動確認は再実行不要です。未実施の確認や関連する変更がある場合は、記録されたコマンドで確認します。テストの成功だけで全DoDの達成とは扱いません。

未達なら[手順5](#implementation)へ戻り、チームで完成を確認できたら[手順7](#save-and-share)へ進みます。

<a id="save-and-share"></a>

## 7. 保存して共有し、発表する

**Source Control** で差分を確認し、採用するファイルの `+` でステージします。メッセージを入力して **Commit** を選び、そのままGitHubへ送ります。初回は **Publish Branch**、公開済みのブランチでは **Source Control → … → Push** を使います。[公式のGUI手順](https://docs.github.com/en/codespaces/developing-in-a-codespace/using-source-control-in-your-codespace)

GitHubで **Compare & pull request** を開き、チームの基準ブランチ（通常は `main`）へのPRを作ります。**アプリ用CIは最初の実装で作るものです。チェックが表示されないことは成功の証拠ではありません。** 実際に採用した確認が実行され、成功したことを確かめます。

CIの実行URL・対象コミット・結果を [docs/verification.md](verification.md) に追記し、同じGUI操作でcommit・pushします。記録の追記だけのコミットでは、その最新チェックをPR上で確認し、CI結果の追記を際限なく繰り返しません。アプリやテストを変更した場合は、影響する確認をやり直して記録を更新します。チームで差分・検証記録・最新チェックを確認してからマージします。

保存・PR・CIの確認を終えたら、[発表の準備とデモ](common/presentation.md)へ進みます。企画と検証記録から伝える内容を選び、動くプレビューで発表します。Azureへの公開は、そのガイドから選べる任意の分岐です。

発表と作業を終えたらサーバーを終了し、[Codespaces一覧](https://github.com/codespaces)から **Stop codespace** を選びます。ブラウザタブを閉じるだけで停止したとは判断しません。

## つまずいたとき

| 状況 | 次にすること |
| --- | --- |
| 開いた直後にアプリがない | `main`の初期状態です。手順4〜5で構成を選び、最小アプリを作る |
| Source Control・Terminal・Copilotの準備が進まない | [保存と復旧の手順](#codespaces-recovery)へ。保全を確認する前にCodespaceを削除しない |
| プレビューが開かない | 記録した起動コマンド、起動完了の表示、実際のポート転送を確認する |
| 停止後にURLが開かない | Codespaceを再開し、記録したコマンドでアプリを起動する |
| Copilotが資料を見つけない | ファイルを保存し、必要なファイルのパスを明記する |
| テストが失敗する | エラー本文と、期待と違った操作・結果をCopilotへ渡す |
| 実行環境が足りない | 採用構成と`.devcontainer/`を照合し、必要な準備・再構築を行う |
| CodespacesやCopilotの利用上限 | アカウントの残量を確認し、運営へ相談。途中のファイルを保存する |

<a id="codespaces-recovery"></a>

### GitやCopilotが応答しないとき

1. 編集したファイルを保存し、未保存の印が残っていないか確認します。保存できない場合は再読み込みせず、その状態を運営へ伝えます。
2. ブラウザを再読み込みするか、コマンドパレットから **Developer: Reload Window** を選び、準備の表示を確認します。[公式の接続トラブル対処](https://docs.github.com/en/codespaces/troubleshooting/troubleshooting-your-connection-to-github-codespaces)
3. 改善しなければ[Codespaces一覧](https://github.com/codespaces)で該当Codespaceの **… → Stop codespace** を選び、停止を確認してから開き直します。[公式の停止・再開手順](https://docs.github.com/en/codespaces/developing-in-a-codespace/stopping-and-starting-a-codespace?tool=webui)

それでも動かなければ、操作を繰り返さず運営へ相談します。pushできていない変更がある場合は、元のCodespaceを削除せず、運営と次の保全を行います。

一覧の該当Codespaceで **… → Export changes to a branch → Create branch** を選ぶと、現在の作業ブランチの変更を別ブランチへ書き出せます。GitHub上で保全先のブランチと必要なファイル・差分を確認できてから、そのブランチを選んで新しいCodespaceを作ります。ほかのローカルブランチはこのExportの対象外です。[公式の変更のエクスポート](https://docs.github.com/en/codespaces/troubleshooting/exporting-changes-to-a-branch)

保全先のブランチは元のPRを自動更新しません。保全先から作業を続ける場合は、そちらのPRとCIを確認します。新しい環境でも同じ症状が続く場合は運営と対応を決め、起動や確認ができたことにはしません。

PC版VS Codeを使う場合は、Codespaceの **Open in VS Code** から接続できます。

[READMEへ戻る](../README.md) · [Copilot appで作る](copilot-app.md) · [共通の開発環境](common/local-development.md)
