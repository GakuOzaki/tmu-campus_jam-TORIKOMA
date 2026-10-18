import { test, expect } from '@playwright/test'
import { writeFile, unlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'

async function chooseDepartment(page: import('@playwright/test').Page) {
  await page.goto('/')
  await page.getByLabel('学部', { exact: true }).selectOption('システムデザイン学部')
  await page.getByLabel('学科', { exact: true }).selectOption('情報システム学科')
  await page.getByRole('button', { name: '講義を見る' }).click()
}

test('初回に学部・学科を選ぶと講義一覧が表示され、選択が保持される', async ({ page }) => {
  await chooseDepartment(page)
  await expect(page).toHaveTitle(/トリコマ/)
  await expect(page.locator('.brand-logo')).toHaveAttribute('src', /image/)
  await expect(page.locator('.brand-logo')).toHaveAttribute('alt', '')
  await expect(page.locator('.brand-logo')).toHaveCSS('filter', 'none')
  await expect(page.locator('.brand-logo')).toHaveCSS('width', '68px')
  await expect(page.locator('.brand-name')).toHaveText('トリコマ')
  await expect(page.locator('.brand-name')).toHaveCSS('color', 'rgb(255, 255, 255)')
  await expect(page.locator('.brand-name')).toHaveCSS('font-family', '"M PLUS Rounded 1c", "Noto Sans JP", sans-serif')
  await expect(page.locator('.topbar')).toHaveCSS('background-color', 'rgb(102, 121, 237)')
  await expect(page.locator('.brand-logo')).toHaveCSS('height', '86px')
  await expect(page.locator('.topbar')).toHaveCSS('height', '86px')
  await expect(page.locator('.topbar')).toHaveCSS('padding-left', '8px')
  await expect(page.locator('.term-pill')).toHaveText('2026')
  await expect(page.getByRole('heading', { name: '講義を探す' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'プロフィールを編集' })).toBeVisible()
  await expect(page.locator('header .profile-avatar > span')).toHaveText('name')
  await expect(page.getByText('情報システム学科', { exact: true })).toBeVisible()
  const uiUxTitle = page.locator('.course-title-button').filter({ hasText: 'UI/UXインタラクション特論' })
  await expect(uiUxTitle).toBeVisible()
  await expect(uiUxTitle).toHaveCSS('font-size', '15px')
  const courseCardsText = (await page.locator('.course-card').allTextContents()).join('\n')
  expect(courseCardsText).not.toContain('4.6')
  await expect(page.locator('.course-rating')).toHaveCount(0)

  await page.reload()
  await expect(page.getByRole('heading', { name: '講義を探す' })).toBeVisible()
  await expect(page.locator('.course-title-button').filter({ hasText: 'ヒューマンコンピュータインタラクション' })).toBeVisible()
})

test('全学部・学科で4件以上の講義が検索画面に表示される', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByLabel('学部', { exact: true }).locator('option')).toHaveText([
    '法学部', '経済経営学部', '人文社会学部', 'システムデザイン学部', '理学部', '健康福祉学部',
  ])
  const departmentsByFaculty = [
    ['法学部', ['法律学科', '政策学科']],
    ['経済経営学部', ['経済学科', '経営学科']],
    ['人文社会学部', ['人文学科', '社会学科']],
    ['システムデザイン学部', ['情報システム学科', 'デザイン学科']],
    ['理学部', ['数理科学科', '物理科学科']],
    ['健康福祉学部', ['看護学科', '理学療法学科']],
  ]

  let firstSelection = true
  for (const [faculty, departments] of departmentsByFaculty) {
    for (const department of departments) {
      if (!firstSelection) await page.getByRole('button', { name: '学部・学科を変更' }).click()
      await page.getByLabel('学部', { exact: true }).selectOption(faculty)
      await page.getByLabel('学科', { exact: true }).selectOption(department)
      await page.getByRole('button', { name: firstSelection ? '講義を見る' : 'プロフィールを保存' }).click()
      const departmentCourseCount = await page.locator('.course-card').count()
      expect(departmentCourseCount).toBeGreaterThanOrEqual(4)
      const displayedCount = Number((await page.locator('.result-total').innerText()).match(/\d+/)?.[0])
      expect(displayedCount).toBe(departmentCourseCount)
      firstSelection = false
    }
  }
})

