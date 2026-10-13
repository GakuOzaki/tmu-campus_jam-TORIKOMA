# 教材の検証記録

参加チームのアプリの完成記録は[verification.md](verification.md)へ残します。以下は教材自体の検証記録です。

## 2026年10月13日：新規チームの開始手順をFork方式へ変更

main `60f4473` と初心者向け `cc2b97d` を基に、新規チームの標準をFork方式へ変更しました。チームで1つのPublic Forkを作り、コースごとの取得ブランチ・既定ブランチ、メンバー招待、Actions有効化、チーム側を送り先とするPRへつなぎます。mainはCIがまだない初期状態と、CIを追加した後の実行許可・結果の確認を分けています。運営の案内時だけ使うSync forkも補足しました。

公式仕様と教材・CI設定を照合し、相対リンク・見出し・差分を検査しました。起動や公開の設定は変更していません。**Forkの新規作成からActions有効化・チーム内PRまでのGUI実機確認と、学生アカウントでの確認は未実施です。** 以下のTemplate方式の実機結果は当時の履歴として残し、Fork方式の成功実績には読み替えません。

## 2026年10月13日：全教材の順序・再開・引き継ぎを再確認

main `d1ccb64` と初心者向け `6ae7b22` を基に、READMEから全教材、共通指示・Skills、App・Codespacesの設定、PRテンプレート、実行・CI設定を照合しました。両コースのCodespaces、AppでPC実行、Appで編集してCodespaces実行の計6経路を、企画から発表後の保存・停止まで文書上でたどりました。企画済み・計画保存済み・開発途中・マージ後からの再開と、任意公開の分岐も対象です。

画面PNGと操作メモの渡し方、Planの合意内容を保存してから実装へ進む順序、初回生成前の「未作成」表示、起動済みアプリの再利用、マージ後に編集する前のブランチ準備を補足しました。READMEの工程表には3つの図解を読む場面を示し、各資料から元の作業へ戻れるようにしました。

相対リンクのファイル・見出し・明示アンカーとREADMEから各教材への到達性を確認しました。PRテンプレートはPR作成時、運営ガイド・公式根拠・この検証記録は配布準備や根拠を調べる際に使います。記録用文書は進行に合わせて更新し、学生に資料一式の通読や事前記入を求める構成にはしていません。両コースの変更は別担当のレビューでも照合しています。

**今回の確認は文書の整合性と導線の監査です。アプリの再生成・実機再テスト、学生アカウントやAzureでの検証は行っていません。** 起動・テスト・公開の設定は変更しておらず、以下の実施日ごとの結果と残る確認を区別します。

## 2026年10月13日：Copilot app・PC実行の共有検証記録を照合

10月11日に実施されたGitHub Copilot app 1.1.28のレポート、検証文書、Setup／Runの再現記録とCIログを、共有資料 `hackathon-verification-all-20261013.zip` から受領し、内容を照合しました。**共有記録では、PC編集・PC実行の経路を企画から終了まで完了しています。** 今回は既存の証拠を確認したもので、アプリの再生成や動作テストの再実行はしていません。

GitHubの **Use this template** でmainのみを複製し、Appの **Add GitHub repository** から開いた検証です。初期ツリーは配布元main `11f13ab` と一致したとの記録があり、締切管理の転記メモと画面要件PNGから、過去のアプリを持ち込まずに生成しています。実行場所はPC、Current checkout、Plan／Interactive、Autoでした。

| 工程 | 共有記録で確認した結果 |
| --- | --- |
| 企画・保存・生成 | `prepare-project`と入力資料を参照し、Vanilla JS ES modules＋Vite＋localStorageを選択。Planを終了してproduct・development・tasksへ合意を保存し、アプリ・単体テスト・Playwright・CIを生成した |
| 実操作・レビュー修正 | 登録、締切順、提出済み、再読み込み保存、入力エラー、390px幅、取消を操作。別タブ・同時保存、日付更新、長文表示、フォーカスと提出ボタン名の問題を修正し、回帰テストの修正前失敗・修正後成功を記録した |
| Setup／Run | Repository configurationで設定を確認・適用し、GUIのSetupで依存関係を準備。RunからApp内Browserを自動表示し、保存データと操作を確認した |
| GUIでの共有・CI・マージ | Commit changes → Push changes → Create PRを実施。Commit changesはチャットへ依頼を送り、Copilotが検査・処理する動作だった。アプリPRをマージ後、終了記録はGitHubの **Compare & pull request** から別PRとして作り、CI成功後にマージした |
| 最終デモ・振り返り・停止 | マージ後に登録・締切順・提出済み・再読み込みを実演。3つの工夫の振り返りと引き継ぎを保存・共有した。GUIのStop Run後、接続拒否と待受ポートがないことを確認した |

