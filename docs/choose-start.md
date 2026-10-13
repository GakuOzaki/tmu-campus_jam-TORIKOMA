# はじめ方を選ぶ

チームで出発点を一つ選びます。企画・完成条件・小さな実装・テスト・人の確認という流れは共通です。使う環境（Codespaces / Copilot app）は、コースを選んだ後に決められます。

企画がまだなら[企画の手順1〜5](common/ideation.md)で課題と画面案を決めてから、このページへ戻ります。作成済みのチーム用リポジトリがある場合は作り直さず、コースと既定ブランチを確認して、そのブランチの環境ガイドを続けてください。

| コース | 配布元のブランチ | 入っているもの | 向いているチーム |
| --- | --- | --- | --- |
| 自分たちで構成を決める | `main` | 企画・検証の記録用ファイル、Copilotの指示・Skills、Codespacesの基礎環境。アプリのコードやフレームワークの設定は置かない | 作りたいものに合わせて、Copilotと技術や実行方法から決めたい |
| 初心者向けスターター | `codex/beginner-starter` | React + TypeScript + Vite、Node.js API、起動設定、テスト、Docker・CI・任意のAzure公開手順 | 環境や構成を選ぶ時間を減らし、企画の実装に集中したい |

**初心者向けでも、作る機能や画面は自由です。** 技術構成と起動・検証の方法が用意されています。短い開発時間で迷ったら、このコースから始められます。

## チームのリポジトリを作る