test('検索カードは映像を優先し、資料のみは資料プレビュー、メディアなしは文字のみで表示する', async ({ page }) => {
  await chooseDepartment(page)

  const bothMediaCard = page.locator('.course-card').filter({ hasText: 'UI/UXインタラクション特論' })
  await expect(bothMediaCard.locator('.video-card-preview')).toBeVisible()
  await expect(bothMediaCard.locator('.material-card-preview')).toHaveCount(0)
  await bothMediaCard.getByRole('button', { name: 'UI/UXインタラクション特論の映像プレビューを開く' }).click()
  await expect(page.getByRole('tab', { name: '動画' })).toHaveAttribute('aria-selected', 'true')
  await page.getByRole('button', { name: '講義一覧へ' }).click()

  const materialOnlyCard = page.locator('.course-card').filter({ hasText: '情報リテラシー基礎' })
  await expect(materialOnlyCard.locator('.material-card-preview')).toBeVisible()
  await expect(materialOnlyCard.locator('.video-card-preview')).toHaveCount(0)
  await materialOnlyCard.getByRole('button', { name: '情報リテラシー基礎の資料プレビューを開く' }).click()
  await expect(page.getByRole('tab', { name: '資料' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('heading', { name: '講義資料の抜粋' })).toBeVisible()
  await page.getByRole('button', { name: '講義一覧へ' }).click()

  const textOnlyCard = page.locator('.course-card').filter({ hasText: 'データベース設計' })
  await expect(textOnlyCard.locator('.course-media-preview')).toHaveCount(0)
})

test('旧学部の保存値を新しい学科へ移行し、設定画面は学科表示から開ける', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    localStorage.setItem('unilenz-selection', JSON.stringify({ faculty: '情報理工学部', department: '情報システム学科' }))
  })
  await page.reload()
  await expect(page.locator('.department-strip strong')).toHaveText('システムデザイン学部')
  await expect(page.locator('.department-strip > div > span')).toHaveText('情報システム学科')
  await expect(page.getByRole('button', { name: 'マイページ' })).toHaveCount(0)
  await page.getByRole('button', { name: '学部・学科を変更' }).click()
  await expect(page.getByRole('heading', { name: 'プロフィール編集' })).toBeVisible()
  await expect(page.getByLabel('学部', { exact: true })).toHaveValue('システムデザイン学部')
  await page.getByLabel('学部', { exact: true }).selectOption('理学部')
  await page.getByLabel('学科', { exact: true }).selectOption('物理科学科')
  await page.getByRole('button', { name: 'プロフィールを保存' }).click()
  await expect(page.locator('.department-strip strong')).toHaveText('理学部')
  await expect(page.getByText('物理科学科', { exact: true })).toBeVisible()
})

