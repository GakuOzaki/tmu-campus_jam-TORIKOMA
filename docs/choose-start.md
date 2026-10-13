# はじめ方を選ぶ

チームで出発点を一つ選びます。企画・完成条件・小さな実装・テスト・人の確認という流れは共通です。使う環境（Codespaces / Copilot app）は、コースを選んだ後に決められます。

| コース | 配布元のブランチ | 入っているもの | 向いているチーム |
| --- | --- | --- | --- |
| 自分たちで構成を決める | `main` | 企画・検証の記録用ファイル、Copilotの指示・Skills、Codespacesの基礎環境。アプリのコードやフレームワークの設定は置かない | 作りたいものに合わせて、Copilotと技術や実行方法から決めたい |
| 初心者向けスターター | `codex/beginner-starter` | React + TypeScript + Vite、Node.js API、起動設定、テスト、Docker・CI・任意のAzure公開手順 | 環境や構成を選ぶ時間を減らし、企画の実装に集中したい |

**初心者向けでも、作る機能や画面は自由です。** 技術構成と起動・検証の方法が用意されています。短い開発時間で迷ったら、このコースから始められます。

## チームのForkを作る

チームの代表者1人が、配布元から **Forkを1つ**作ります。ほかのメンバーはそのForkへ招待されて作業します。メンバーごとに別のForkを作る必要はありません。