PCでの確認は **Node.js 22.22.1** です。Node 24の導入はHomebrewの競合ロックで完了しておらず、PCでNode 24を確認した実績にはしません。一方、[終了記録PR #2](https://github.com/mochan-tk/hackathon-rehearsal-copilot-app-20261011/pull/2)の対象 `12094a9` の[最終CIログ](https://github.com/mochan-tk/hackathon-rehearsal-copilot-app-20261011/actions/runs/38124889969/job/114427101743)では、**Node.js 24.21.0、単体5件成功・失敗0・skip 0、E2E17件成功（13.7秒）**を同梱ログと照合しました。終了記録までの最終マージは `075f5b6` です。[当時の検証文書](https://github.com/mochan-tk/hackathon-rehearsal-copilot-app-20261011/blob/12094a99a294dc709e43c0b7dafd76b72f9284d3/docs/verification.md)も参照できます（検証用リポジトリとCIにはPrivateのアクセス権が必要です）。

別途共有された**Setup／Runの23枚の画面記録は、完成済みアプリから設定を再作成した再現確認**です。設定を退避し、依存関係未導入の複製から、Copilotへの依頼 → Review・Accept → GUIのSetup → Run → Browser操作 → Stop Runを確認しています。設定ファイルの比較でも変更は撮影用ポートの `5173 → 5174` のみでした。この再現では、アプリ本体の新規生成、自動テストの再実行、push・PR作成はしていません。

途中でPC実行の依頼にCodespaces専用の禁止条件が混ざり、Copilotが停止した問題は、実行場所を確認して継続しています。[教材PR #7](https://github.com/mochan-tk/hackathon-for-student-20261017/pull/7)で条件を分離し、Appの追加メニューとPlan終了後の保存操作も修正済みです。main `db130f6` に反映されており、今回重ねて同じ修正は行っていません。

今回の教材修正では、[Appの設定・起動手順](copilot-app.md#setup-run)、Commit処理の完了を待ってからPushする案内、Stop RunとTerminalでの終了の使い分けを具体化しました。[検証手順](common/verification.md)には機能に応じて選ぶ境界ケースと、PC・CIの環境を分けた記録を追加しています。25 Markdownの相対参照322件・READMEから教材20文書への到達性・差分の空白を確認し、PC／Codespacesの分岐を独立レビューしました。

操作担当はCodexです。学生本人・別学生の操作、利用者への効果、Copilot Studentの利用権・残量、App編集→Codespaces実行の受け渡し、PCのNode 24、CI失敗artifactのupload／download、PR #7の修正版で新しいsessionを最初から通す確認、Azure公開は未確認です。PC経路の完了は、以下のCodespaces経路の未完走や追加レビュー5点の解消を意味しません。

## 2026年10月11日：mainのCodespaces実機リハーサル（通常経路は完走未達）

**アプリ生成・操作・不具合修正と修正版CIの成功まで確認しましたが、Codespacesの通常経路は完走できませんでした。** 後半にGit／Copilot拡張とTerminalが応答しなくなり、保全先から作った新環境でもremote extension hostのready待ちが60秒でタイムアウトしました。成果と記録はGitHubへ保全し、今回の2環境は停止済みです。新環境での起動、最終ライブデモ、振り返り保存は未実施で、追加レビューの5指摘も残しています。

導線修正PR #4をmainへマージした `37f4fe68a17f107cf0152ed4fd7bca44fd009f4f` を使い、GitHubの **Use this template** から[Privateの検証用リポジトリ](https://github.com/mochan-tk/hackathon-rehearsal-codespaces-20261011)を作成しました。全ブランチを含める設定はOffです。初期コミット `97565c74e237c83c91f9de7b5ba2702e6df96db6` のツリーを独立して比較し、全43 entries（33ファイル・10ディレクトリ）のpath・type・mode・SHA・sizeが一致することを確認しました。**mainをテンプレートのGUIから配布する経路は、今回は実機で確認できています。**

GUIで新しい2-core Codespace（US East）を作成し、VS Code Web 1.141.0、Node.js 24.21.0、Copilot **Local／Auto** で進めました。今回利用した権利はEnterpriseです。Copilot Studentの権利や残量は、この実機確認の対象ではありません。

入力は締切管理ワークシートの共有可能な要点と画面説明を、`docs/source/deadline-brief.md` と `docs/source/screen-spec.png` としてUploadのGUIで配置しました。原本の要点と、再読み込み後の保存・必須入力・取消・390px幅・過去日の扱いに関する今回の追加判断を分けています。参考シートを学生による調査実績としては扱っていません。

| 確認した範囲 | 実際の結果 |
| --- | --- |
| Planでの企画整理 | `prepare-project`が参照された。入力ファイルを具体的に指定した後、実際の画面PNGを読み、2画面・3機能の企画と最小構成を相談できた |
| 合意内容の保存 | Agentへ切り替え、product・development・tasksへ保存。入力2ファイルと正本3ファイルの計5変更で、アプリのコードを作る前に保存できた。D01〜D07・T01〜T03・未作成コマンド・リンクと差分の検査が成功 |
| 新しいチャットへの引き継ぎ | **Keep all → New Chat** で正本4文書と現在の変更を読ませ、「Vite＋素のHTML/CSS/JavaScript、Codespaces、T01未着手」を復元。構成の再質問なしで実装へ進み、`verify-goal`と企画用の画面PNGを参照した |
| アプリと確認方法の生成 | アプリ、Node.js標準テスト、Playwright、PR用CIを生成。テスト先行時の初回exit 1は未作成モジュールが原因で、期待値の不一致を確認した失敗とは区別する |
| Codespaces内の自動確認 | `npx playwright install --with-deps chromium` が成功。続く `npm test && npm run test:e2e && npm run build` のexit 0を実観測。単体テストは展開ログでpass 6・fail 0を確認。E2E 7件という件数は、後述の初回CIログでも独立確認した |
| 起動とプレビュー | **Ports → 5173（Private）→ Open in Browser** から表示し、CodexがGUIで実際に操作した |
| 入力・取消・保存 | 空欄3項目と空白だけの授業名を拒否。取消で0件を維持し、再入力画面は空欄。10/22・10/20・10/21の順で登録しても20日・21日・22日の順に並び、選んだ1件だけを提出済みにした後、再読み込みしても残る2件を維持した |
| 日付とキーボード操作 | 当日10/11の課題A・Bは登録順を維持。翌日10/12は「あと1日」、過去日10/10は「1日超過」。取消・Enter操作とヘッダーの一覧リンクを確認した |
| スマートフォン幅 | 390pxで長い日本語の折り返し、登録、提出済みを操作。`clientWidth` と `scrollWidth` がともに390で、横方向のはみ出しなし。確認後は通常幅に戻した |
| 結果をCopilotへ返す | 実画面の結果と未確認事項をステアリングとして送り、検証記録への追記を依頼した。観測した範囲でerror/warnはなかった |
| GUIでの共有と初回CI | `5fa130464cde0d438b92e83030bce29d1ac4f4b4` をGUIでcommit・pushし、[検証用PR #1](https://github.com/mochan-tk/hackathon-rehearsal-codespaces-20261011/pull/1)を作成。[初回CI](https://github.com/mochan-tk/hackathon-rehearsal-codespaces-20261011/actions/runs/38115052459/job/114398175410)は14:31:23〜14:32:16（日本時間）に成功。監査担当がログで単体6件（失敗・skip 0）、ChromiumのE2E 7件成功、ビルド成功を独立確認した |

Codespaces内での自動確認の連続実行は11.677秒、Vite 8.3.4のビルドは380msでした。この実行時間は今回の環境での観測値です。CodexによるGUI操作を、学生本人の操作確認や使いやすさ・課題解決の評価としては扱いません。保存失敗時のGUI操作は未実施で、自動テストの確認範囲も後続のレビュー対象です。

実機で見つかった補足は次のとおりです。

- 初回はPlanが見えず、拡張の準備待ちと再読み込みの後に表示された。追加設定や拡張機能の追加導入はしていない。Workspace Trustは既存の起動手順の案内で対応できた。
- 初回のチャットで「MCP拡張機能をアクティブ化しています… スキップしますか?」と表示された。今回は外部MCPを使わないため、画面のスキップから進められた。原因を教材と断定せず、この条件に限った短い対処案内を[Codespacesの手順](codespaces.md#planning)へ用意した。
- 企画の画面PNGより先に `docs/images/` の教材図を調べた。画面案と誤認したかは未確認。入力の具体的なパスと教材図の役割を伝え直すと、企画用のメモとPNGを参照できた。[元資料の置き方](source/README.md)と両環境のPlan依頼に、使うファイルの具体的な指定を加えた。

初回CI成功後にコードと仕様を独立して照合し、次の3点を見つけました。Copilotへ、問題を検出するテストの失敗を先に確認してから修正・再検証するよう依頼しました。

- 提出済みの項目が `completed:true` としてlocalStorageに残り、productの「保存からも除く」と一致していない。
- 開いたままの日跨ぎや翌日のタブ復帰で日数表示を更新する契機がない。これは当日の画面を確認した結果とは別の条件。
- trace設定はあるが、CIで失敗証拠をartifactとして保存する設定と取得方法がない。ブラウザテスト採用時はこの準備も行い、取得方法をdevelopmentへ記録するよう、両環境の初回実装依頼と[共通の実装ループ](common/build-loop.md)を補足した。

初めの回帰テストでは4 failed・1 passedを確認しました。その後、同一ブラウザの2タブで古い配列を保存すると別タブのデータを失う問題も見つかり、4件目として回帰テスト先行で修正しました。追加後の7件で修正前の6 failed・1 passed、修正後の7 passed（12.6秒）を実行ログで確認しています。今回は合意した条件の不具合修正であり、新たな仕様追加を完了条件にはしていません。運営ガイドにある仕様変更の演習は未実施です。

Chromeの2タブでも実操作し、修正前はA→Bの登録でAのデータが消えることを再現しました。修正後は初期6件からAで追加して7件、Bで追加して8件となり、両方を保持して他方にも即時表示しました。Bで次の課題を入力中にAの項目を提出済みにしても、フォーム全項目と日付を維持できました。保存後にAを再読み込みし、提出済み項目が復活せず、新しい項目が残ることも確認しています。

修正後は単体6件・E2E14件・ビルドが成功しました。失敗証拠については、タイトル不一致で失敗する一時テストでPNGとtrace ZIPを生成し、PNGの目視とZIPの検査成功を確認しました。その一時テストを除去した後もE2E14件が成功しています。Copilotは4つの正本文書を更新しました。履歴の整理に残った指摘は後述します。

GUIのステージ待機は2回発生しました。1回目は再接続後に成功して初回pushへ進みましたが、2回目はブラウザの再読み込みと **Developer: Reload Window**、停止・再開でもGitリポジトリのスキャン／拡張のアクティブ化が進みませんでした。Gitのログにステージ実行は見えず、原因は未特定です。保存済みの変更をGitHubの **Export changes to a branch** で `codespace-orange-sniffle-7g9qg6wpwwcwxjr` の `c0083ae411df0f29d60281b474593938783324ea` へ保全し、監査担当が9ファイルの差分を確認しました。元の `feat/first-demo` は初回コミットのままで、旧PR #1は未マージでClosedにし、保全先から[PR #2](https://github.com/mochan-tk/hackathon-rehearsal-codespaces-20261011/pull/2)を作成しました。

`c0083ae` の[修正版CI](https://github.com/mochan-tk/hackathon-rehearsal-codespaces-20261011/actions/runs/38116591370/job/114402582856)は14:59:48〜15:00:31（日本時間）に成功し、単体6件（fail・skip 0）、E2E14件（13秒）、ビルド成功を確認しました。生成アプリのActions更新後はNode 20の警告も解消しました。**CIの失敗artifactはSkipped・0件で、upload/downloadは未実証です。ローカルのPNG・trace生成成功と区別します。**

保全先ブランチから新しいCodespace `opulent-waffle-9p9vprw7r4fpgww` をGUIで作りましたが、当該フォルダーの信頼確認と再読み込み後もTerminalは空で、アプリを起動できませんでした。新旧環境で同様のremote extension hostの60秒ready timeoutを観測しています。発表用資料へのリンクと3つの図解の表示は確認しましたが、最終ライブデモと振り返り保存は実施できませんでした。

終了時には旧 `orange-sniffle-7g9qg6wpwwcwxjr` と新 `opulent-waffle-9p9vprw7r4fpgww` の両方をStopし、一覧にActive表示がないことを確認しました。旧環境には未コミット表示が残っていますが、変更は上記のExport先へ保全済みです。Terminalからの正常終了は未確認で、Codespace停止により終了しています。最終の検証記録・引き継ぎはGitHubのWebエディターで追記し、`fed623d` の[記録更新後CI](https://github.com/mochan-tk/hackathon-rehearsal-codespaces-20261011/actions/runs/38116937497)も成功しました。通常のCodespaces内での保存手順を最後まで完了したという意味ではありません。

PR #2の追加レビューで残った項目は次の5点です。アプリのPR #2は未マージで保全し、配布前に再開して必要な修正・再確認を行います。

| 項目 | 確認できたこと・残ること |
| --- | --- |
| 生成後のREADME | アプリ生成後も「アプリ・コマンドがない」という教材の初期案内が残る。教材mainの初期状態としては正しいが、生成後は更新が必要。今回、両環境と共通ループの初回実装依頼にREADMEとdevelopmentの案内をそろえる指示を追加した |
| 390pxでの長い授業名 | 改行できない連続英数字では横にはみ出す可能性を静的に指摘。長い日本語のGUI確認とは別条件で、実機での再現は未確認 |
| 保存データの形の検証 | 保存キーのJSONが `{}` や `null` の場合、配列を前提とする処理が失敗する。通常のUIはこの値を生成せず、破損・外部変更時の対応が未修正 |
| verificationの履歴表示 | 冒頭の「現在」のE2E7件と、末尾の14件成功の記録が混在。実行結果の捏造ではなく、履歴と現在の見出しの整理が残る |
| 時計を制御するテストの準備順 | `beforeEach`でページを開きタイマーが動いた後に`clock.install`しており、[Playwright公式の順序](https://playwright.dev/docs/clock)と一致しない。今回の14件成功は確認済みだが、テストの安定性を改善する必要がある |

教材側には、入力資料の明示、条件付きのMCP待機スキップ、失敗証拠の保存・取得方法、生成後のREADME更新と、[保存してから復旧する手順](codespaces.md#codespaces-recovery)を反映しました。Copilot Studentでの操作、学生本人の操作・利用仮説、仕様変更の演習は未実施です。Azureへの公開は今回の対象外です。今回の結果を「不備なし」や通常経路の完走としては扱いません。

## 2026年10月11日：教材を順にたどる導線の確認

図解追加を両コースへ反映した状態（main `9c4032c`、初心者向け `f04ee38`）を基に、READMEから全教材・共通指示・Skills・記録欄を読み、次の6経路を文書上でたどり直しました。

- main／初心者向けのそれぞれで、Codespaces、Copilot appでPC実行、Copilot appで編集してCodespaces実行。
- 企画をこれから作る場合、記入済み資料がある場合、計画や実装を再開する場合の開始位置。
- 企画・画面案 → 資料準備 → Plan → 合意した記録の保存 → 実装・検証 → 別の学生の操作 → 保存・PR・CI → 発表・振り返り → 引き継ぎ・停止。

見つかった問題は、資料へのリンクがあっても読む場面が明示されないこと、共通ガイドから戻る先の不足、企画整理や依頼の重複、発表と終了の手順の不足でした。図解を使う段階へ接続し、環境ガイドを本線にして共通資料から同じ作業へ戻る形に修正しました。mainで技術構成の理由をproductへ書かせていた2か所も、developmentへ統一しました。

| コンテンツ | 本線で触れる場面・役割 |
| --- | --- |
| [全体図とREADME](../README.md)、[コース選択](choose-start.md) | 現在地を確認し、企画済み・環境準備済みなら途中から始める |
| [企画手順](common/ideation.md)、[締切管理の例](examples/deadline.md) | 課題・解決策・画面案を作る。例は自分たちの企画や調査実績と区別する |
| [元資料](source/README.md)、[コンテキスト図](common/ai-development-tips.md#context-engineering) | Copilotへ渡す直前に、保存場所と正本を確かめる |
| [プロンプト図](common/ai-development-tips.md#prompt-engineering)、prepare-project | 各環境のPlanで、4項目の依頼から企画と計画を整理する |
| [product](product.md)、[development](development.md)、[tasks](tasks.md) | 合意後に保存し、実装・変更・再開時に使う。developmentはmainの正本 |
| [ハーネス図](common/ai-development-tips.md#harness-engineering)、[開発環境](common/local-development.md)、[実装ループ](common/build-loop.md) | 実装開始時に、動かす・確認する・直す方法をそろえる |
| [検証手順](common/verification.md)、verify-goal、[検証記録](verification.md) | 実際の操作とDoDを照合。未達は実装へ、確認後は環境ガイドの保存・PRへ戻る |
| [発表と終了](common/presentation.md) | 記録からデモと説明を準備し、3つの工夫を振り返り、発表後に保存・停止する |
| [公開](common/publish.md)、[Azure初期設定](common/azure-setup.md) | 継続共有したいチームだけの任意分岐。公開後の確認から発表へ戻る |
| [運営ガイド](facilitator.md)、[公式根拠](references.md)、この検証記録 | 運営の準備と、必要なときの根拠確認。学生の必須通読にはしない |

mainの25 Markdown、初心者向けの24 Markdownを対象に相対リンク・見出し・明示アンカーとREADMEからの到達性を確認しました。独立した再レビューで、図解を発表の振り返りから開いた場合の戻り先、実装途中の節へ直接移った場合の依頼重複も修正しています。概要図と3つの図解は、該当する教材から参照されます。

この確認は教材の順序・内容・リンクの確認です。Copilotでのアプリ再生成、学生アカウントの操作、Azure配置を今回やり直したという意味ではありません。以前の実機結果と未確認事項は、以下の実施日の記録を参照してください。

## 2026年10月9日の確認

## 今回の2コースへの変更

| コース | 初期状態 | 確認する範囲 |
| --- | --- | --- |
| main | アプリなし。企画資料、Copilotの指示・Skills、開発環境を配布 | 文書・リンク・設定の整合と、構成選択→アプリ生成の手順 |
| codex/beginner-starter | React・TypeScript・Vite・Nodeのアプリ、テスト、Docker・CIを配布 | 文書・ブランチ選択に加え、実際の起動・テスト・コンテナ |

mainは、企画に合う最小構成を選び、最初の実装でアプリ・必要なテスト・CIを作るコースです。配布時点ではアプリの起動やテストを実行できません。教材の確認と、学生が生成したアプリの確認は区別します。

### mainの文書・設定

アプリ本体・パッケージ設定・固定の起動／テスト／公開設定を除き、Dev Containerの自動インストールと固定ポートも外しました。準備→構成選択→生成→確認の順に、両環境の手順、共通指示、Skillsを照合しています。

採用技術・理由・準備／起動／確認方法は[development.md](development.md)へ集約します。コードがない段階のコマンドを実行させず、未作成・未実行のCIを成功扱いにしない説明にしています。プロンプト・コンテキスト・ハーネスの[解説と公式出典](common/ai-development-tips.md)は維持しています。

24文書の相対リンク・見出し175件、Dev ContainerのJSON、2つのSkillsのfrontmatter、削除した設定への参照を検査し、問題がないことを確認しました。独立したレビューで、技術構成の保存先と、運営ガイドのコースごとの参照先も統一しました。これらの静的確認を、CodespacesやCopilotでの実機確認とは扱いません。

### mainのCodespaces実機リハーサル

2026年10月9日、main向けの変更`263e01b`を[Privateの検証用リポジトリ](https://github.com/mochan-tk/hackathon-rehearsal-main-20261009)へ複製し、新しい2-core Codespaceで試しました。配布元のmainへは未マージのため、対象コミットの`git archive`から検証用mainを作成しています。**テンプレートのGUIから新しいチーム用リポジトリを作る配布経路は、この確認に含みません。**

開始時にはアプリ、`package.json`、起動設定、CIがないことを確認しました。締切管理のワークシート記入例から匿名化した要点だけを`docs/source/`へ追加し、以前のアプリや完成済みの企画・作業計画は持ち込んでいません。入力資料は記入例であり、実際の学生調査とは区別しています。

VS Code WebのCopilot **Local／Auto**で、教材の4項目の依頼文を使ってPlan→Agentを実行しました。`prepare-project`が参照され、React＋Viteなどとの比較から、**HTML・CSS・JavaScriptとNode.js標準機能の配信サーバー**を選びました。React・Vite・API・DB・Dockerを追加せず、ブラウザのlocalStorageで保存する構成です。

| 確認した範囲 | 実際の結果 |
| --- | --- |
| 企画・構成・作業の整理 | Planで完成条件と対象外を提案し、合意後にAgentがproduct・development・tasksへ保存 |
| アプリ・確認方法の生成 | Copilotがアプリ、`node:test`の単体テスト、Playwrightのブラウザテスト、PR用CIを生成。未実装時にテストが失敗することも確認 |
| Codespaces内の自動確認 | 単体テスト32件、ブラウザテスト14件が成功。GitHub上のCI成功とは区別 |
| 起動とプレビュー | 記録した起動方法で4173番ポートを開き、Privateの転送URLから表示 |
| Copilotとは別のAIによる実画面の操作 | Codexが空の一覧、登録、期限順の並び替え、選んだ1件だけの提出済み削除、再読込後の保存を確認 |
| 入力・表示・操作 | 空欄・空白だけの入力の拒否とエラー時のフォーカス、キャンセル、前後空白の除去、今日・残り日数・期限超過、キーボード操作を確認 |
| スマートフォン幅 | 390px幅で長い日本語の折り返しと登録・キャンセル・提出済み操作を確認。画面幅と内容幅がともに390pxで、横方向のはみ出しなし |

上記の内容を、検証用の`feat/first-demo`でVS CodeのGUIから **Stage → Commit → Publish Branch** と操作し、`aa697d1`として保存・pushしました。GitHubのGUIで[検証用PR #1](https://github.com/mochan-tk/hackathon-rehearsal-main-20261009/pull/1)を作成し、[初回CI](https://github.com/mochan-tk/hackathon-rehearsal-main-20261009/actions/runs/37913435390/job/113763788476)でも単体32件・ブラウザ14件が成功しました。Codexによる操作を学生本人の手動確認や使いやすさ・課題解決の評価としては扱いません。

その後の独立したコードレビューでは、CIと開発手順の`npm exec`に引数を区切る`--`がなく、Playwright用の`--with-deps`がnpm側で解釈される問題と、タブを開いたまま日本時間の日付を跨ぐと残り日数の表示が更新されない問題を検出しました。2点をCopilotへ返し、修正しました。日跨ぎ・タブ復帰の回帰4件は修正前の失敗から修正後の成功を確認し、既存の関連5件も成功。入力途中の内容・エラー・フォーカス・保存データを保つことも確かめています。

修正をGUIでcommit・pushした`b59d868`の[修正後CI](https://github.com/mochan-tk/hackathon-rehearsal-main-20261009/actions/runs/37914592137/job/113767587354)では、正しいOS依存の準備、単体32件・ブラウザ18件が成功しました。独立した再レビューで2点の解消を確認し、実画面でも再読み込み後の保存・日数表示・登録画面からのキャンセルを確認しました。これにより、生成後のレビュー→修正→再検証→GUIで共有する流れまで実施できました。

終了時にはサーバーのTerminalをGUIで終了し、今回作成した`opulent-enigma-9764ppgg56hp96q`を **Stop codespace** で停止しました。一覧でActive表示が消え、未保存の変更がないことを確認しています。今回のブラウザ操作では`Ctrl+C`だけでの正常終了は確認できず、Terminalの「強制終了」を使用したため、`Ctrl+C`の成功実績には含めません。アプリとCIの実装・修正はCopilotが行い、停止後の最終記録はCodexが追記しました。

実機確認で見つかった教材の補足は、次の2点を[Codespacesの手順](codespaces.md)へ反映しました。

- 初回は拡張の準備が終わるまでPlanが表示されない場合があり、サインインと準備状況を確認して選択欄を開き直す案内を追加。
- PlaywrightでChromium本体だけを入れると、Linuxの`libnspr4.so`不足で起動できなかった。CopilotがOS依存パッケージを追加して復旧し、テストが成功。Playwrightを採用した場合に限り、初回の`install --with-deps chromium`相当の準備と、その手順をdevelopmentへ残す説明を追加。

### 初心者向けの実行確認

準備済み構成は教材の基準コミット`d1a16f2`から、[codex/beginner-starter](https://github.com/mochan-tk/hackathon-for-student-20261017/tree/codex/beginner-starter)へ保存しました。参加者のコピー・デフォルトブランチ・PR先と、公開ワークフローの実行条件を、この選択に合わせています。

コミット`abcd396`で次を確認しました。

- macOS／Node.js 24.19.0で依存関係の再インストール、lint・型・本番ビルド、PC幅・390px幅のE2E計6件が成功。
- 隠しフォルダー配下の作業環境で、SPAの直接表示が404になる問題を再現。配信ルートを明示する1行の修正後、同じ基盤テストを含む6件が成功。
- `actionlint`、相対リンク・見出し169件、デフォルトブランチを含むワークフロー条件12パターンを確認。
- [GitHub Actions](https://github.com/mochan-tk/hackathon-for-student-20261017/actions/runs/37904996059)でも、Linux/amd64コンテナのビルド・起動・本番コンテナへのテストが成功。OIDC表示・イメージ公開・Azure配置はスキップ。

初心者向けの詳細な過去の記録は[そのブランチの検証記録](https://github.com/mochan-tk/hackathon-for-student-20261017/blob/codex/beginner-starter/docs/template-validation.md)を参照してください。

## 過去のCodespaces実機リハーサル

同日、変更前の準備済み教材`7aa1202`を別のPrivateリポジトリへコピーし、締切管理のワークシート記入例からCopilot Local／AutoでPlan→Agentを実行しました。原本PDFをGitへ入れず、共有可能な要点と追加判断を区別して使用しています。

新しい2-core Codespace、VS Code Web、Node.js 24.21.0で、企画整理、実装、GUIのcommit・push、PR、レビュー後の修正まで進めました。[最終CI](https://github.com/mochan-tk/hackathon-rehearsal-deadline-20261009/actions/runs/37890504488)で、本番コンテナと38件のE2Eが成功しています。別のAIによる実画面の操作も行いました。学生自身の利用評価や、mainの新しい生成経路の検証ではありません。

変更前の監査・不具合修正の詳細は[基準コミットの記録](https://github.com/mochan-tk/hackathon-for-student-20261017/blob/d1a16f28604c89c99e8fab88d270f6744fa7cef0/docs/template-validation.md)に残しています。

## 配布前に残る確認

- 今回のmainリハーサルの再開。実行環境の不調の確認、上記PR #2の追加5指摘への対応、新環境での起動、最終ライブデモ・振り返り保存を実施する。
- [コース選択](choose-start.md)に沿った両コースの新しいPublic Fork作成、取得ブランチ・既定ブランチ・メンバー招待・Actions有効化、チーム内PRの送り先とCI実行の確認。mainでは初回CI追加後も確認する。以前のTemplate方式の作成結果は、このFork経路の実績に含めない。
- 学生がmainコースで同じ流れを実施し、別の学生による手動確認と使いやすさ・課題解決の評価を行う。
- 学生アカウントの利用権利・残量、Copilot Studentでの両開発経路。
- Copilot appのGUIでcommit・pushし、CodespacesのGUIでPullして実行し、結果をAppへ返す一連の操作。
- 新しい公開設定の生成、GHCRの公開範囲の設定、Azure Container Appsへのdigest指定配置、公開URLの操作。
- 初心者向けの実際のOIDC初期設定・自動デプロイ、Windows／LinuxでのApp、必要な実サービス接続と利用者による評価。

これらは未確認です。[運営向けチェック](facilitator.md)に沿って、実施した日付・環境・対象コミット・結果を追記します。今回のmain実機リハーサルの残る工程を完了し、両コースともFork方式で開始できることを確かめます。