test('プロフィールを編集してユーザー情報と写真を保存し、再読み込み後も表示する', async ({ page }) => {
  await chooseDepartment(page)
  await page.getByRole('button', { name: 'プロフィールを編集' }).click()
  await expect(page.getByRole('heading', { name: 'プロフィール編集' })).toBeVisible()
  await expect(page.getByLabel('ユーザーネーム')).toHaveValue('あなた')
  await expect(page.getByLabel('学年')).toHaveValue('1年')

  await page.getByLabel('ユーザーネーム').fill('みずき')
  await page.getByLabel('学部', { exact: true }).selectOption('健康福祉学部')
  await page.getByLabel('学科', { exact: true }).selectOption('看護学科')
  await page.getByLabel('学年').selectOption('3年')
  const profileImage = page.getByLabel('プロフィール写真')
  await profileImage.setInputFiles({ name: 'avatar.gif', mimeType: 'image/gif', buffer: Buffer.from('not an image') })
  await expect(page.getByRole('alert')).toHaveText('プロフィール画像はJPEG、PNG、WebP形式を選択してください。')
  await profileImage.setInputFiles({
    name: 'avatar.png',
    mimeType: 'image/png',
    buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/xWQAAAAASUVORK5CYII=', 'base64'),
  })
  await expect(page.getByRole('alert')).toHaveCount(0)

  await page.getByRole('button', { name: 'プロフィールを保存' }).click()
  await expect(page.locator('.department-strip strong')).toHaveText('健康福祉学部')
  await expect(page.locator('.department-strip > div > span')).toHaveText('看護学科')
  await expect(page.locator('header .profile-avatar img')).toBeVisible()
  await page.reload()
  await expect(page.locator('header .profile-avatar img')).toBeVisible()
  await page.getByRole('button', { name: 'プロフィールを編集' }).click()
  await expect(page.getByLabel('ユーザーネーム')).toHaveValue('みずき')
  await expect(page.getByLabel('学年')).toHaveValue('3年')
  await expect(page.getByLabel('学部', { exact: true })).toHaveValue('健康福祉学部')
  await expect(page.getByLabel('学科', { exact: true })).toHaveValue('看護学科')
})

test('時間割は初期状態で空で、登録した講義の詳細を開いて履修解除できる', async ({ page }) => {
  await chooseDepartment(page)
  await page.getByRole('button', { name: '時間割', exact: true }).click()

  const table = page.getByRole('table', { name: '時間割' })
  await expect(table.getByRole('columnheader')).toHaveCount(6)
  await expect(page.getByText('曜日と時限ごとの講義一覧')).toHaveCount(0)
  await expect(table.locator('tbody button.schedule-course')).toHaveCount(0)
  await expect(table.getByRole('button', { name: '月曜日 1限の講義を探す' })).toBeVisible()
  await expect(table.getByRole('button', { name: '火曜日 4限の講義を探す' })).toHaveCount(0)
  for (const day of ['月', '火', '水', '木', '金']) {
    await expect(table.getByRole('columnheader', { name: day, exact: true })).toBeVisible()
  }
  for (const period of ['1限', '2限', '3限', '4限', '5限']) {
    await expect(table.getByRole('rowheader', { name: period, exact: true })).toBeVisible()
  }

  await page.getByRole('button', { name: '講義検索' }).click()
  const courseCard = page.locator('.course-card').filter({ hasText: '情報リテラシー基礎' })
  await courseCard.getByRole('button', { name: '時間割に追加' }).click()
  await expect(courseCard.getByRole('button', { name: '時間割から削除' })).toHaveAttribute('aria-pressed', 'true')
  await page.reload()
  await page.getByRole('button', { name: '時間割', exact: true }).click()
  await expect(table.getByRole('button', { name: '情報リテラシー基礎の詳細を開く' })).toBeVisible()
  await expect(table.getByRole('button', { name: '月曜日 1限の講義を探す' })).toHaveCount(0)

  await table.getByRole('button', { name: '情報リテラシー基礎の詳細を開く' }).click()
  await expect(page.getByRole('heading', { name: '情報リテラシー基礎' })).toBeVisible()
  await expect(page.getByRole('button', { name: '時間割へ' })).toBeVisible()
  await page.getByRole('button', { name: '履修をやめる' }).click()
  await expect(page.getByRole('button', { name: '時間割に追加' })).toHaveAttribute('aria-pressed', 'false')
  await page.getByRole('button', { name: '時間割へ' }).click()
  await expect(table.locator('tbody button.schedule-course')).toHaveCount(0)
  await expect(table.getByRole('button', { name: '月曜日 1限の講義を探す' })).toBeVisible()
  await page.getByRole('button', { name: '講義検索' }).click()
  await expect(courseCard.getByRole('button', { name: '時間割に追加' })).toHaveAttribute('aria-pressed', 'false')
})

