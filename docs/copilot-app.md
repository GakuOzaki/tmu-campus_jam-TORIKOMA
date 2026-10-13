# GitHub Copilot appで作る

GitHub Copilot appでPC上のファイルを編集する、`main`コースの手順です。動作確認は **PC** または **Codespaces** を選べます。**最初はアプリ本体やSetup／Runの設定がありません。** 企画に合う構成を相談し、起動と確認の方法も一緒に作ります。

**企画 → Appの準備 → 構成と計画の相談 → アプリ作成と検証 → チームで確認 → 発表**

開発中はこのページを順に進め、共通ガイドや図解を読んだら元の手順へ戻ります。PCとアカウントが準備済みなら[手順2](#2-チームのリポジトリをappに追加する)、企画ができてチームのリポジトリもAppに追加済みなら[手順3](#3-作業ブランチと実行場所を決める)から進めます。途中の作業を再開する場合は[再開の手順](common/build-loop.md#resume-work)を使い、計画やアプリを作り直さず続けます。

## 1. PCとアカウントを準備する

次を準備します。

- [Git](https://git-scm.com/downloads)
- [GitHub Copilot app](https://github.com/features/ai/github-app)
- Copilot Studentを有効にしたGitHubアカウント

GitHubの[Copilot設定](https://github.com/settings/copilot)で利用権利を確認します。GitHub Proへの加入とCopilot Studentの有効化は別です。Gitの名前とメールが未設定の場合は、最初のコミット時に案内に沿って設定します。

**Codespacesでだけ実行する場合、PCへのNode.jsなどの実行環境の導入は不要です。** PCで実行する場合は、手順4で構成を選んでから必要なものを準備します。Node.jsを採用するなら、教材のCodespacesと同じ24 LTSが選択肢です。

Codespacesで実行する場合は、AppでPC上のファイルを編集し、GitHubへのcommit・pushでCodespacesへ変更を渡します。既存のCodespaceへ直接接続する手順ではありません。

## 2. チームのリポジトリをAppに追加する

1. [企画の進め方](common/ideation.md)の手順1〜5で、誰の何を解決するかと画面案をチームで決め、このページへ戻ります。企画済みならその資料を使います。文書整理は、このガイドの[手順4](#planning)で行います。
2. [コースの選び方](choose-start.md)に沿って、`main`コースのチーム用リポジトリを作ります。作成済みなら、そのリポジトリを使います。初心者向けを選んだ場合は、そのブランチのガイドに従ってください。
3. ほかのメンバーも編集する場合は、所有者が **Settings → Collaborators** から招待します。
4. Copilot appで **Sign in to GitHub** を選び、今回使う学生アカウントにログインします。
5. **Projects** 横の追加ボタンから **Add GitHub repository** を選び、チームのリポジトリを検索して選択します。自動でcloneが始まるので、完了まで待ちます。
6. 新しいsessionを作り、作業場所を **Local repository**（版によっては **Current checkout**）、モードを **Interactive**、モデルを **Auto** にします。
7. 「README.mdを読み、この教材の構成を確認してください。まだファイルを編集せず待ってください」と送ります。

Autoが表示されない、利用権利や利用上限の表示が出る場合は、アカウント名と表示内容を運営に見せてください。最初は一人が操作し、ほかのメンバーが企画・画面・動作を確認すると進めやすくなります。

## 3. 作業ブランチと実行場所を決める

Appが作業用ブランチを作成済みの場合は、そのブランチを使います。まだ `main` で作業している場合は、Terminalを開いて作業ブランチを作ります。session開始後にチャットで `/terminal` と入力しても開けます。

```sh
git switch -c feat/first-demo
```

すでに同名のブランチがある場合は `git switch feat/first-demo` で戻ります。複数人が編集する場合は作業ごとに別の名前にします。

チームで実行場所を選びます。

| 選ぶ経路 | 進め方 |
| --- | --- |
| PCで実行 | 採用する言語・ツールをPCへ準備し、AppのTerminalやBrowserで確認する |
| Codespacesで実行 | PCでは編集し、学生がAppからcommit・push。Codespacesで起動・テスト・ブラウザ確認し、結果をAppへ返す |

まだSetupやRunは実行しません。`main`には `.github/github-app.yml` もアプリのコマンドもありません。**Runをpackage.jsonの自動読み込みに任せる前提にはせず、PCでのコマンドが確定した後で必要な設定を作ります。**

<a id="prepare-materials"></a>

## 4. 資料を渡してPlanで計画する

[元資料の置き方](source/README.md)に沿って `docs/source/` へ、共有してよい企画メモや画面PNGを入れます。Figmaの画面はPNGと操作・遷移の説明でも渡せます。[締切管理の例](examples/deadline.md)も参考にできます。

[コンテキストの図解](common/ai-development-tips.md#context-engineering)で元資料と決定事項の置き場所を確かめ、資料が揃ったら[この下のPlan](#planning)へ進みます。

<a id="planning"></a>

[プロンプトの図解](common/ai-development-tips.md#prompt-engineering)で「目的・文脈・制約・完成条件」の役割を確認し、この手順へ戻ってモードを **Plan** に切り替え、次を送ります。「実行場所」の一行は、選んだ方だけを残してください。

送る前に、文脈の「今回の入力資料」を[実際に置いたファイルのパス](source/README.md#share-screens)に置き換えます。

```text
目的：
企画と画面案を整理し、短い開発時間で完成できる最小構成と実装・検証の計画を提案してください。

文脈：
今回の入力資料：〈docs/source/に置いた実際のファイルパスを列挙〉
指定した入力資料、prepare-projectスキル、docs/product.md、docs/development.mdを読んでください。
docs/images/は教材の説明図です。アプリの画面案として扱わないでください。
このmainコースにはアプリ本体も起動コマンドもまだありません。
編集はこのPCで行います。
実行場所：PC／Codespaces（選んだ方だけを残す）

制約：
曖昧な点は質問し、勝手に機能を増やさないでください。
React + Viteを含め、企画に必要な最小の技術構成を提案し、チームと選んでください。
不要なフレームワーク、API、DB、Docker化を最初から追加しないでください。
このPlanではファイルを編集せず、アプリの実装も始めないでください。

完成条件：
企画・DoD・対象外、採用する構成と理由、小さい実装単位・対応するDoD・確認方法を草案にしてください。
最初の実装単位に、最小アプリ、起動方法、必要なテストとPR用CIの作成を含めてください。
選んだ実行場所に必要な準備と未決定の点を示し、チームが確認できる計画にしてください。
```

スキルが認識されない場合は、`.github/skills/prepare-project/SKILL.md` を読んで進めるよう伝えます。`@`で必要なファイルを追加することもできます。

対象者、最初に通す操作、完成条件、採用構成をチームで確認し、**Interactive** に切り替えて合意内容を保存してもらいます。

**Review plan** が表示される版では、**Exit plan mode and I will prompt myself** を選ぶとInteractiveへ戻ります。続けて「合意内容を `docs/product.md`、`docs/development.md`、`docs/tasks.md` へ保存し、アプリの実装はまだ始めないでください」と依頼します。

| ファイル | 残す内容 |
| --- | --- |
| [product.md](product.md) | 企画・DoD・対象外 |
| [development.md](development.md) | 採用構成、必要な準備、編集・実行場所。コマンドの実行欄は作成まで「未作成」とし、案は計画欄に「予定」と明記 |
| [tasks.md](tasks.md) | 実装順、各作業の確認方法、次への引き継ぎ |

`docs/tasks.md` の引き継ぎ欄にも、PCで確認するなら「編集・実行・ブラウザ確認はPC」、Codespacesなら「編集はPC、実行・ブラウザ確認はCodespaces」と残します。PCで実行する場合だけ、ここで合意した実行環境をPCへ準備します。

Codespacesで実行し、Node.js以外の言語や追加のツールが必要な構成を選んだ場合は、`.devcontainer/` の調整も最初の作業に含めます。準備済みの環境はNode.js 24が基準です。

<a id="implementation"></a>

## 5. Interactiveで実装と確認を繰り返す

[ハーネスの図解](common/ai-development-tips.md#harness-engineering)で「実装・起動・観察・照合・修正」のつながりを確認し、この手順へ戻って次を送ります。

```text
目的：
最初の未完了タスクから実装し、合意した完成条件まで確認と修正を進めてください。

文脈：
docs/product.md、docs/tasks.md、docs/development.mdと、作業に関係するコードを読んでください。

制約：
合意した範囲・構成と、記録した編集・実行場所に従ってください。
commit・pushはこちらがAppの画面で行うので、自動実行せず待ってください。
人の判断、認証、外部サービスの準備が必要なら、その理由と次の操作を知らせてください。
実行していない確認は未確認とし、成功扱いにしないでください。

Codespacesで実行する場合にだけ、次の4点を守ってください。
- 確認できる小さな変更ごとに、変更内容とコミットメッセージ案を示してください。
- Codespacesでの準備・起動・テスト方法も案内し、結果を渡すまで次の修正を待ってください。
- PCで依存関係をインストールしたり、アプリを実行したりしないでください。
- 変更の取り込みは教材のGUI手順を使い、通常手順にGit確認コマンドを追加しないでください。

完成条件：
初回は最小アプリと起動方法、必要なテスト、同じ確認をPRで行うCIを用意してください。
実際の準備・起動・終了・確認コマンドとポート、環境設定をdocs/development.mdへ記録してください。
ブラウザテストを採用する場合は、失敗時の画像・操作記録（Playwrightならtraceなど）とCIのartifact保存を設定し、取得方法も同じ文書へ残してください。
アプリ生成後はREADMEの初期状態の説明を更新し、起動・確認の案内をdocs/development.mdへつないでください。
並び替えなど期待結果が明確な機能は、先にテストを書いて未実装時の失敗も確認してください。
PCで実行する場合は記録した確認を実行し、Codespacesならこちらが返す結果と照合してください。
verify-goalスキルでDoDと実装を照合し、実際の結果をdocs/verification.mdへ残してください。
未達はdocs/tasks.mdへ戻して修正・再確認してください。
```

`verify-goal` が認識されない場合は、`.github/skills/verify-goal/SKILL.md` を読むよう伝えます。**Changes** で変更を確認しながら進めます。

Codespacesで実行する場合、**最初のアプリと確認方法ができたら、その場で[次のGUI手順](#codespacesへ変更を渡して確認する)からcommit・pushし、起動を確かめます。** 以降も **実装 → GUIでcommit・push → Codespacesでpull・確認 → 結果をAppへ返す → 修正** を繰り返します。企画文書だけの時点ではアプリは動きません。

PCで実行する場合は、[起動と終了の共通手順](common/local-development.md#起動する)を確認し、`docs/development.md` の手順に沿って起動・確認します。確認できたコマンドをAppのボタンから実行したい場合は、下の[Setup／Runの手順](#setup-run)へ進みます。Codespacesでだけ実行する場合は、この設定は不要です。

最初の起動と確認ができたら、[共通の実装ループの手順3](common/build-loop.md#3-実装検証修正を続ける)を使って残る機能を進めます。計画や初回生成はやり直さず、Codespacesで実行する場合の依頼文と変更の受け渡しはこのページの手順を使います。チームの完成条件を確かめる段階になったら[手順6](#6-チームの完成条件を確認する)へ進みます。

途中で終了した場合は、[再開の手順](common/build-loop.md#resume-work)で前回のブランチと記録から続けます。Codespacesで実行するチームは、引き続き下の受け渡し手順を使います。教材の「完成条件まで進める」は確認と修正の繰り返しであり、session終了後の自動再開を前提にしていません。

<a id="setup-run"></a>

### PCでSetup／Runを設定して使う

**アプリを作り、PCでの準備・起動方法を確認した後**に行います。Interactiveで次を依頼します。

```text
目的：
PCでの準備と起動をAppのSetup／Runから行えるようにしてください。

文脈：
docs/development.md、実際のアプリの設定、確認済みの起動ログを参照してください。

制約：
採用した構成と確認済みのコマンドを使い、Setup／Runは手動実行にしてください。
設定の作成だけを行い、こちらが画面で確認するまで実行・commit・pushは待ってください。

完成条件：
.github/github-app.ymlに必要なSetupとRun、起動ログに合うURL検出とBrowserの自動表示を設定してください。
変更内容を示し、設定を作ったことと実際に起動できたことを分けて報告してください。
```

1. 設定ができたら **Review configuration → Repository configuration** で、Setup／RunのコマンドとBrowserの設定を確認し、**Accept and apply** を選びます。生成された設定を受け入れる前は適用されません。ファイルが更新された場合も確認・受け入れを行います。
2. すでに開発サーバーが動いていれば、そのサーバーを起動したTerminalなどで終了します。同じサーバーを重ねて起動しません。
3. 画面上部の実行メニューから **Setup**（版・表示によっては **Run Setup**）を選び、準備のログが正常終了するまで待ちます。同じ依存関係の準備がこのPCで成功済みなら省略できます。失敗したらログをCopilotへ渡し、準備を直してから進みます。
4. 同じメニューの **Run** を選びます。起動完了のログを確認し、自動表示された **Browser** で操作します。自動表示されなければ、起動ログにある実際のURLをBrowserで開き、developmentの記録と照合します。

**Scriptsが空なら、設定ファイルの作成と受け入れまで完了したか確認します。** package.jsonが存在するだけでSetup／Runも設定済みとは判断しません。コマンドやポートは採用構成に合わせ、ほかのチームの例をそのまま固定しません。[設定の公式説明](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/repository-configuration)

起動できたら、残る機能は[実装ループの手順3](common/build-loop.md#3-実装検証修正を続ける)、完成確認は次の手順6へ進みます。デモを終えて終了するときは **Stop Run** を選びます。停止後もBrowserの画面が残ることがあるため、表示が残っているだけでサーバーが動いているとは判断しません。

## 6. チームの完成条件を確認する

### PCで確認する

同じ変更・同じ環境のサーバーが稼働中なら、そのまま使います。停止中なら作成した起動コマンド、または設定済みの **Run** で起動し、**Browser** で `docs/development.md` に記録したURLを開きます。[確認の進め方](common/verification.md)に沿って、実装した人とは別の学生が操作します。同じPCで交代して構いません。

必須DoDの主要な操作経路、関係する空の状態・入力ミス、スマートフォン幅を確認し、実際の結果を記録します。見た目を直したい場合は、Browserの **Pick & Polish** で要素を選んで伝えることもできます。

自動確認は `docs/development.md` の手順を使います。同じ変更・同じ環境で直前に成功し、記録済みなら再実行不要です。未実施の確認や関連する変更がある場合は実行します。ブラウザテストを採用した場合のインストールも、選んだ環境で行います。

未達なら[手順5](#implementation)へ戻り、チームで完成を確認できたら[手順7](#save-and-share)へ進みます。PCで確認を終えた場合は、次のCodespacesの節を行う必要はありません。

### Codespacesへ変更を渡して確認する

**Codespacesで確かめたい変更ができたら、その場で学生がAppの画面からcommit・pushします。全機能の完成やPR作成まで待つ必要はありません。** PCとCodespacesのファイルは自動同期されないため、**同じチームリポジトリの同じ作業ブランチ**を使います。

1. PC側でファイルを保存し、Appの **Changes** を開きます。見当たらない場合は右パネルの **＋ → Changes** から開きます。表示を **Uncommitted** にし、差分と作業ブランチ名を確認します。
2. **Changesのブランチ操作メニュー（branch actions）→ Commit changes**（版によっては **Commit**）を選び、対象の変更とメッセージを確認します。「最小アプリと起動方法を追加」のように内容が分かるメッセージにします。**チャットへ依頼が送られ、Copilotが差分を確認してコミットする場合は、その処理の完了を待ちます。** クリックしただけでは完了とせず、完了報告とChangesの状態を確認します。すでにコミット済みなら次へ進みます。
3. **commitの完了を確認したら、同じメニューから続けてPush changes（Push）を選びます。** 初回に求められたら、現在の作業ブランチをチームのリポジトリへ公開します。処理完了を待ちます。CommitはPC内への記録、PushはGitHubへの送信です。
4. ブラウザでGitHubの同じチームリポジトリを開き、作業ブランチを選んで最新の変更が反映されたことを確認します。
5. **ここからはCodespacesで動作確認する場合の操作です。** 初回は作業ブランチを選んだまま **Code → Codespaces → Create codespace on（作業ブランチ名）** を選び、準備完了まで待ちます。2回目以降はそのブランチの既存Codespaceを開きます。接続に困った場合は[Codespacesの手順2](codespaces.md#2-codespaceを開く)を参照します。
6. **既存Codespaceを使う場合だけ**、前回のサーバーが動いていれば元のTerminalで終了し、**Source Control → … → Pull** で変更を取り込みます。新規作成直後は不要です。
7. **CodespacesのTerminal** で、`docs/development.md` に記録した依存関係の準備と起動を実行します。依存関係に変更がなければ、その準備を毎回やり直す必要はありません。`.devcontainer/` を変更して既存Codespaceへ取り込んだ場合は、[共通ガイドのCodespacesの準備](common/local-development.md#codespacesで開く)に沿って必要な再構築を先に行います。必要な環境変数もCodespaces側で設定します。
8. **Ports** から、記録した実際のポートの **Open in Browser** を選びます。なければ **Forward a Port** で追加します。初回は最小アプリの起動を、以降は今回の変更に対応する操作と必須DoDを確かめます。公開範囲は **Private** のままで構いません。別の学生もログイン済みの同じPCで交代して確認できます。
9. Codespacesで記録済みの自動確認を実行します。同じ変更・同じ環境で直前に成功し、記録済みなら再実行は不要です。結果・エラー全文・実際の操作結果をPCのAppへ渡し、必要な修正と `docs/verification.md` への記録を依頼します。残る機能や未達があれば[手順5「Interactiveで実装と確認を繰り返す」](#implementation)へ戻ります。修正後もGUIでcommit・pushするところから繰り返します。

最後は[確認の進め方](common/verification.md)に沿って別の学生も操作し、必須DoDと実際の結果を照合します。チームで完成を確認できたら、このページの[手順7](#save-and-share)へ進みます。

別のブランチのCodespaceを再利用する場合は、左下のブランチ名から今回の作業ブランチへ切り替えてからPullします。見当たらなければ作業ブランチから新規作成できます。PullのエラーはCopilotか運営へ渡してください。[公式のGUI手順](https://docs.github.com/en/codespaces/developing-in-a-codespace/using-source-control-in-your-codespace#pulling-changes-from-the-remote-repository)

AppのGUI手順は[v1.1.26以降のbranch actions](https://github.com/github/app/releases/tag/v1.1.26)を前提にしています。[v1.1.27以降は対象が0件のPull・Pushは表示されません](https://github.com/github/app/releases/tag/v1.1.27)。Pushが見えないだけで送信済みとせず、GitHub上の変更で確認します。メニューが見つからなければ、版と画面を運営に見せてください。

通常はPCで編集し、Codespacesで確認すると変更を追いやすくなります。Codespacesでも編集した場合は、そちらもcommit・pushし、PC側の未コミットの変更を整理してからAppの **Pull changes** で取り込みます。環境変数の秘密の値はGitでは引き継がれません。

<a id="save-and-share"></a>

## 7. 変更を保存し、PRから発表へ進む

1. **Changes** で採用する差分を確認します。
2. [上のGUI手順](#codespacesへ変更を渡して確認する)の1〜4で残る変更と検証記録をcommit・pushします。PCで確認した場合も同じです。
3. **Create PR** が表示されればそこから作成し、なければGitHubの **Compare & pull request** を使います。
4. CIが実行され、成功したことを確認します。**アプリ用CIは開発時に作ります。チェックがない、実行されない、skipされたことを成功とは扱いません。** CIの実行URL・対象コミット・結果を [docs/verification.md](verification.md) に追記し、同じGUI操作でcommit・pushします。
5. チームで差分・検証記録・最新チェックを確認し、基準ブランチ（通常は `main`）へマージします。記録の追記だけのコミットでは、その最新チェックをPR上で確認し、CI結果の追記を際限なく繰り返しません。アプリやテストを変更した場合は、影響する確認をやり直して記録を更新します。
6. [発表の準備とデモ](common/presentation.md)へ進みます。企画と検証記録から伝える内容を選び、動くプレビューで発表します。Azureへの公開は、そのガイドから選べる任意の分岐です。

発表と作業を終えたら、AppのRunで起動したサーバーは **Stop Run**、Terminalで起動したサーバーは記録した終了手順で停止します。Codespacesを使った場合は[一覧](https://github.com/codespaces)から **Stop codespace** も選びます。

## 発展：ほかの作業場所

Appには **New working tree** と **Cloud sandbox** もあります。並行作業に必要になったら運営と検討してください。この教材で確認する標準経路はPC上の編集とPC／Codespacesでの実行です。別の作業場所を選ぶ場合は、実行環境の準備や変更の受け渡しも改めて確認します。

[READMEへ戻る](../README.md) · [Codespacesで作る](codespaces.md) · [共通の開発環境](common/local-development.md)