**Publicの教材から作るForkもPublicです。** 企画資料やコードは公開してよい内容を使います。Privateが必要なチームは、Forkの公開範囲を変更しようとせず、運営と別の配布方法を相談します。[Forkの公開範囲](https://docs.github.com/en/pull-requests/reference/forks)

チーム用リポジトリが未作成なら、代表者が次のボタンから始めます。コースは作成画面で下の手順に沿って選びます。

[![チーム用にForkする](images/fork-button.svg)](https://github.com/mochan-tk/hackathon-for-student-20261017/fork)

1. 上のボタンでFork作成画面を開きます。[配布元のGitHubページ](https://github.com/mochan-tk/hackathon-for-student-20261017)の **Fork → Create a new fork** からも開けます。
2. 所有者とチーム用のリポジトリ名を決めます。以後、その所有者・名前のリポジトリを「チームのFork」と呼びます。
3. **自分たちで構成を決める場合は、Copy the main branch onlyをオン**にします。**初心者向けの場合は、Copy the main branch onlyをオフ**にして、`codex/beginner-starter`も含めます。**Create fork** を押します。
4. 初心者向けは、作成したチームのForkの **Settings → General → Default branch** の変更ボタンから`codex/beginner-starter`を選び、**Update** を押して確認画面を確定します。管理権限のある代表者が行います。mainコースは`main`のまま使います。
5. チームのForkの **Code** に戻り、所有者・リポジトリ名、ブランチ名、READMEを確かめます。初心者向けなら`package.json`・`src/`・`Dockerfile`も表示されます。ページ上部の`forked from`は配布元へのリンクです。開発するリポジトリはチーム側です。
6. 必要なメンバーを **Settings → Collaborators** から招待し、各メンバーが招待を受け入れます。続けて下のActionsの準備を確認し、選んだコースのREADMEからCodespacesまたはCopilot appへ進みます。

作成済みのチームリポジトリがある場合は作り直さず、選択したコース、既定ブランチ、招待を確認します。以前のTemplate方式で作成したチームリポジトリも、そのまま開発を続けられます。その場合はForkではないため、Sync forkは使わず、教材更新が必要なら運営へ相談します。配布元のどのブランチを表示していたかではなく、Fork作成時の **Copy the main branch only** の設定で含めるブランチが決まります。教材の作業用ブランチが含まれていても、選ぶコースは上の2つです。[Fork作成の公式手順](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/fork-a-repo)・[既定ブランチの変更](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch)

<a id="enable-actions"></a>

## チームのForkでActionsを使えるようにする

Forkで引き継いだGitHub Actionsのワークフローは最初は無効です。代表者が **チームのFork → Actions** を開き、有効化の案内が出たらワークフローの内容を確認して有効にします。使えない場合は **Settings → Actions → General** の許可設定と所有者・Organizationのポリシーを運営と確認します。[Fork内のワークフロー](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflows-in-forked-repositories)

初心者向けには **Check** が用意されています。初回の自動確認を先に試す場合は **Actions → Check → Run workflow** で`codex/beginner-starter`を選び、**OIDC接続情報だけ表示するチェックを外して**実行できます。公開用の変数を設定しなければ`check`だけが動き、コンテナの公開・Azureデプロイはスキップされます。Actionsの有効化のためにAzureを準備する必要はありません。この手動実行は既定ブランチの確認であり、作業中のPRの最新の変更に対するCIの代わりにはしません。mainコースには最初はCIがないため、有効化の案内やワークフローが表示されないことがあります。選んだアプリのCIを実装した後にチーム内PRで確認します。

有効化前にPRを作成していた場合、その時点のCIは実行済みとは扱いません。有効化後もCIが始まらなければ運営とActionsの設定を確認し、この初心者向けの **Check** では同じ未マージPRを **Close → Reopen** して再度開始できます。CIの成功を確認してからマージします。[PRで動くイベント](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request)

<a id="team-pull-request"></a>

## 実装を始めるとき

**選んだコースのブランチから**、`feat/first-demo`などの作業ブランチを作ります。複数人で編集する場合はそれぞれ別の作業ブランチを使います。PRではGitHubの比較画面で次を確認します。必要なら **compare across forks** を開いてリポジトリも選びます。

| 項目 | 選ぶもの |
| --- | --- |
| base repository（統合先のリポジトリ） | **チームのFork** |
| base（統合先のブランチ） | チームのデフォルトブランチ。初心者向けは`codex/beginner-starter`、mainコースは`main` |
| head repository（変更元のリポジトリ） | **同じチームのFork** |
| compare（変更元のブランチ） | 自分の作業ブランチ |

**学生のアプリのPRは配布元へ送りません。** Forkの比較画面では配布元が統合先に選ばれることがあるため、ブランチ名だけでなくリポジトリの所有者・名前も確認します。Appの **Create PR** を使う場合も、作成前に同じ比較先を確認します。送信先を確かめられない場合はGitHubの比較画面から作り、作成後もGitHubで同じ項目を確かめます。

コース同士をマージして統合する手順にはしません。途中でコースを変えたい場合は、未保存の作業を記録してから運営に相談します。以後の「チームのデフォルトブランチ」は、この手順で選んだ統合先を指します。初心者向けの公開ワークフローもチームのデフォルトブランチだけを公開対象にするため、ブランチ名は上の名前のまま使います。

<a id="sync-fork"></a>

## 教材の更新を取り込む場合

**Sync forkは、運営から教材更新の案内があったときだけ**使います。チームの作業をcommit・pushしてから、配布元とチーム側の同じコースのブランチを確認して同期します。mainと初心者向けをまたいで同期しません。[Forkの同期](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/syncing-a-fork)

Sync forkで更新されるのはGitHub上の選択した基準ブランチです。各PC・Codespacesでも最新を取得します。開発途中なら、運営やCopilotと差分を確認して基準ブランチの更新を作業ブランチへ取り込みます。作業ブランチでPullするだけでは、基準ブランチの変更は入りません。前のPRをマージ済みなら、更新済みの基準ブランチから次の作業ブランチを作ります。競合や想定外の差分が出たら、作業を保全して運営へ相談し、変更を捨てたり強制的に上書きしたりしません。

開発の途中なら[保存した作業からの再開](common/build-loop.md#resume-work)、前のPRをマージ済みなら[マージ後の作業準備](common/build-loop.md#after-merge)を使います。

次は、チーム側の選んだコースで使う環境ガイドを一つ開きます。[Codespacesで作る](codespaces.md) ／ [Copilot appで作る](copilot-app.md)。以降はそのガイドを本線にし、参照した共通ページから同じ段階へ戻ります。

[READMEの全体の流れへ戻る](../README.md#企画から発表まで)