test('時間割の空きコマから同じ曜日・時限の講義を検索できる', async ({ page }) => {
  await chooseDepartment(page)
  await page.getByRole('button', { name: '時間割', exact: true }).click()

  const table = page.getByRole('table', { name: '時間割' })
  await table.getByRole('button', { name: '月曜日 1限の講義を探す' }).click()
  await expect(page.getByRole('heading', { name: '講義を探す' })).toBeVisible()
  await expect(page.locator('.course-title-button')).toHaveCount(1)
  await expect(page.locator('.course-title-button')).toHaveText(/情報リテラシー基礎/)
  await page.getByRole('button', { name: '絞り込み条件' }).click()
  await expect(page.getByLabel('曜日')).toHaveValue('月')
  await expect(page.getByLabel('時限')).toHaveValue('1限')
  await expect(page.getByRole('button', { name: '該当 1 講義を見る' })).toBeVisible()
})

test('講義をお気に入り登録すると一覧に表示され、解除と再読み込み後の保持ができる', async ({ page }) => {
  await chooseDepartment(page)
  await expect(page.getByRole('button', { name: 'マイページ' })).toHaveCount(0)

  const favoriteButton = page.getByRole('button', { name: 'UI/UXインタラクション特論をお気に入りに追加' })
  await favoriteButton.click()
  await expect(page.getByRole('button', { name: 'UI/UXインタラクション特論をお気に入りから解除' })).toHaveAttribute('aria-pressed', 'true')
  await page.reload()
  await page.getByRole('button', { name: 'お気に入り', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'お気に入り' })).toBeVisible()
  await expect(page.locator('.course-title-button').filter({ hasText: 'UI/UXインタラクション特論' })).toBeVisible()
  await page.locator('.course-title-button').filter({ hasText: 'UI/UXインタラクション特論' }).click()
  await expect(page.getByRole('heading', { name: 'UI/UXインタラクション特論' })).toBeVisible()
  await page.getByRole('button', { name: 'お気に入りへ' }).click()
  await page.getByRole('button', { name: 'お気に入り', exact: true }).click()
  await page.getByRole('button', { name: 'UI/UXインタラクション特論をお気に入りから解除' }).click()
  await expect(page.getByText('お気に入りはまだありません')).toBeVisible()
})