**チームの代表者が1つのForkを作り、メンバーを招待します。** 開発する全員が個別にForkを作る必要はありません。今回の配布元はPublicなので、チームのForkもPublicです。公開できる企画・画像・ダミーデータを使います。非公開での開発が必要なら、作成前に運営へ相談してください。[Forkの公開範囲](https://docs.github.com/en/pull-requests/reference/forks#visibility-of-forks)

1. [配布元のGitHubページ](https://github.com/mochan-tk/hackathon-for-student-20261017)の右上で **Fork** を選びます。
2. **Owner** にチーム代表者のアカウント、または作成権限のあるOrganizationを選び、チーム用の **Repository name** を入力します。
3. **mainコースなら「Copy the main branch only」をオン**にします。**初心者向けならオフ**にして、`codex/beginner-starter`も取得します。
4. **Create fork** を押し、作成先が `チームの所有者/チームのリポジトリ名` であることを確認します。配布元へのリンクは残りますが、以後の編集先はこのチーム側です。
5. 初心者向けは、チーム側の **Settings → General → Default branch** から`codex/beginner-starter`を選び、**Update** と確認操作を行います。代表者の管理権限で設定します。mainコースは`main`のままです。
6. チーム側の **Code** に戻り、既定ブランチとREADMEを確かめます。初心者向けなら`package.json`・`src/`・`Dockerfile`があり、mainコースには初期アプリがありません。
7. 必要なメンバーを **Settings → Collaborators** から招待します。招待を受けたメンバーも、この同じチームのリポジトリで作業します。
8. 下の[Actionsの確認](#enable-actions)を済ませ、**チーム側で選んだコースのREADME**から環境ガイドへ進みます。

表示しているブランチだけが自動的にForkされるわけではありません。「Copy the main branch only」を外すと全ブランチが取得されます。作業用ブランチが含まれていても、参加者が選ぶコースは上の2つです。[Forkの作成](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/fork-a-repo)・[既定ブランチの変更](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch)

すでに作成済みのチームリポジトリがあれば作り直さず、所有者・選んだコース・既定ブランチを確認します。以前のTemplate方式で作ったチームも、同じリポジトリの作業を続けられます。その場合、後述のSync forkは使いません。

<a id="enable-actions"></a>

## Fork側のActionsを確認する

チーム側の **Actions** を開き、ワークフローの有効化を求める案内が出たら、教材の内容を確認して有効にします。Forkした既存ワークフローは、初期状態では実行されません。[ForkとActions](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflows-in-forked-repositories)

- **mainコース**にはまだCIがありません。一覧や有効化の案内が出なくても、環境準備と実装へ進めます。最初のCIを追加しPRを作った段階で、Actionsの許可と実際の実行結果を確認します。
- **初心者向け**は有効化を済ませ、以後のチーム内PRで **Check** の実行を確認します。Actionsの有効化は、Azure公開の有効化とは別の操作です。

CIが始まらなければ、チーム側のPRになっているか、ワークフローと実行条件、**Settings → Actions → General** の許可を運営と確認します。有効化前にPRを作っていた場合も、過去のイベントが実行済みになったとは判断しません。通常の`pull_request`設定なら同じPRの **Close pull request → Reopen pull request** でも実行されます。mainではCopilotに生成した実行条件を確認してもらってから行います。[PRイベント](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request)

初回準備で読んだ場合は、選んだコースの環境ガイドへ進みます。CIの未実行を調べに来た場合は、元のPRへ戻り、今回の変更に対する新しい実行と結果を確認します。

<a id="team-pull-request"></a>

## チーム内で作業ブランチとPRを使う

選んだコースから`feat/first-demo`などの作業ブランチを作り、チームのリポジトリへpushします。複数人で編集する場合は、それぞれ別の作業ブランチを使います。PR作成画面では次を確認します。必要なら **compare across forks** を開いて、リポジトリも選びます。

| 項目 | 選ぶ内容 |
| --- | --- |
| base repository（送り先） | チームのForkリポジトリ |
| base（統合先ブランチ） | mainコースは`main`、初心者向けは`codex/beginner-starter` |
| head repository（変更元） | 同じチームのForkリポジトリ |
| compare（変更元ブランチ） | 今回pushした作業ブランチ |

配布元の`mochan-tk/hackathon-for-student-20261017`が送り先になっていたら、作成前にチーム側へ変更します。Appの **Create PR** で送り先を事前に確認できない場合は、チーム側のGitHubの比較画面を使ってから作成します。作成後もPRのURLがチームの所有者・リポジトリ名になっていることを確認します。**チームのアプリ開発はチーム内のPRで完結させます。** 配布元への教材改善は運営と相談して別に扱います。

`main`と`codex/beginner-starter`は初期構成が異なるため、コース同士をマージして組み合わせません。途中でコースを変えたい場合は、未保存の作業を保全して運営に相談します。以後の「チームの既定ブランチ」は、ここで選んだ統合先です。初心者向けの公開用ワークフローも、その既定ブランチだけを公開対象にします。

PR作成中に参照した場合は、元の環境ガイドの保存・CI確認へ戻ります。これから開発を始める場合は、チーム側のコースのREADMEから[Codespaces](codespaces.md)または[Copilot app](copilot-app.md)を選び、完了済みの企画・Fork作成は繰り返さず環境準備から続けてください。

<a id="sync-fork"></a>

## 教材の更新を取り込むとき（任意）

運営から教材の修正を取り込む案内があった場合だけ、チーム代表者が進めます。チームの変更を保存・pushしてから、使っているコースのブランチを開き、**Sync fork**で配布元の同じコースから取り込む差分を確認します。競合がなければ **Update branch**、競合や判断に迷う変更があれば運営と確認します。自分たちのアプリを捨てて同期せず、`main`と初心者向けを混ぜません。[Forkの同期](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/syncing-a-fork)

Sync forkで更新されるのは、選んだコースの基準ブランチです。各環境でその最新を取得し、開発の途中ならCopilotや運営と差分を確認して、基準ブランチの更新を作業ブランチへ取り込みます。作業ブランチでPullするだけでは、この更新は入りません。前のPRがマージ済みなら、更新済みの基準ブランチから次の作業ブランチを作ります。競合が出た場合は作業を保全して運営と確認します。

取り込み後は[保存した作業の再開](common/build-loop.md#resume-work)へ戻ります。教材を同期したことだけでアプリを確認済みにはせず、影響のある確認を行います。

[全体の流れへ戻る](../README.md#企画から発表まで)