test('講義カードの口コミ件数を押すと、その講義のコメント一覧が開く', async ({ page }) => {
  await chooseDepartment(page)
  await page.getByRole('button', { name: '2件の口コミを表示' }).click()

  await expect(page.getByRole('tab', { name: 'コメント' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('heading', { name: '先輩のコメント' })).toBeVisible()
  await expect(page.getByText('グループワーク中心。締切を管理できれば無理なく進められます。')).toBeVisible()
})

test('MP4動画の形式・容量・長さを検証し、投稿動画を再読み込み後も表示する', async ({ page }) => {
  await chooseDepartment(page)
  const videoMockKey = '__mockVideoDuration'
  await page.addInitScript((key) => {
    const originalCreateElement = Document.prototype.createElement
    Document.prototype.createElement = function (tagName: string, options?: ElementCreationOptions) {
      const element = originalCreateElement.call(this, tagName, options)
      if (tagName.toLowerCase() === 'video' && element instanceof HTMLVideoElement) {
        Object.defineProperty(element, 'duration', { configurable: true, get: () => Number(sessionStorage.getItem(key) ?? 60) })
        Object.defineProperty(element, 'videoWidth', { configurable: true, value: 320 })
        Object.defineProperty(element, 'videoHeight', { configurable: true, value: 180 })
        Object.defineProperty(element, 'currentTime', {
          configurable: true,
          set: () => queueMicrotask(() => element.dispatchEvent(new Event('seeked'))),
        })
        Object.defineProperty(element, 'src', {
          configurable: true,
          set: () => queueMicrotask(() => {
            element.dispatchEvent(new Event('loadedmetadata'))
            element.dispatchEvent(new Event('loadeddata'))
          }),
        })
        element.load = () => {}
      }
      return element
    }
    Object.defineProperty(CanvasRenderingContext2D.prototype, 'drawImage', { configurable: true, value: () => {} })
    Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', { configurable: true, value: () => 'data:image/jpeg;base64,dGh1bWI=' })
  }, videoMockKey)
  await page.reload()
  await page.getByRole('button', { name: '投稿' }).click()
  await page.getByLabel('投稿内容').selectOption('video')
  await page.getByLabel('講義', { exact: true }).selectOption('inf-3024')

  const videoInput = page.getByLabel('動画ファイル')
  await videoInput.setInputFiles({ name: 'clip.mov', mimeType: 'video/quicktime', buffer: Buffer.from('not mp4') })
  await expect(page.getByRole('alert')).toHaveText('MP4形式の動画を選択してください。')
  const oversizedVideoPath = join(tmpdir(), `trikoma-large-${randomUUID()}.mp4`)
  await writeFile(oversizedVideoPath, Buffer.alloc(50 * 1024 * 1024 + 1))
  try {
    await videoInput.setInputFiles(oversizedVideoPath)
    await expect(page.getByRole('alert')).toHaveText('動画は50MB以下のファイルを選択してください。')
  } finally {
    await unlink(oversizedVideoPath)
  }
  await page.evaluate((key) => sessionStorage.setItem(key, '301'), videoMockKey)
  await videoInput.setInputFiles({ name: 'too-long.mp4', mimeType: 'video/mp4', buffer: Buffer.from('mock mp4') })
  await expect(page.getByRole('alert')).toHaveText('動画は5分以内のものを選択してください。')
  await page.evaluate((key) => sessionStorage.setItem(key, '300'), videoMockKey)
  await videoInput.setInputFiles({ name: 'lecture.mp4', mimeType: 'video/mp4', buffer: Buffer.from('mock mp4') })
  await expect(page.getByText('lecture.mp4')).toBeVisible()
  await expect(page.locator('.selected-file-name small')).toHaveText(/05:00/)

  await page.getByRole('button', { name: '投稿する' }).click()
  await expect(page.getByRole('tab', { name: '動画' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('heading', { name: '投稿された動画' })).toBeVisible()
  await expect(page.locator('video.posted-video-player')).toHaveAttribute('controls', '')
  await page.getByRole('button', { name: '講義一覧へ' }).click()
  await expect(page.locator('.video-preview-thumbnail')).toBeVisible()
  await expect(page.getByRole('button', { name: '2件の口コミを表示' })).toBeVisible()
  await page.reload()
  await expect(page.locator('.video-preview-thumbnail')).toBeVisible()
  await page.locator('.course-title-button').filter({ hasText: 'UI/UXインタラクション特論' }).click()
  await page.getByRole('tab', { name: '動画' }).click()
  await expect(page.getByRole('heading', { name: '投稿された動画' })).toBeVisible()
  await expect(page.locator('video.posted-video-player')).toHaveAttribute('controls', '')
})

test('ハッシュタグを選ぶと該当タグ付きのコメントに絞り込める', async ({ page }) => {
  await chooseDepartment(page)
  await page.getByRole('button', { name: '#グループワークの口コミを表示' }).click()

  await expect(page.getByRole('tab', { name: 'コメント' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('status')).toContainText('#グループワークのコメントを表示中')
  await expect(page.getByText('グループワーク中心。締切を管理できれば無理なく進められます。')).toBeVisible()
  await expect(page.getByText('毎週少しずつ作るので、最後に慌てずに済みました。質問へのフィードバックも丁寧です。')).toHaveCount(0)

  await page.getByRole('button', { name: 'すべて表示' }).click()
  await page.getByRole('button', { name: '#フィードバック充実の口コミを表示' }).click()
  await expect(page.getByRole('status')).toContainText('#フィードバック充実のコメントを表示中')
  await expect(page.getByText('毎週少しずつ作るので、最後に慌てずに済みました。質問へのフィードバックも丁寧です。')).toBeVisible()
  await expect(page.getByText('グループワーク中心。締切を管理できれば無理なく進められます。')).toHaveCount(0)

  await page.getByRole('button', { name: 'すべて表示' }).click()
  await expect(page.getByText('グループワーク中心。締切を管理できれば無理なく進められます。')).toBeVisible()
  await expect(page.getByText('毎週少しずつ作るので、最後に慌てずに済みました。質問へのフィードバックも丁寧です。')).toBeVisible()
})

test('スマートフォン幅でも時間割全体が横スクロールなしで見え、メニューが押しやすい', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 })
  await chooseDepartment(page)
  await page.getByRole('button', { name: '時間割', exact: true }).click()

  const table = page.getByRole('table', { name: '時間割' })
  await expect(table).toBeVisible()
  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    table: document.querySelector('.schedule-table-wrap')?.getBoundingClientRect().width ?? 0,
  }))
  expect(dimensions.document).toBe(dimensions.viewport)
  expect(dimensions.table).toBeGreaterThan(250)

  const navButton = page.getByRole('button', { name: '時間割', exact: true })
  await expect(navButton).toHaveCSS('min-height', '54px')
  await expect(navButton).toHaveCSS('font-weight', '800')
  await expect(navButton).toHaveCSS('font-size', '11px')
  await expect(page.locator('.brand-logo')).toHaveCSS('width', '60px')
  await expect(page.locator('.brand-logo')).toHaveCSS('height', '75px')
  await expect(page.locator('.topbar')).toHaveCSS('padding-left', '6px')
})

test('講義名で検索し、曜日で絞り込める', async ({ page }) => {
  await chooseDepartment(page)
  await page.getByRole('searchbox', { name: '講義名で検索' }).fill('神崎')
  await expect(page.getByRole('heading', { name: '講義が見つかりません' })).toBeVisible()

  await page.getByRole('searchbox', { name: '講義名で検索' }).fill('UI/UX')
  await expect(page.locator('.course-title-button').filter({ hasText: 'UI/UXインタラクション特論' })).toBeVisible()
  await page.getByRole('searchbox', { name: '講義名で検索' }).fill('')
  await page.getByRole('button', { name: '絞り込み条件' }).click()
  await page.getByLabel('曜日').selectOption('火')
  await page.getByRole('button', { name: '該当 2 講義を見る' }).click()
  await expect(page.locator('.course-title-button').filter({ hasText: 'UI/UXインタラクション特論' })).toBeVisible()
  await expect(page.locator('.course-title-button').filter({ hasText: 'プログラミング基礎' })).toBeVisible()
  await expect(page.locator('.course-title-button').filter({ hasText: 'ヒューマンコンピュータインタラクション' })).toHaveCount(0)
})

test('講義の各タブを切り替え、資料抜粋とコメント投稿を確認できる', async ({ page }) => {
  const pageErrors: string[] = []
  page.on('pageerror', (error) => pageErrors.push(error.message))
  await chooseDepartment(page)
  await page.locator('.course-title-button').filter({ hasText: 'UI/UXインタラクション特論' }).click()
  await expect(page.getByRole('tablist', { name: '講義情報' })).toBeVisible()

  await page.getByRole('tab', { name: '資料' }).click()
  await expect(page.getByRole('heading', { name: '講義資料の抜粋' })).toBeVisible()
  await expect(page.getByText('操作と結果の対応を明確にする')).toBeVisible()
  await page.getByRole('tab', { name: '動画' }).click()
  await expect(page.getByRole('heading', { name: '授業の映像' })).toBeVisible()
  await page.getByRole('tab', { name: 'コメント' }).click()
  await page.getByRole('button', { name: 'コメントを追加' }).click()
  await expect(page.getByLabel('投稿年度')).toHaveCount(0)
  await page.getByLabel('講義の感想').fill('演習で実際に試せるのがよかったです。')
  const attachmentInput = page.getByLabel('資料ファイル')
  await attachmentInput.setInputFiles({ name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('not a supported attachment') })
  await expect(page.getByRole('alert')).toHaveText('PDF、JPEG、PNG、WebP形式のファイルを選択してください。')
  await attachmentInput.setInputFiles({ name: 'large.pdf', mimeType: 'application/pdf', buffer: Buffer.alloc(10 * 1024 * 1024 + 1) })
  await expect(page.getByRole('alert')).toHaveText('添付できるファイルは10MB以下です。')
  await attachmentInput.setInputFiles({ name: 'lecture-notes.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\nLecture notes') })
  await expect(page.getByText('lecture-notes.pdf')).toBeVisible()
  await page.getByRole('button', { name: '投稿する' }).click()
  await expect(page.getByText('演習で実際に試せるのがよかったです。')).toBeVisible()
  await expect(page.getByRole('link', { name: '添付ファイル lecture-notes.pdf' })).toBeVisible()
  const postedComment = page.locator('.review-card').filter({ hasText: '演習で実際に試せるのがよかったです。' })
  await expect(postedComment.locator('time.review-date')).toHaveText(/^\d{4}年\d{1,2}月\d{1,2}日$/)

  await page.reload()
  await page.getByRole('button', { name: '3件の口コミを表示' }).click()
  await expect(page.getByRole('tab', { name: 'コメント' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByText('演習で実際に試せるのがよかったです。')).toBeVisible()
  await expect(page.getByRole('link', { name: '添付ファイル lecture-notes.pdf' })).toBeVisible()
  await expect(page.locator('.review-card').filter({ hasText: '演習で実際に試せるのがよかったです。' }).locator('time.review-date')).toHaveText(/^\d{4}年\d{1,2}月\d{1,2}日$/)
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  expect(hasHorizontalOverflow).toBe(false)
  expect(pageErrors).toEqual([])
})

test('広場の代わりに投稿入口があり、講義資料を投稿して資料タブで再表示できる', async ({ page }) => {
  await chooseDepartment(page)
  await expect(page.getByRole('button', { name: '広場' })).toHaveCount(0)
  await page.getByRole('button', { name: '投稿' }).click()
  await expect(page.getByRole('heading', { name: '投稿', exact: true })).toBeVisible()
  await expect(page.getByLabel('投稿年度')).toHaveCount(0)
  await page.getByLabel('講義', { exact: true }).selectOption('inf-3024')
  await page.getByLabel('講義の感想').fill('講義全体の投稿画面からコメントできました。')
  await page.getByRole('button', { name: '投稿する' }).click()
  await expect(page.getByRole('tab', { name: 'コメント' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByText('講義全体の投稿画面からコメントできました。')).toBeVisible()

  await page.getByRole('button', { name: '投稿' }).click()
  await page.getByLabel('投稿内容').selectOption('material')
  await page.getByLabel('資料ファイル').setInputFiles({
    name: 'shared-slides.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.4\nShared lecture slides'),
  })
  await page.getByRole('button', { name: '投稿する' }).click()
  await expect(page.getByRole('tab', { name: '資料' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('heading', { name: '投稿された講義資料' })).toBeVisible()
  await expect(page.getByRole('link', { name: '添付ファイル shared-slides.pdf' })).toBeVisible()

  await page.reload()
  await expect(page.getByRole('button', { name: '3件の口コミを表示' })).toBeVisible()
  await page.getByRole('button', { name: '3件の口コミを表示' }).click()
  await expect(page.getByText('講義全体の投稿画面からコメントできました。')).toBeVisible()
  await page.getByRole('tab', { name: '資料' }).click()
  await expect(page.getByRole('link', { name: '添付ファイル shared-slides.pdf' })).toBeVisible()
  await expect(page.locator('.review-card').filter({ hasText: 'shared-slides.pdf' }).locator('time.review-date')).toHaveText(/^\d{4}年\d{1,2}月\d{1,2}日$/)
})
