import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import logoImage from './image (1).png'
import './App.css'

type Faculty = '法学部' | '経済経営学部' | '人文社会学部' | 'システムデザイン学部' | '理学部' | '健康福祉学部'
type DepartmentSelection = { faculty: Faculty; department: string }
type ReviewAttachment = { id: string; name: string; type: string; size: number }
type PostKind = 'comment' | 'material' | 'video'
type Review = { id: string; courseId: string; author: string; year?: string; createdAt?: string; body: string; tag: string; kind?: PostKind; attachment?: ReviewAttachment; duration?: number }
const profileGrades = ['1年', '2年', '3年', '4年', 'その他'] as const
type ProfileGrade = typeof profileGrades[number]
type UserProfile = { username: string; grade: ProfileGrade; avatarAttachmentId: string | null }
type MaterialSection = { title: string; body: string; points: string[] }
type Course = {
  id: string
  code: string
  name: string
  department: string
  professor: string
  weekday: string
  period: string
  scheduleSlots?: ScheduleSlot[]
  credits: number
  semester: string
  room: string
  summary: string
  tags: string[]
  evaluation: { label: string; percent: number; note: string }[]
  textbook: string
  materials: MaterialSection[]
  videoTitle?: string
  videoDuration?: string
  reviews: Review[]
}
type AdditionalCourseSeed = Pick<Course, 'id' | 'code' | 'name' | 'weekday' | 'period' | 'professor' | 'room' | 'semester' | 'summary'> & {
  department: string
  media: 'both' | 'video' | 'materials' | 'none'
}
type ManagedCourseRow = {
  id: string
  department: string
  name: string
  weekday: string
  period: string
  semester: string
}
type ScheduleSemester = '前期' | '後期'
type ScheduleSlot = { weekday: string; period: string }

const facultyDepartments: Record<Faculty, string[]> = {
  法学部: ['法律学科', '政策学科'],
  経済経営学部: ['経済経営学部'],
  人文社会学部: ['人文学科', '社会学科'],
  システムデザイン学部: ['情報システム学科', 'デザイン学科'],
  理学部: ['数理科学科', '物理科学科'],
  健康福祉学部: ['看護学科', '理学療法学科'],
}

const legacySelections: Record<string, DepartmentSelection> = {
  '情報システム学科': { faculty: 'システムデザイン学部', department: '情報システム学科' },
  '経済経営学部': { faculty: '経済経営学部', department: '経済経営学部' },
  'メディア情報学科': { faculty: 'システムデザイン学部', department: 'デザイン学科' },
  'コンピュータ応用学科': { faculty: 'システムデザイン学部', department: '情報システム学科' },
  '物理学科': { faculty: '理学部', department: '物理科学科' },
  '化学・生命科学科': { faculty: '理学部', department: '数理科学科' },
  '数理科学科': { faculty: '理学部', department: '数理科学科' },
  '日本文学科': { faculty: '人文社会学部', department: '人文学科' },
  '人文学科': { faculty: '人文社会学部', department: '人文学科' },
  '歴史学科': { faculty: '人文社会学部', department: '人文学科' },
  '経営学部': { faculty: '経済経営学部', department: '経済経営学部' },
  '政治学科': { faculty: '法学部', department: '政策学科' },
}

function normalizeSavedSelection(saved: DepartmentSelection | null): DepartmentSelection | null {
  if (!saved || typeof saved !== 'object') return null
  const legacySelection = legacySelections[saved.department]
  if (legacySelection) return legacySelection
  if (!Object.prototype.hasOwnProperty.call(facultyDepartments, saved.faculty)) return null
  const faculty = saved.faculty
  const departments = facultyDepartments[faculty]
  return {
    faculty,
    department: departments.includes(saved.department) ? saved.department : departments[0],
  }
}

const weekdays = ['月', '火', '水', '木', '金'] as const
const periods = ['1限', '2限', '3限', '4限', '5限'] as const

const courses: Course[] = [
  {
    id: 'inf-3024', code: 'INF-3024', name: 'UI/UXインタラクション特論', department: '情報システム学科',
    professor: '神崎 陽介', weekday: '火', period: '2限', credits: 2, semester: '春学期', room: '創造館 301',
    summary: 'デジタルプロダクトにおける認知的負荷の低減と、感情的満足度を両立させる実践的なUI/UXデザインを学びます。ミニ演習とチームでのプロトタイピングを通して、調査から試作までを体験します。',
    tags: ['#神講義', '#グループワーク', '#フィードバック充実'],
    evaluation: [{ label: '平常点', percent: 30, note: '小クイズ・発言' }, { label: '演習課題', percent: 40, note: '週ごとの制作' }, { label: '期末レポート', percent: 30, note: '最終提案' }],
    textbook: '『誰のためのデザイン？』D.A.ノーマン / 新曜社',
    materials: [{
      title: '第3回　インタラクションデザインの原則',
      body: '使う人が迷わず目的を達成できるように、操作の結果を予測できる手がかりを画面に置く。認知的負荷を抑えるには、選択肢を整理し、状態の変化をその場で伝えることが重要である。',
      points: ['操作と結果の対応を明確にする', '現在の状態がわかるフィードバックを返す', '必要な選択肢を一度に見渡せるようにする'],
    }],
    videoTitle: '操作の手がかりをつくる', videoDuration: '04:58',
    reviews: [
      { id: 'r1', courseId: 'inf-3024', author: '情報デザイン専攻 4年', year: '2024年度', body: 'グループワーク中心。締切を管理できれば無理なく進められます。講評で他学部の視点に触れられるのが刺激的でした。', tag: '#グループワーク' },
      { id: 'r2', courseId: 'inf-3024', author: '匿名の受講生', year: '2023年度', body: '毎週少しずつ作るので、最後に慌てずに済みました。質問へのフィードバックも丁寧です。', tag: '#フィードバック充実' },
    ],
  },
  {
    id: 'inf-2108', code: 'INF-2108', name: 'ヒューマンコンピュータインタラクション', department: '情報システム学科',
    professor: '山田 健一', weekday: '水', period: '2限', credits: 2, semester: '春学期', room: '情報棟 204',
    summary: '人とコンピュータの関わりを、認知科学とデザインの両面から考えます。観察と簡単なユーザーテストを通して、使いやすさを確かめます。',
    tags: ['#初心者歓迎', '#演習あり'],
    evaluation: [{ label: '小レポート', percent: 40, note: '授業内提出' }, { label: '演習', percent: 30, note: '観察・発表' }, { label: '期末課題', percent: 30, note: '改善提案' }],
    textbook: '指定資料を授業内で配布',
    materials: [{ title: '第2回　人間中心設計', body: '人間中心設計では、使う人・目的・利用環境を理解したうえで解決策を考える。完成したものを一度で決めず、試作品を使ってもらい、観察した結果を次の改善に活かす。', points: ['利用者と利用状況を具体的に捉える', '小さく試作して早く確かめる', '観察結果を設計へ戻す'] }],
    videoTitle: 'ユーザーテストの進め方', videoDuration: '05:12',
    reviews: [{ id: 'r3', courseId: 'inf-2108', author: 'メディア情報学科 3年', year: '2024年度', body: '専門用語は出てきますが、毎回の演習で理解を確かめられました。', tag: '#演習あり' }],
  },
  {
    id: 'media-1402', code: 'MED-1402', name: '情報デザイン演習', department: 'デザイン学科',
    professor: '高橋 美咲', weekday: '木', period: '3限', credits: 2, semester: '秋学期', room: 'デザイン棟 105',
    summary: '情報を整理し、伝わる形に構成するための基礎演習です。図解や紙面の試作を重ねながら、視覚表現の選択を言葉で説明します。',
    tags: ['#制作課題', '#講評あり'],
    evaluation: [{ label: '演習', percent: 50, note: '制作プロセス' }, { label: '提出物', percent: 35, note: '作品と解説' }, { label: '参加', percent: 15, note: '相互講評' }],
    textbook: '参考資料は授業内で紹介',
    materials: [{ title: '第1回　情報を整理して伝える', body: '伝えたい内容を並べるだけでは、受け手は重要な関係を読み取りにくい。情報のまとまりと優先順位を決め、見出し・余白・図の使い方で構造を示す。', points: ['情報を目的ごとに分類する', '重要度に応じて視覚的な差をつける', '余白も情報のまとまりを示す手がかりにする'] }],
    videoTitle: '図解のラフをつくる', videoDuration: '03:46',
    reviews: [{ id: 'r4', courseId: 'media-1402', author: '情報デザイン学科 2年', year: '2024年度', body: '作品を見せ合う機会が多く、違う考え方を知れる授業でした。', tag: '#講評あり' }],
  },
  {
    id: 'comp-2201', code: 'CMP-2201', name: 'アルゴリズムとデータ構造', department: '数理科学科',
    professor: '佐藤 拓也', weekday: '月', period: '3限', credits: 2, semester: '春学期', room: '情報棟 110',
    summary: '基本的なデータ構造とアルゴリズムを、計算量と実装の両面から学びます。毎回の短い演習で考え方を確かめます。',
    tags: ['#基礎から学ぶ', '#小テスト'],
    evaluation: [{ label: '小テスト', percent: 30, note: '各回の確認' }, { label: '演習課題', percent: 30, note: '実装課題' }, { label: '期末試験', percent: 40, note: '筆記' }],
    textbook: '『アルゴリズムとデータ構造』授業指定資料',
    materials: [{ title: '第4回　探索と計算量', body: 'データを一つずつ確かめる方法は、対象の数に比例して確認回数が増える。整列済みのデータでは範囲を半分ずつ狭めることで、少ない比較回数で目的の値を探せる。', points: ['入力サイズと処理回数の関係を見る', '探索方法はデータの状態に合わせて選ぶ', '小さな例で手順を追ってから一般化する'] }],
    videoTitle: '二分探索を図で考える', videoDuration: '04:31',
    reviews: [{ id: 'r5', courseId: 'comp-2201', author: 'コンピュータ応用学科 3年', year: '2024年度', body: '予習よりも演習の復習が大切でした。わからない箇所を授業中に質問できます。', tag: '#基礎から学ぶ' }],
  },
]

const additionalCourseSeeds: AdditionalCourseSeed[] = [
  { id: 'inf-1101', code: 'INF-1101', name: '情報リテラシー基礎', department: '情報システム学科', weekday: '月', period: '1限', professor: '鈴木 直人', room: '情報棟 101', semester: '春学期', summary: '情報の収集・整理・活用に必要な基本的な考え方とツールの使い方を学びます。', media: 'materials' },
  { id: 'inf-1202', code: 'INF-1202', name: 'プログラミング基礎', department: '情報システム学科', weekday: '火', period: '1限', professor: '井上 真由', room: '情報棟 203', semester: '春学期', summary: 'プログラムの基本構造を学び、小さな課題を通して自分でコードを書く力を身につけます。', media: 'both' },
  { id: 'inf-2203', code: 'INF-2203', name: 'データベース設計', department: '情報システム学科', weekday: '木', period: '1限', professor: '小林 健', room: '情報棟 305', semester: '春学期', summary: 'データの整理方法やデータベースの設計、検索の基本を演習を交えて学びます。', media: 'none' },
  { id: 'inf-2304', code: 'INF-2304', name: 'ネットワーク基礎', department: '情報システム学科', weekday: '金', period: '1限', professor: '斎藤 玲子', room: '情報棟 202', semester: '春学期', summary: 'コンピュータネットワークの仕組みや通信の基本的な規則を学びます。', media: 'both' },
  { id: 'inf-2405', code: 'INF-2405', name: 'ソフトウェア工学', department: '情報システム学科', weekday: '月', period: '2限', professor: '田村 亮', room: '情報棟 204', semester: '秋学期', summary: 'ソフトウェア開発の計画、設計、テストなど、チームで開発を進める方法を学びます。', media: 'both' },
  { id: 'inf-2506', code: 'INF-2506', name: 'Webアプリケーション開発', department: '情報システム学科', weekday: '木', period: '2限', professor: '松本 彩', room: '情報棟 301', semester: '秋学期', summary: 'Webアプリケーションの基本構成を理解し、画面とデータを連携させる方法を学びます。', media: 'both' },
  { id: 'inf-2607', code: 'INF-2607', name: 'データ分析入門', department: '情報システム学科', weekday: '水', period: '3限', professor: '渡辺 翔', room: '情報棟 205', semester: '秋学期', summary: 'データの特徴を読み取り、基礎的な集計や可視化を通して分析の進め方を学びます。', media: 'video' },
  { id: 'inf-2708', code: 'INF-2708', name: '情報セキュリティ基礎', department: '情報システム学科', weekday: '金', period: '3限', professor: '加藤 遥', room: '情報棟 302', semester: '秋学期', summary: '情報を安全に扱うための基本的な脅威や対策、日常での注意点を学びます。', media: 'both' },
  { id: 'media-1503', code: 'MED-1503', name: '映像表現の基礎', department: 'デザイン学科', weekday: '火', period: '2限', professor: '中村 由佳', room: 'デザイン棟 202', semester: '春学期', summary: '映像の構成や編集の基本を学び、短い作品の企画と制作を体験します。', media: 'video' },
  { id: 'media-2604', code: 'MED-2604', name: 'メディアと社会', department: 'デザイン学科', weekday: '金', period: '4限', professor: '石井 大輔', room: '講義棟 302', semester: '秋学期', summary: 'メディアが社会や日常生活に与える影響を事例から考えます。', media: 'materials' },
  { id: 'comp-1102', code: 'CMP-1102', name: '離散数学入門', department: '数理科学科', weekday: '水', period: '1限', professor: '森田 悠', room: '情報棟 111', semester: '春学期', summary: '論理や集合、グラフなど計算機科学を支える数学の基礎を学びます。', media: 'materials' },
  { id: 'comp-2302', code: 'CMP-2302', name: 'ソフトウェア設計演習', department: 'デザイン学科', weekday: '木', period: '4限', professor: '吉田 玲', room: '情報棟 208', semester: '秋学期', summary: '小規模なソフトウェアを題材に、設計の考え方と実装の進め方を演習します。', media: 'both' },
  { id: 'phy-1101', code: 'SCI-1101', name: '力学基礎', department: '物理科学科', weekday: '月', period: '1限', professor: '青木 誠', room: '理学棟 101', semester: '春学期', summary: '運動の法則やエネルギー保存則を、身近な現象と数式の両面から学びます。', media: 'materials' },
  { id: 'phy-2202', code: 'SCI-2202', name: '電磁気学入門', department: '物理科学科', weekday: '水', period: '2限', professor: '小川 直子', room: '理学棟 203', semester: '秋学期', summary: '電場と磁場の基本的な性質を、演習問題を通して理解します。', media: 'none' },
  { id: 'chem-1101', code: 'SCI-1201', name: '化学の基礎', department: '数理科学科', weekday: '火', period: '1限', professor: '藤田 真', room: '理学棟 104', semester: '春学期', summary: '物質の構造や化学結合など、化学を学ぶための基本概念を身につけます。', media: 'materials' },
  { id: 'chem-2303', code: 'SCI-2303', name: '生命科学概論', department: '数理科学科', weekday: '木', period: '3限', professor: '山口 彩', room: '理学棟 207', semester: '秋学期', summary: '細胞や遺伝情報の働きを中心に、生命現象を分子レベルから考えます。', media: 'video' },
  { id: 'math-1101', code: 'SCI-1301', name: '線形代数学I', department: '数理科学科', weekday: '月', period: '2限', professor: '井田 健', room: '理学棟 110', semester: '春学期', summary: 'ベクトルや行列の基本操作を学び、連立方程式や線形写像への応用を扱います。', media: 'materials' },
  { id: 'math-2202', code: 'SCI-2302', name: '確率と統計', department: '数理科学科', weekday: '金', period: '2限', professor: '長谷川 望', room: '理学棟 204', semester: '秋学期', summary: '確率の基本法則とデータを扱うための統計的な考え方を学びます。', media: 'none' },
  { id: 'lit-1101', code: 'LIT-1101', name: '日本文学入門', department: '人文学科', weekday: '火', period: '1限', professor: '松井 由美', room: '文系講義棟 101', semester: '春学期', summary: '古典から近現代までの作品を読み、時代背景と表現の特徴を考えます。', media: 'materials' },
  { id: 'lit-2202', code: 'LIT-2202', name: '近現代文学講読', department: '人文学科', weekday: '木', period: '2限', professor: '岡田 俊', room: '文系講義棟 205', semester: '秋学期', summary: '近現代の文学作品を精読し、語りや表現の工夫を根拠とともに読み解きます。', media: 'none' },
  { id: 'human-1101', code: 'HUM-1101', name: '人間と文化', department: '社会学科', weekday: '水', period: '1限', professor: '小野寺 恵', room: '文系講義棟 103', semester: '春学期', summary: 'さまざまな文化や価値観を比較し、人間の営みを多角的に考察します。', media: 'video' },
  { id: 'human-2203', code: 'HUM-2203', name: '言語とコミュニケーション', department: '社会学科', weekday: '金', period: '3限', professor: '坂本 亮子', room: '文系講義棟 207', semester: '秋学期', summary: '言語の仕組みと対話の特徴を学び、社会におけるコミュニケーションを考えます。', media: 'materials' },
  { id: 'hist-1101', code: 'HIS-1101', name: '歴史学の方法', department: '社会学科', weekday: '月', period: '3限', professor: '村上 誠', room: '文系講義棟 108', semester: '春学期', summary: '史料の読み方や歴史的事実の捉え方を学び、歴史研究の基本を身につけます。', media: 'materials' },
  { id: 'hist-2302', code: 'HIS-2302', name: '日本近現代史', department: '社会学科', weekday: '木', period: '4限', professor: '清水 梓', room: '文系講義棟 301', semester: '秋学期', summary: '近現代の社会変化を史料と具体的な事例から検討します。', media: 'none' },
  { id: 'law-1201', code: 'LAW-1201', name: '法学入門', department: '法律学科', weekday: '月', period: '2限', professor: '藤井 誠', room: '法学棟 102', semester: '春学期', summary: '法の役割や法体系の基本を身近な事例とともに学びます。', media: 'materials' },
  { id: 'law-2304', code: 'LAW-2304', name: '刑法総論', department: '法律学科', weekday: '木', period: '3限', professor: '三浦 由紀', room: '法学棟 204', semester: '秋学期', summary: '犯罪の成立要件や刑罰の考え方を基本判例から理解します。', media: 'none' },
  { id: 'law-1102', code: 'LAW-1102', name: '憲法基礎', department: '法律学科', weekday: '火', period: '4限', professor: '遠藤 直樹', room: '法学棟 103', semester: '春学期', summary: '憲法の基本原理と人権保障の考え方を身近な事例から学びます。', media: 'materials' },
  { id: 'law-2203', code: 'LAW-2203', name: '民法入門', department: '法律学科', weekday: '水', period: '3限', professor: '吉川 美穂', room: '法学棟 205', semester: '秋学期', summary: '契約や財産に関する基本的なルールを具体例とともに学びます。', media: 'none' },
  { id: 'pol-1202', code: 'POL-1202', name: '公共政策入門', department: '政策学科', weekday: '火', period: '2限', professor: '高木 大地', room: '法学棟 110', semester: '春学期', summary: '公共課題の発見から政策の立案・評価までの基本を学びます。', media: 'video' },
  { id: 'pol-2401', code: 'POL-2401', name: '行政と地域社会', department: '政策学科', weekday: '金', period: '3限', professor: '小松 真理', room: '法学棟 208', semester: '秋学期', summary: '行政の仕組みと地域課題への取り組みを事例から考えます。', media: 'materials' },
  { id: 'pol-2103', code: 'POL-2103', name: '地方自治論', department: '政策学科', weekday: '水', period: '2限', professor: '山本 亮介', room: '法学棟 207', semester: '春学期', summary: '自治体の役割や地域の課題解決に向けた取り組みを学びます。', media: 'materials' },
  { id: 'pol-2204', code: 'POL-2204', name: '自治体行政演習', department: '政策学科', weekday: '木', period: '4限', professor: '佐藤 綾', room: '法学棟 302', semester: '秋学期', summary: '自治体の行政課題を取り上げ、制度や政策の活用方法を考えます。', media: 'none' },
  { id: 'eco-1201', code: 'ECO-1201', name: 'ミクロ経済学', department: '経済学科', weekday: '火', period: '1限', professor: '石川 翔', room: '経済棟 102', semester: '春学期', summary: '消費者や企業の選択を通して市場の動きを分析します。', media: 'materials' },
  { id: 'eco-2301', code: 'ECO-2301', name: 'マクロ経済学', department: '経済学科', weekday: '木', period: '2限', professor: '前田 佳奈', room: '経済棟 203', semester: '秋学期', summary: '物価や雇用、経済成長など経済全体の動きを学びます。', media: 'none' },
  { id: 'eco-2102', code: 'ECO-2102', name: '経済データ分析', department: '経済学科', weekday: '月', period: '4限', professor: '小山 直美', room: '経済棟 305', semester: '秋学期', summary: '経済データの読み方や基本的な分析方法を演習形式で身につけます。', media: 'both' },
  { id: 'eco-2403', code: 'ECO-2403', name: '金融と経済', department: '経済学科', weekday: '水', period: '5限', professor: '森 由佳', room: '経済棟 208', semester: '春学期', summary: '金融の仕組みや企業・家計の資金の流れを基礎から学びます。', media: 'materials' },
  { id: 'mgt-1101', code: 'MGT-1101', name: '経営学入門', department: '経営学科', weekday: '月', period: '3限', professor: '山下 誠', room: '経済棟 104', semester: '春学期', summary: '組織や企業活動の基本的な考え方を事例から学びます。', media: 'video' },
  { id: 'mgt-2302', code: 'MGT-2302', name: 'マーケティング論', department: '経営学科', weekday: '水', period: '4限', professor: '木村 里奈', room: '経済棟 211', semester: '秋学期', summary: '顧客のニーズを捉え、価値を届ける仕組みを考えます。', media: 'materials' },
  { id: 'mgt-2103', code: 'MGT-2103', name: '組織マネジメント', department: '経営学科', weekday: '木', period: '4限', professor: '高野 真紀', room: '経済棟 206', semester: '春学期', summary: '組織で人々が協力して成果を出すための考え方を学びます。', media: 'none' },
  { id: 'mgt-2204', code: 'MGT-2204', name: '会計の基礎', department: '経営学科', weekday: '金', period: '4限', professor: '吉田 玲奈', room: '経済棟 303', semester: '秋学期', summary: '企業活動を数字で理解するための会計の基本を学びます。', media: 'materials' },
  { id: 'hum-1201', code: 'HUM-1201', name: '文化と表現', department: '人文学科', weekday: '火', period: '3限', professor: '佐野 由美', room: '文系講義棟 104', semester: '春学期', summary: '文学や芸術などの表現を通じて文化の多様性を学びます。', media: 'materials' },
  { id: 'hum-2402', code: 'HUM-2402', name: '現代思想の展開', department: '人文学科', weekday: '金', period: '2限', professor: '福田 透', room: '文系講義棟 211', semester: '秋学期', summary: '近現代の思想を読み、社会や人間への問いを考察します。', media: 'none' },
  { id: 'soc-1101', code: 'SOC-1101', name: '社会学入門', department: '社会学科', weekday: '月', period: '2限', professor: '大西 彩', room: '文系講義棟 110', semester: '春学期', summary: '日常の出来事を社会の仕組みや人々の関係から分析します。', media: 'video' },
  { id: 'soc-2303', code: 'SOC-2303', name: '都市とコミュニティ', department: '社会学科', weekday: '水', period: '3限', professor: '岸本 修', room: '文系講義棟 205', semester: '秋学期', summary: '都市の変化や地域コミュニティの課題を事例から考えます。', media: 'materials' },
  { id: 'design-1201', code: 'SD-1201', name: 'デザイン基礎演習', department: 'デザイン学科', weekday: '火', period: '1限', professor: '中井 遥', room: 'デザイン棟 103', semester: '春学期', summary: '観察と試作を重ね、課題を視覚的な提案にまとめる基礎を学びます。', media: 'both' },
  { id: 'math-1201', code: 'SCI-1401', name: '微分積分学I', department: '数理科学科', weekday: '水', period: '1限', professor: '西尾 亮', room: '理学棟 109', semester: '春学期', summary: '微分と積分の基本概念を理解し、自然や社会の変化を記述する方法を学びます。', media: 'materials' },
  { id: 'math-2304', code: 'SCI-2304', name: '統計データ解析', department: '数理科学科', weekday: '金', period: '4限', professor: '平井 美穂', room: '理学棟 206', semester: '秋学期', summary: 'データの特徴を統計的に捉え、分析結果を適切に解釈する方法を学びます。', media: 'video' },
  { id: 'phy-1201', code: 'PHY-1201', name: '物理学実験', department: '物理科学科', weekday: '火', period: '3限', professor: '岡本 浩', room: '理学棟 実験室1', semester: '春学期', summary: '基本的な測定とデータ整理を通じて物理現象を実験的に理解します。', media: 'materials' },
  { id: 'phy-2302', code: 'PHY-2302', name: '熱と統計力学', department: '物理科学科', weekday: '木', period: '4限', professor: '村田 朋子', room: '理学棟 202', semester: '秋学期', summary: '熱現象を微視的な粒子の運動と統計的な考え方から学びます。', media: 'none' },
  { id: 'nursing-1101', code: 'HWF-1101', name: '看護学概論', department: '看護学科', weekday: '月', period: '1限', professor: '石田 真由', room: '健康福祉棟 101', semester: '春学期', summary: '看護の役割や対象者の理解、安全な支援の基礎を学びます。', media: 'materials' },
  { id: 'nursing-2302', code: 'HWF-2302', name: '地域看護学', department: '看護学科', weekday: '木', period: '3限', professor: '堀内 佳子', room: '健康福祉棟 208', semester: '秋学期', summary: '地域で暮らす人々の健康を支える看護の考え方を学びます。', media: 'video' },
  { id: 'nursing-1203', code: 'HWF-1203', name: '成人看護学', department: '看護学科', weekday: '火', period: '4限', professor: '大塚 由香', room: '健康福祉棟 204', semester: '春学期', summary: '成人期にある人の健康課題と看護の基本的な支援方法を学びます。', media: 'materials' },
  { id: 'nursing-2204', code: 'HWF-2204', name: '健康支援論', department: '看護学科', weekday: '水', period: '5限', professor: '近藤 俊介', room: '健康福祉棟 105', semester: '秋学期', summary: '一人ひとりの生活に応じた健康づくりと支援の考え方を学びます。', media: 'none' },
  { id: 'rehab-1101', code: 'HWF-1201', name: 'リハビリテーション概論', department: '理学療法学科', weekday: '火', period: '1限', professor: '坂井 優', room: '健康福祉棟 103', semester: '春学期', summary: 'リハビリテーションの目的と多職種連携の基本を学びます。', media: 'video' },
  { id: 'rehab-2302', code: 'HWF-2402', name: '運動学', department: '理学療法学科', weekday: '金', period: '2限', professor: '新井 恵', room: '健康福祉棟 実習室', semester: '秋学期', summary: '身体運動の仕組みを観察と基礎的な測定から理解します。', media: 'materials' },
  { id: 'rehab-1203', code: 'HWF-1203-PT', name: '理学療法評価学', department: '理学療法学科', weekday: '水', period: '4限', professor: '小林 佳奈', room: '健康福祉棟 実習室', semester: '春学期', summary: '理学療法に必要な基本的な評価と記録の方法を演習で学びます。', media: 'materials' },
  { id: 'rehab-2204', code: 'HWF-2204-PT', name: '運動療法学', department: '理学療法学科', weekday: '木', period: '5限', professor: '佐々木 亮', room: '健康福祉棟 202', semester: '秋学期', summary: '運動療法の基礎と対象に合わせた運動の考え方を学びます。', media: 'video' },
]

const additionalCourses: Course[] = additionalCourseSeeds.map(({ media, ...seed }) => {
  const hasVideo = media === 'both' || media === 'video'
  const hasMaterials = media === 'both' || media === 'materials'
  return {
    ...seed,
    department: seed.department,
    credits: 2,
    tags: ['#講義サンプル'],
    evaluation: [
      { label: '授業内課題', percent: 40, note: '各回の課題' },
      { label: '演習', percent: 30, note: '授業内演習' },
      { label: '期末課題', percent: 30, note: '学期末提出' },
    ],
    textbook: '使用する資料は授業内で案内',
    materials: hasMaterials ? [{
      title: '講義内容の概要',
      body: seed.summary,
      points: ['基本用語と考え方を学ぶ', '授業内の例題・演習で理解を深める', '学んだ内容を課題に活用する'],
    }] : [],
    videoTitle: hasVideo ? `${seed.name}の授業紹介` : undefined,
    videoDuration: hasVideo ? '05:00' : undefined,
    reviews: [],
  }
})

const builtInCourses = [...courses, ...additionalCourses]

function parseCsvLine(line: string): string[] {
  const fields: string[] = []
  let field = ''
  let quoted = false
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        field += '"'
        index += 1
      } else {
        quoted = !quoted
      }
    } else if (character === ',' && !quoted) {
      fields.push(field)
      field = ''
    } else {
      field += character
    }
  }
  if (quoted) throw new Error('CSVの引用符が閉じられていません。')
  fields.push(field)
  return fields
}

function managedRowsToCourses(rows: ManagedCourseRow[]): Course[] {
  return rows.map((row) => {
    const slots = [...row.period.matchAll(/([1-5])限/g)].map((match) => ({ weekday: row.weekday, period: `${match[1]}限` }))
    const period = row.period.replace(new RegExp(`^${row.weekday}曜`), '')
    return {
      id: row.id,
      code: row.id,
      name: row.name,
      department: row.department,
      professor: '情報未登録',
      weekday: row.weekday,
      period,
      credits: 2,
      semester: row.semester,
      room: '情報未登録',
      summary: '',
      tags: [],
      evaluation: [],
      textbook: '情報未登録',
      materials: [],
      reviews: [],
      scheduleSlots: slots,
    }
  })
}

function courseHasScheduleSlot(course: Course, weekday: string, period: string): boolean {
  if (course.scheduleSlots) return course.scheduleSlots.some((slot) => slot.weekday === weekday && slot.period === period)
  return course.weekday === weekday && course.period === period
}

function isInScheduleSemester(course: Course, semester: ScheduleSemester): boolean {
  return semester === '前期'
    ? course.semester === '前期' || course.semester === '春学期'
    : course.semester === '後期' || course.semester === '秋学期'
}

function parseManagedCourses(csv: string): Course[] {
  const lines = csv.replace(/^\uFEFF/, '').split(/\r?\n/).filter((line) => line.trim())
  if (lines.length < 2) throw new Error('授業CSVにデータがありません。')
  const header = parseCsvLine(lines[0])
  const expectedHeader = ['id', 'department', 'name', 'weekday', 'period', 'semester']
  if (header.length !== expectedHeader.length || header.some((value, index) => value !== expectedHeader[index])) {
    throw new Error('授業CSVの見出しが正しくありません。')
  }
  const rows = lines.slice(1).map((line, index) => {
    const fields = parseCsvLine(line)
    if (fields.length !== expectedHeader.length || fields.some((field) => !field.trim())) {
      throw new Error(`授業CSVの${index + 2}行目が正しくありません。`)
    }
    return Object.fromEntries(expectedHeader.map((key, fieldIndex) => [key, fields[fieldIndex].trim()])) as ManagedCourseRow
  })
  return managedRowsToCourses(rows)
}

const storageKeys = { selection: 'unilenz-selection', reviews: 'unilenz-reviews', favorites: 'unilenz-favorites', timetable: 'unilenz-timetable', profile: 'unilenz-profile' }
const attachmentDatabase = 'unilenz-attachments'
const attachmentStore = 'files'
const maxAttachmentSize = 10 * 1024 * 1024
const maxVideoSize = 50 * 1024 * 1024
const maxVideoDurationSeconds = 5 * 60
const acceptedAttachmentTypes = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])

function openAttachmentDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(attachmentDatabase, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(attachmentStore)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('添付ファイルの保存先を開けません。'))
  })
}

async function saveAttachment(id: string, file: File): Promise<void> {
  const database = await openAttachmentDatabase()
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(attachmentStore, 'readwrite')
    transaction.objectStore(attachmentStore).put(file, id)
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error ?? new Error('添付ファイルを保存できません。'))
    transaction.onabort = () => reject(transaction.error ?? new Error('添付ファイルの保存が中断されました。'))
  }).finally(() => database.close())
}

async function loadAttachment(id: string): Promise<Blob | undefined> {
  const database = await openAttachmentDatabase()
  return new Promise((resolve, reject) => {
    const request = database.transaction(attachmentStore, 'readonly').objectStore(attachmentStore).get(id)
    request.onsuccess = () => resolve(request.result as Blob | undefined)
    request.onerror = () => reject(request.error ?? new Error('添付ファイルを読み込めません。'))
    request.transaction?.addEventListener('complete', () => database.close(), { once: true })
  })
}

function readVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    const objectUrl = URL.createObjectURL(file)
    const cleanup = () => {
      URL.revokeObjectURL(objectUrl)
      video.removeAttribute('src')
    }
    video.preload = 'metadata'
    video.onloadedmetadata = () => {
      const duration = video.duration
      cleanup()
      if (Number.isFinite(duration) && duration > 0) resolve(duration)
      else reject(new Error('動画の長さを読み取れませんでした。'))
    }
    video.onerror = () => {
      cleanup()
      reject(new Error('MP4動画を読み取れませんでした。'))
    }
    video.src = objectUrl
  })
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainder = Math.floor(seconds % 60)
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
}

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

function normalizeProfile(saved: unknown): UserProfile {
  const fields = saved && typeof saved === 'object' ? saved as Record<string, unknown> : {}
  return {
    username: typeof fields.username === 'string' ? fields.username.slice(0, 30) : 'あなた',
    grade: profileGrades.find((grade) => grade === fields.grade) ?? '1年',
    avatarAttachmentId: typeof fields.avatarAttachmentId === 'string' ? fields.avatarAttachmentId : null,
  }
}

function App() {
  const [managedCourses, setManagedCourses] = useState<Course[]>([])
  const [managedCoursesError, setManagedCoursesError] = useState('')
  const [isManagedCoursesLoading, setIsManagedCoursesLoading] = useState(true)
  const [selection, setSelection] = useState<DepartmentSelection | null>(() => {
    return normalizeSavedSelection(readStorage<DepartmentSelection | null>(storageKeys.selection, null))
  })
  const [setupFaculty, setSetupFaculty] = useState<Faculty>(() => selection?.faculty ?? '法学部')
  const [setupDepartment, setSetupDepartment] = useState(() => selection?.department ?? '')
  const [profile, setProfile] = useState<UserProfile>(() => normalizeProfile(readStorage<unknown>(storageKeys.profile, null)))
  const [profileDraft, setProfileDraft] = useState<UserProfile>(profile)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [profileImagePreviewUrl, setProfileImagePreviewUrl] = useState<string | null>(null)
  const [profileError, setProfileError] = useState('')
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [activeNav, setActiveNav] = useState('explore')
  const [scheduleSemester, setScheduleSemester] = useState<ScheduleSemester>('前期')
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [courseReturnNav, setCourseReturnNav] = useState<'explore' | 'schedule' | 'favorites'>('explore')
  const [activeTab, setActiveTab] = useState('詳細')
  const [selectedReviewTag, setSelectedReviewTag] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ weekday: '', period: '', semester: '' })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [postCourseId, setPostCourseId] = useState('')
  const [postKind, setPostKind] = useState<PostKind>('comment')
  const [commentDraft, setCommentDraft] = useState('')
  const [selectedAttachment, setSelectedAttachment] = useState<File | null>(null)
  const [selectedVideoDuration, setSelectedVideoDuration] = useState<number | null>(null)
  const [isCheckingVideo, setIsCheckingVideo] = useState(false)
  const [attachmentError, setAttachmentError] = useState('')
  const [userReviews, setUserReviews] = useState<Review[]>(() => readStorage(storageKeys.reviews, []))
  const [favoriteCourseIds, setFavoriteCourseIds] = useState<string[]>(() => {
    const savedIds = readStorage<unknown>(storageKeys.favorites, [])
    return Array.isArray(savedIds)
      ? [...new Set(savedIds.filter((id): id is string => typeof id === 'string' && builtInCourses.some((course) => course.id === id)))]
      : []
  })
  const [timetableCourseIds, setTimetableCourseIds] = useState<string[]>(() => {
    const savedIds = readStorage<unknown>(storageKeys.timetable, [])
    return Array.isArray(savedIds)
      ? [...new Set(savedIds.filter((id): id is string => typeof id === 'string' && builtInCourses.some((course) => course.id === id)))]
      : []
  })
  const videoCheckSequence = useRef(0)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/data/business-economics-courses.csv', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`授業CSVを読み込めませんでした（${response.status}）。`)
        return response.text()
      })
      .then((csv) => setManagedCourses(parseManagedCourses(csv)))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setManagedCoursesError(error instanceof Error ? error.message : '授業CSVを読み込めませんでした。')
      })
      .finally(() => setIsManagedCoursesLoading(false))
    return () => controller.abort()
  }, [])

  useEffect(() => {
    return () => {
      if (profileImagePreviewUrl) URL.revokeObjectURL(profileImagePreviewUrl)
    }
  }, [profileImagePreviewUrl])

  useEffect(() => {
    if (selection) localStorage.setItem(storageKeys.selection, JSON.stringify(selection))
  }, [selection])

  useEffect(() => {
    localStorage.setItem(storageKeys.reviews, JSON.stringify(userReviews))
  }, [userReviews])

  useEffect(() => {
    localStorage.setItem(storageKeys.favorites, JSON.stringify(favoriteCourseIds))
  }, [favoriteCourseIds])

  useEffect(() => {
    localStorage.setItem(storageKeys.timetable, JSON.stringify(timetableCourseIds))
  }, [timetableCourseIds])

  const allCourses = [...builtInCourses, ...managedCourses]
  const selectedCourse = allCourses.find((course) => course.id === selectedCourseId) ?? null
  const favoriteCourses = allCourses.filter((course) => favoriteCourseIds.includes(course.id))
  const visibleCourses = allCourses.filter((course) => {
    if (selection && course.department !== selection.department) return false
    if (search && !course.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())) return false
    if (filters.weekday && course.weekday !== filters.weekday) return false
    if (filters.period && course.period !== filters.period) return false
    if (filters.semester && course.semester !== filters.semester) return false
    return true
  })
  const courseReviews = selectedCourse
    ? [...selectedCourse.reviews, ...userReviews.filter((review) => review.courseId === selectedCourse.id && (review.kind === undefined || review.kind === 'comment'))]
    : []
  const visibleReviews = selectedReviewTag
    ? courseReviews.filter((review) => review.tag === selectedReviewTag)
    : courseReviews
  const activeFilterCount = Object.values(filters).filter(Boolean).length
  const departmentOptions = facultyDepartments[setupFaculty]

  function submitDepartment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!facultyDepartments[setupFaculty].includes(setupDepartment)) return
    setSelection({ faculty: setupFaculty, department: setupDepartment })
    setSelectedCourseId(null)
    setActiveNav('explore')
  }

  function openProfile() {
    if (selection) {
      setSetupFaculty(selection.faculty)
      setSetupDepartment(selection.department)
    }
    setProfileDraft(profile)
    setProfileImageFile(null)
    setProfileImagePreviewUrl(null)
    setProfileError('')
    setActiveNav('profile')
    setSelectedCourseId(null)
    setSelectedReviewTag(null)
  }

  function changeSetupFaculty(faculty: Faculty) {
    setSetupFaculty(faculty)
    setSetupDepartment(facultyDepartments[faculty][0])
  }

  function selectProfileImage(file: File | undefined) {
    if (!file) return
    if (!acceptedAttachmentTypes.has(file.type) || file.type === 'application/pdf') {
      setProfileImageFile(null)
      setProfileImagePreviewUrl(null)
      setProfileError('プロフィール画像はJPEG、PNG、WebP形式を選択してください。')
      return
    }
    if (file.size > maxAttachmentSize) {
      setProfileImageFile(null)
      setProfileImagePreviewUrl(null)
      setProfileError('プロフィール画像は10MB以下のファイルを選択してください。')
      return
    }
    setProfileImageFile(file)
    setProfileImagePreviewUrl(URL.createObjectURL(file))
    setProfileError('')
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const username = profileDraft.username.trim()
    if (!username) {
      setProfileError('ユーザーネームを入力してください。')
      return
    }
    if (!facultyDepartments[setupFaculty].includes(setupDepartment)) {
      setProfileError('学部と学科を選択してください。')
      return
    }

    setIsSavingProfile(true)
    try {
      let avatarAttachmentId = profile.avatarAttachmentId
      if (profileImageFile) {
        avatarAttachmentId = `profile-${crypto.randomUUID()}`
        try {
          await saveAttachment(avatarAttachmentId, profileImageFile)
        } catch {
          setProfileError('プロフィール画像を保存できませんでした。空き容量を確認して再度お試しください。')
          return
        }
      }

      const nextProfile = { ...profileDraft, username, avatarAttachmentId }
      try {
        localStorage.setItem(storageKeys.profile, JSON.stringify(nextProfile))
      } catch {
        setProfileError('プロフィールを保存できませんでした。ブラウザの保存容量を確認してください。')
        return
      }
      setProfile(nextProfile)
      setProfileDraft(nextProfile)
      setProfileImageFile(null)
      setProfileImagePreviewUrl(null)
      setProfileError('')
      setSelection({ faculty: setupFaculty, department: setupDepartment })
      setActiveNav('explore')
    } finally {
      setIsSavingProfile(false)
    }
  }

  function toggleFavorite(courseId: string) {
    setFavoriteCourseIds((current) => current.includes(courseId)
      ? current.filter((id) => id !== courseId)
      : [...current, courseId])
  }

  function toggleTimetableCourse(courseId: string) {
    setTimetableCourseIds((current) => current.includes(courseId)
      ? current.filter((id) => id !== courseId)
      : [...current, courseId])
  }

  function openCourse(courseId: string, source: 'explore' | 'schedule' | 'favorites' = 'explore') {
    setSelectedCourseId(courseId)
    setCourseReturnNav(source)
    setSelectedReviewTag(null)
    setActiveTab('詳細')
  }

  function openCourseReviews(courseId: string, tag: string | null = null) {
    setSelectedCourseId(courseId)
    setActiveTab('コメント')
    setSelectedReviewTag(tag)
  }

  function showCoursesForSlot(weekday: string, period: string) {
    setSearch('')
    setFilters({ weekday, period, semester: '' })
    setSelectedCourseId(null)
    setSelectedReviewTag(null)
    setActiveNav('explore')
  }

  function openPostComposer(courseId = '', kind: PostKind = 'comment') {
    setPostCourseId(courseId)
    setPostKind(kind)
    setCommentDraft('')
    setSelectedAttachment(null)
    setSelectedVideoDuration(null)
    setIsCheckingVideo(false)
    videoCheckSequence.current += 1
    setAttachmentError('')
    setActiveNav('post')
  }

  async function submitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const body = commentDraft.trim()
    const course = allCourses.find((item) => item.id === postCourseId)
    if (!course || (postKind === 'comment' && !body) || (postKind !== 'comment' && !selectedAttachment) || (postKind === 'video' && selectedVideoDuration === null) || body.length > 500) return
    const reviewId = `user-${crypto.randomUUID()}`
    const attachment = selectedAttachment ? {
      id: `attachment-${crypto.randomUUID()}`,
      name: selectedAttachment.name,
      type: selectedAttachment.type,
      size: selectedAttachment.size,
    } : undefined

    if (selectedAttachment && attachment) {
      try {
        await saveAttachment(attachment.id, selectedAttachment)
      } catch {
        setAttachmentError('添付ファイルを保存できませんでした。空き容量を確認して再度お試しください。')
        return
      }
    }

    const review: Review = {
      id: reviewId,
      courseId: course.id,
      author: 'あなた',
      createdAt: new Date().toISOString(),
      body,
      tag: postKind === 'material' ? '#講義資料' : postKind === 'video' ? '#講義動画' : '#受講メモ',
      kind: postKind,
      attachment,
      duration: postKind === 'video' ? selectedVideoDuration ?? undefined : undefined,
    }
    setUserReviews((current) => [...current, review])
    setCommentDraft('')
    setSelectedAttachment(null)
    setSelectedVideoDuration(null)
    setAttachmentError('')
    setSelectedCourseId(course.id)
    setActiveTab(postKind === 'material' ? '資料' : postKind === 'video' ? '動画' : 'コメント')
    setActiveNav('explore')
  }

  async function selectAttachment(file: File | undefined) {
    if (!file) return
    if (postKind === 'video') {
      const sequence = ++videoCheckSequence.current
      setSelectedAttachment(null)
      setSelectedVideoDuration(null)
      setIsCheckingVideo(false)
      if (!file.name.toLowerCase().endsWith('.mp4') || file.type !== 'video/mp4') {
        setAttachmentError('MP4形式の動画を選択してください。')
        return
      }
      if (file.size > maxVideoSize) {
        setAttachmentError('動画は50MB以下のファイルを選択してください。')
        return
      }
      setIsCheckingVideo(true)
      setAttachmentError('動画の長さを確認しています。')
      try {
        const duration = await readVideoDuration(file)
        if (sequence !== videoCheckSequence.current) return
        if (duration > maxVideoDurationSeconds) {
          setAttachmentError('動画は5分以内のものを選択してください。')
          return
        }
        setSelectedAttachment(file)
        setSelectedVideoDuration(duration)
        setAttachmentError('')
      } catch (error) {
        if (sequence !== videoCheckSequence.current) return
        setAttachmentError(error instanceof Error ? error.message : '動画を確認できませんでした。')
      } finally {
        if (sequence === videoCheckSequence.current) setIsCheckingVideo(false)
      }
      return
    }
    if (!acceptedAttachmentTypes.has(file.type)) {
      setSelectedAttachment(null)
      setAttachmentError('PDF、JPEG、PNG、WebP形式のファイルを選択してください。')
      return
    }
    if (file.size > maxAttachmentSize) {
      setSelectedAttachment(null)
      setAttachmentError('添付できるファイルは10MB以下です。')
      return
    }
    setSelectedAttachment(file)
    setSelectedVideoDuration(null)
    setAttachmentError('')
  }

  function clearFilters() {
    setFilters({ weekday: '', period: '', semester: '' })
  }

  return (
    <div className="app-frame">
      <a className="skip-link" href="#main">本文へ移動</a>
      <header className="topbar">
        <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); setSelectedCourseId(null); setSelectedReviewTag(null); setActiveNav('explore') }} aria-label="トリコマ 講義検索へ">
          <img className="brand-logo" src={logoImage} alt="" />
          <span className="brand-name">トリコマ</span>
        </a>
        {selection && <div className="topbar-actions">
          <span className="term-pill">2026</span>
          <button className="profile-button" type="button" aria-label="プロフィールを編集" onClick={openProfile}>
            <ProfileAvatar key={profile.avatarAttachmentId ?? 'no-avatar'} attachmentId={profile.avatarAttachmentId} />
          </button>
        </div>}
      </header>

      <main id="main" className="main-content">
        {!selection ? (
          <section className="setup-screen" aria-labelledby="setup-title">
            <div className="setup-kicker"><span className="kicker-dot" /> CAMPUS SYLLABUS HUB</div>
            <p className="screen-overline">はじめに</p>
            <h1 id="setup-title">学部・学科を<br />選択してください</h1>
            <p className="setup-intro">あなたの学科の講義と、先輩たちの声を集めます。</p>
            <form className="setup-form" onSubmit={submitDepartment}>
              <label htmlFor="faculty">学部</label>
              <select id="faculty" value={setupFaculty} onChange={(event) => changeSetupFaculty(event.target.value as Faculty)}>
                {Object.keys(facultyDepartments).map((faculty) => <option key={faculty}>{faculty}</option>)}
              </select>
              <label htmlFor="department">学科</label>
              <select id="department" value={setupDepartment} onChange={(event) => setSetupDepartment(event.target.value)} required>
                <option value="">学科を選択</option>
                {departmentOptions.map((department) => <option key={department}>{department}</option>)}
              </select>
              <div className="course-count-hint"><strong>{allCourses.filter((course) => course.department === setupDepartment).length}</strong> 講義を掲載中</div>
              <button className="primary-button setup-submit" type="submit" disabled={!setupDepartment}>講義を見る <span aria-hidden="true">→</span></button>
            </form>
            <p className="privacy-note">選択内容はこのブラウザに保存されます。</p>
          </section>
        ) : activeNav === 'post' ? (
          <section className="plain-screen post-screen" aria-labelledby="post-title">
            <button className="back-link" type="button" onClick={() => setActiveNav('explore')}><span aria-hidden="true">‹</span> 戻る</button>
            <PageHeading id="post-title" eyebrow="SHARE YOUR NOTES" title="投稿" description="講義を選んで、コメントや資料を共有しましょう。" />
            <form className="post-form" onSubmit={submitPost}>
              <label htmlFor="post-course">講義</label>
              <select id="post-course" value={postCourseId} onChange={(event) => setPostCourseId(event.target.value)} required>
                <option value="">講義を選択</option>
                {allCourses.filter((course) => course.department === selection?.department).map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}
              </select>
              <label htmlFor="post-kind">投稿内容</label>
              <select id="post-kind" value={postKind} onChange={(event) => { videoCheckSequence.current += 1; setPostKind(event.target.value as PostKind); setSelectedAttachment(null); setSelectedVideoDuration(null); setIsCheckingVideo(false); setAttachmentError('') }}>
                <option value="comment">コメント</option>
                <option value="material">講義資料</option>
                <option value="video">動画</option>
              </select>
              {postKind !== 'video' && <>
                <label htmlFor="post-body">{postKind === 'comment' ? '講義の感想' : '資料の説明（任意）'}</label>
                <textarea id="post-body" value={commentDraft} onChange={(event) => setCommentDraft(event.target.value.slice(0, 500))} maxLength={500} rows={5} placeholder={postKind === 'comment' ? '授業の雰囲気や課題について共有してください' : '資料の内容や授業回などを説明できます'} required={postKind === 'comment'} />
                <div className="character-count">{commentDraft.length} / 500</div>
              </>}
              <div className="attachment-controls">
                <label className="attachment-picker" htmlFor="post-attachment"><span aria-hidden="true">＋</span>{postKind === 'video' ? '動画をアップロード' : postKind === 'material' ? '講義資料を選択' : '資料を添付（任意）'}</label>
                <input id="post-attachment" className="visually-hidden-file" type="file" aria-label={postKind === 'video' ? '動画ファイル' : '資料ファイル'} accept={postKind === 'video' ? '.mp4,video/mp4' : '.pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp'} onChange={(event) => { void selectAttachment(event.currentTarget.files?.[0]) }} />
                <span className="attachment-limits">{postKind === 'video' ? 'MP4・5分以内・50MBまで' : 'PDF・JPEG・PNG・WebP / 10MBまで'}</span>
              </div>
              {selectedAttachment && <div className="attachment-selected"><span className="file-mark" aria-hidden="true">{postKind === 'video' ? 'MP4' : selectedAttachment.type === 'application/pdf' ? 'PDF' : 'IMG'}</span><span className="selected-file-name">{selectedAttachment.name}<small>{(selectedAttachment.size / 1024 / 1024).toFixed(2)} MB{selectedVideoDuration === null ? '' : ` · ${formatDuration(selectedVideoDuration)}`}</small></span><button type="button" aria-label="添付を解除" onClick={() => { videoCheckSequence.current += 1; setSelectedAttachment(null); setSelectedVideoDuration(null); setIsCheckingVideo(false); setAttachmentError('') }}>×</button></div>}
              {attachmentError && <p className="attachment-error" role="alert">{attachmentError}</p>}
              <p className="post-requirement">{postKind === 'comment' ? 'コメントは必須です。資料を添付することもできます。' : postKind === 'material' ? '講義資料ファイルを1点選択してください。説明文は省略できます。' : '5分以内・50MB以下のMP4動画を1本選択してください。'}</p>
              <button className="primary-button submit-comment" type="submit" disabled={!postCourseId || isCheckingVideo || (postKind === 'comment' ? !commentDraft.trim() : !selectedAttachment || (postKind === 'video' && selectedVideoDuration === null))}>投稿する <span aria-hidden="true">↗</span></button>
            </form>
          </section>
        ) : selectedCourse ? (
          <section className="detail-screen" aria-labelledby="course-title">
            <button className="back-link" type="button" onClick={() => { setSelectedCourseId(null); setActiveNav(courseReturnNav) }}><span aria-hidden="true">‹</span> {courseReturnNav === 'schedule' ? '時間割へ' : courseReturnNav === 'favorites' ? 'お気に入りへ' : '講義一覧へ'}</button>
            <div className="course-heading">
              <div className="course-meta-line"><span className="code-chip">{selectedCourse.code}</span><span>{selectedCourse.credits}単位</span><span>{selectedCourse.semester}</span></div>
              <h1 id="course-title">{selectedCourse.name}</h1>
              <p className="faculty-line">{selectedCourse.department} · {selectedCourse.professor} 教授</p>
              <div className="quick-facts">
                <div><span>開講</span><strong>{selectedCourse.weekday}曜 {selectedCourse.period}</strong></div>
                <div><span>教室</span><strong>{selectedCourse.room}</strong></div>
                <div><span>単位</span><strong>{selectedCourse.credits}単位</strong></div>
              </div>
              <button
                className={`timetable-detail-toggle${timetableCourseIds.includes(selectedCourse.id) ? ' enrolled' : ''}`}
                type="button"
                aria-pressed={timetableCourseIds.includes(selectedCourse.id)}
                onClick={() => toggleTimetableCourse(selectedCourse.id)}
              >
                {timetableCourseIds.includes(selectedCourse.id) ? '履修をやめる' : '時間割に追加'}
              </button>
            </div>
            <div className="tab-list" role="tablist" aria-label="講義情報">
              {['詳細', '資料', '動画', 'コメント'].map((tab) => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}
            </div>
            <div className="tab-content" role="tabpanel">
              {activeTab === '詳細' && <CourseOverview course={selectedCourse} />}
              {activeTab === '資料' && <CourseMaterials course={selectedCourse} posts={userReviews.filter((review) => review.courseId === selectedCourse.id && review.kind === 'material')} />}
              {activeTab === '動画' && <CourseVideo course={selectedCourse} posts={userReviews.filter((review) => review.courseId === selectedCourse.id && review.kind === 'video')} />}
              {activeTab === 'コメント' && (
                <section className="reviews-section" aria-labelledby="reviews-title">
                  <div className="section-heading-row"><div><p className="section-eyebrow">STUDENT VOICES</p><h2 id="reviews-title">先輩のコメント</h2></div><span className="review-count">{courseReviews.length}件</span></div>
                  {selectedReviewTag && <p className="review-filter" role="status">{selectedReviewTag}のコメントを表示中 <button type="button" onClick={() => setSelectedReviewTag(null)}>すべて表示</button></p>}
                  <div className="review-list">{visibleReviews.map((review) => <ReviewCard key={review.id} review={review} onTagClick={setSelectedReviewTag} />)}</div>
                  {selectedReviewTag && visibleReviews.length === 0 && <p className="review-empty">{selectedReviewTag}のコメントはまだありません。</p>}
                  <button className="compose-fab" type="button" aria-label="コメントを追加" onClick={() => openPostComposer(selectedCourse.id, 'comment')}>＋</button>
                </section>
              )}
            </div>
          </section>
        ) : activeNav === 'schedule' ? (
          <section className="plain-screen" aria-labelledby="schedule-title">
            <PageHeading id="schedule-title" eyebrow="YOUR WEEK" title="時間割" description={`${selection.department}の講義`} />
            <p className="schedule-credit-total" aria-label={`総単位数 ${allCourses.filter((course) => timetableCourseIds.includes(course.id) && course.department === selection.department).reduce((total, course) => total + course.credits, 0)} 単位、70単位中`}>
              （{allCourses.filter((course) => timetableCourseIds.includes(course.id) && course.department === selection.department).reduce((total, course) => total + course.credits, 0)}）/70
            </p>
            <div className="schedule-semester-tabs" role="tablist" aria-label="時間割の学期">
              {(['前期', '後期'] as const).map((semester) => <button
                key={semester}
                type="button"
                role="tab"
                aria-selected={scheduleSemester === semester}
                className={scheduleSemester === semester ? 'active' : ''}
                onClick={() => setScheduleSemester(semester)}
              >{semester}</button>)}
            </div>
            <div className="schedule-table-wrap">
              <table className="schedule-table" aria-label="時間割">
                <thead><tr><th scope="col">時限</th>{weekdays.map((day) => <th scope="col" key={day}>{day}</th>)}</tr></thead>
                <tbody>{periods.map((period) => <tr key={period}>
                  <th scope="row">{period}</th>
                  {weekdays.map((day) => {
                    const slotCourses = allCourses.filter((course) => timetableCourseIds.includes(course.id) && course.department === selection.department && isInScheduleSemester(course, scheduleSemester) && courseHasScheduleSlot(course, day, period))
                    const coursesAvailableToAdd = allCourses.some((course) => !timetableCourseIds.includes(course.id) && course.department === selection.department && isInScheduleSemester(course, scheduleSemester) && courseHasScheduleSlot(course, day, period))
                    return <td key={day}>
                      {slotCourses.length > 0 || coursesAvailableToAdd ? <div className="schedule-cell-courses">
                        {slotCourses.map((course) => <button className="schedule-course" key={course.id} type="button" aria-label={`${course.name}の詳細を開く`} onClick={() => openCourse(course.id, 'schedule')}>{course.name}</button>)}
                        {coursesAvailableToAdd && <button className="schedule-empty-button" type="button" aria-label={`${day}曜日 ${period}の講義を探す`} onClick={() => showCoursesForSlot(day, period)}><span aria-hidden="true">＋</span></button>}
                      </div> : null}
                    </td>
                  })}
                </tr>)}</tbody>
              </table>
            </div>
          </section>
        ) : activeNav === 'favorites' ? (
          <section className="plain-screen favorites-screen" aria-labelledby="favorites-title">
            <PageHeading id="favorites-title" eyebrow="YOUR SAVED COURSES" title="お気に入り" description="気になる講義をまとめて確認できます。" />
            {favoriteCourses.length > 0 ? <div className="course-list" aria-label="お気に入り講義一覧">
              {favoriteCourses.map((course, index) => <CourseCard
                key={course.id}
                course={course}
                index={index}
                reviewCount={course.reviews.length + userReviews.filter((review) => review.courseId === course.id && (review.kind === undefined || review.kind === 'comment')).length}
                isFavorite
                onToggleFavorite={() => toggleFavorite(course.id)}
                enrolled={timetableCourseIds.includes(course.id)}
                onToggleTimetable={() => toggleTimetableCourse(course.id)}
                onOpen={() => openCourse(course.id, 'favorites')}
                onOpenReviews={() => openCourseReviews(course.id)}
                onOpenTag={(tag) => openCourseReviews(course.id, tag)}
                onOpenPreview={(tab) => { setSelectedCourseId(course.id); setSelectedReviewTag(null); setActiveTab(tab) }}
                postedMaterial={userReviews.find((review) => review.courseId === course.id && review.kind === 'material')}
                postedVideo={userReviews.find((review) => review.courseId === course.id && review.kind === 'video')}
              />)}
            </div> : <div className="empty-state"><span aria-hidden="true">☆</span><h2>お気に入りはまだありません</h2><p>講義検索で星ボタンを押すと、ここに一覧表示されます。</p><button type="button" onClick={() => setActiveNav('explore')}>講義を探す</button></div>}
          </section>
        ) : activeNav === 'profile' ? (
          <section className="plain-screen profile-screen" aria-labelledby="profile-title">
            <PageHeading id="profile-title" eyebrow="YOUR PROFILE" title="プロフィール編集" description="プロフィールと表示する学部・学科を設定" />
            <form className="profile-form" onSubmit={(event) => { void saveProfile(event) }}>
              <div className="profile-image-setting">
                <ProfileAvatar key={`${profile.avatarAttachmentId ?? 'none'}-${profileImagePreviewUrl ?? 'none'}`} attachmentId={profile.avatarAttachmentId} previewUrl={profileImagePreviewUrl ?? undefined} className="profile-avatar-large" />
                <div className="profile-image-controls">
                  <label htmlFor="profile-image">プロフィール画像</label>
                  <label className="attachment-picker" htmlFor="profile-image">写真を選択</label>
                  <input id="profile-image" className="visually-hidden-file" type="file" aria-label="プロフィール写真" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" onChange={(event) => { selectProfileImage(event.currentTarget.files?.[0]); event.currentTarget.value = '' }} />
                  <span className="attachment-limits">JPEG・PNG・WebP / 10MBまで</span>
                </div>
              </div>
              {profileImageFile && <p className="profile-image-name">{profileImageFile.name}</p>}
              <label htmlFor="profile-username">ユーザーネーム</label>
              <input id="profile-username" value={profileDraft.username} maxLength={30} onChange={(event) => setProfileDraft((current) => ({ ...current, username: event.target.value }))} required />
              <label htmlFor="profile-faculty">学部</label>
              <select id="profile-faculty" value={setupFaculty} onChange={(event) => changeSetupFaculty(event.target.value as Faculty)}>
                {Object.keys(facultyDepartments).map((faculty) => <option key={faculty}>{faculty}</option>)}
              </select>
              <label htmlFor="profile-department">学科</label>
              <select id="profile-department" value={setupDepartment} onChange={(event) => setSetupDepartment(event.target.value)} required>
                {departmentOptions.map((department) => <option key={department}>{department}</option>)}
              </select>
              <label htmlFor="profile-grade">学年</label>
              <select id="profile-grade" value={profileDraft.grade} onChange={(event) => setProfileDraft((current) => ({ ...current, grade: event.target.value as ProfileGrade }))}>
                {profileGrades.map((grade) => <option key={grade}>{grade}</option>)}
              </select>
              {profileError && <p className="attachment-error" role="alert">{profileError}</p>}
              <button className="primary-button" type="submit" disabled={isSavingProfile || !setupDepartment || !profileDraft.username.trim()}>{isSavingProfile ? '保存中...' : 'プロフィールを保存'}</button>
            </form>
            <div className="profile-note"><span className="note-mark">i</span><p>プロフィールと講義データはこのブラウザ内に保存され、他の端末とは共有されません。</p></div>
          </section>
        ) : (
          <section className="explore-screen" aria-labelledby="explore-title">
            <div className="department-strip"><span className="department-icon" aria-hidden="true">学</span><div><strong>{selection.faculty}</strong><span>{selection.department}</span></div><button type="button" aria-label="学部・学科を変更" onClick={openProfile}>変更 <span aria-hidden="true">↗</span></button></div>
            <div className="explore-heading"><div><p className="screen-overline">COURSE DISCOVERY</p><h1 id="explore-title">講義を探す</h1></div><span className="result-total">{visibleCourses.length}<small>講義</small></span></div>
            <label className="search-box"><span aria-hidden="true">⌕</span><input type="search" aria-label="講義名で検索" placeholder="講義名で検索" value={search} onChange={(event) => setSearch(event.target.value)} /><button type="button" aria-label="絞り込み条件" onClick={() => setIsFilterOpen(true)}>☷{activeFilterCount > 0 && <i>{activeFilterCount}</i>}</button></label>
            <div className="filter-quick-row"><span>今学期の講義</span><button type="button" onClick={() => setFilters((current) => ({ ...current, semester: current.semester ? '' : '春学期' }))} className={filters.semester === '春学期' ? 'selected' : ''}>春学期</button><button type="button" onClick={() => setIsFilterOpen(true)}>曜日・時限 <span aria-hidden="true">⌄</span></button></div>
            {isManagedCoursesLoading && <p className="course-data-status" role="status">授業一覧を読み込み中...</p>}
            {managedCoursesError && <p className="attachment-error course-data-status" role="alert">{managedCoursesError}</p>}
            <div className="course-list" aria-label="講義一覧">
              {visibleCourses.map((course, index) => <CourseCard
                key={course.id}
                course={course}
                index={index}
                reviewCount={course.reviews.length + userReviews.filter((review) => review.courseId === course.id && (review.kind === undefined || review.kind === 'comment')).length}
                isFavorite={favoriteCourseIds.includes(course.id)}
                onToggleFavorite={() => toggleFavorite(course.id)}
                enrolled={timetableCourseIds.includes(course.id)}
                onToggleTimetable={() => toggleTimetableCourse(course.id)}
                onOpen={() => openCourse(course.id)}
                onOpenReviews={() => openCourseReviews(course.id)}
                onOpenTag={(tag) => openCourseReviews(course.id, tag)}
                onOpenPreview={(tab) => { setSelectedCourseId(course.id); setSelectedReviewTag(null); setActiveTab(tab) }}
                postedMaterial={userReviews.find((review) => review.courseId === course.id && review.kind === 'material')}
                postedVideo={userReviews.find((review) => review.courseId === course.id && review.kind === 'video')}
              />)}
              {visibleCourses.length === 0 && <div className="empty-state"><span aria-hidden="true">⌕</span><h2>講義が見つかりません</h2><p>検索語や絞り込み条件を変えてみてください。</p><button type="button" onClick={() => { setSearch(''); clearFilters() }}>条件をクリア</button></div>}
            </div>
          </section>
        )}
      </main>

      {selection && <nav className="bottom-nav" aria-label="メインナビゲーション">
        <NavButton active={activeNav === 'explore' && !selectedCourse} icon="⌕" label="講義検索" onClick={() => { setSelectedCourseId(null); setActiveNav('explore') }} />
        <NavButton active={activeNav === 'schedule' && !selectedCourse} icon="▦" label="時間割" onClick={() => { setSelectedCourseId(null); setActiveNav('schedule') }} />
        <NavButton active={activeNav === 'post'} icon="＋" label="投稿" onClick={() => openPostComposer(selectedCourse?.id ?? '')} />
        <NavButton active={activeNav === 'favorites' && !selectedCourse} icon="☆" label="お気に入り" onClick={() => { setSelectedCourseId(null); setActiveNav('favorites') }} />
      </nav>}

      {isFilterOpen && <div className="sheet-backdrop" onClick={() => setIsFilterOpen(false)}>
        <section className="bottom-sheet filter-sheet" role="dialog" aria-modal="true" aria-labelledby="filter-title" onClick={(event) => event.stopPropagation()}>
          <div className="sheet-handle" />
          <div className="sheet-title-row"><div><p className="section-eyebrow">NARROW YOUR SEARCH</p><h2 id="filter-title">講義を絞り込む</h2></div><button type="button" className="icon-button" aria-label="閉じる" onClick={() => setIsFilterOpen(false)}>×</button></div>
          <label htmlFor="filter-weekday">曜日</label><select id="filter-weekday" value={filters.weekday} onChange={(event) => setFilters((current) => ({ ...current, weekday: event.target.value }))}><option value="">すべての曜日</option>{['月', '火', '水', '木', '金'].map((day) => <option key={day} value={day}>{day}曜日</option>)}</select>
          <label htmlFor="filter-period">時限</label><select id="filter-period" value={filters.period} onChange={(event) => setFilters((current) => ({ ...current, period: event.target.value }))}><option value="">すべての時限</option>{['1限', '2限', '3限', '4限', '5限'].map((period) => <option key={period}>{period}</option>)}</select>
          <label htmlFor="filter-semester">学期</label><select id="filter-semester" value={filters.semester} onChange={(event) => setFilters((current) => ({ ...current, semester: event.target.value }))}><option value="">すべての学期</option><option>春学期</option><option>秋学期</option></select>
          <div className="sheet-actions"><button className="text-button" type="button" onClick={clearFilters}>リセット</button><button className="primary-button" type="button" onClick={() => setIsFilterOpen(false)}>該当 {visibleCourses.length} 講義を見る</button></div>
        </section>
      </div>}

    </div>
  )
}

function ProfileAvatar({ attachmentId, previewUrl, className = '' }: { attachmentId: string | null; previewUrl?: string; className?: string }) {
  const [imageUrl, setImageUrl] = useState('')
  const [imageUnavailable, setImageUnavailable] = useState(false)

  useEffect(() => {
    let active = true
    let objectUrl = ''
    if (attachmentId && !previewUrl) {
      loadAttachment(attachmentId).then((blob) => {
        if (!active) return
        if (!blob) {
          setImageUnavailable(true)
          return
        }
        objectUrl = URL.createObjectURL(blob)
        setImageUrl(objectUrl)
      }).catch(() => {
        if (active) setImageUnavailable(true)
      })
    }

    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [attachmentId, previewUrl])

  return <span className={`profile-avatar ${className}`} aria-label={imageUnavailable ? 'プロフィール画像を読み込めません' : undefined}>
    {previewUrl || imageUrl ? <img src={previewUrl ?? imageUrl} alt="" /> : <span aria-hidden="true">{imageUnavailable ? '!' : 'name'}</span>}
  </span>
}

function PageHeading({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description: string }) {
  return <header className="page-heading"><p className="screen-overline">{eyebrow}</p><h1 id={id}>{title}</h1><p>{description}</p></header>
}

function NavButton({ active, icon, label, onClick }: { active: boolean; icon: string; label: string; onClick: () => void }) {
  return <button className={`nav-button${active ? ' active' : ''}`} type="button" aria-current={active ? 'page' : undefined} onClick={onClick}><span className="nav-icon" aria-hidden="true">{icon}</span><span>{label}</span></button>
}

function CourseCard({ course, index, reviewCount, isFavorite, onToggleFavorite, enrolled, onToggleTimetable, onOpen, onOpenReviews, onOpenTag, onOpenPreview, postedMaterial, postedVideo }: { course: Course; index: number; reviewCount: number; isFavorite: boolean; onToggleFavorite: () => void; enrolled: boolean; onToggleTimetable: () => void; onOpen: () => void; onOpenReviews: () => void; onOpenTag: (tag: string) => void; onOpenPreview: (tab: '動画' | '資料') => void; postedMaterial?: Review; postedVideo?: Review }) {
  return <article className="course-card" style={{ animationDelay: `${index * 55}ms` }}>
    <div className="course-card-top"><div className="course-avatar" aria-hidden="true">{course.name.slice(0, 1)}</div><div className="course-card-info"><div className="course-card-meta"><span>{course.weekday}曜 {course.period}</span><span>{course.credits}単位</span><span>{course.professor} 教授</span></div><button className="course-title-button" type="button" onClick={onOpen}>{course.name}<span aria-hidden="true">↗</span></button><span className="course-code">{course.code} · {course.semester}</span></div><button className={`favorite-toggle${isFavorite ? ' selected' : ''}`} type="button" aria-label={isFavorite ? `${course.name}をお気に入りから解除` : `${course.name}をお気に入りに追加`} aria-pressed={isFavorite} onClick={onToggleFavorite}>{isFavorite ? '★' : '☆'}</button></div>
    <CourseMediaPreview course={course} postedMaterial={postedMaterial} postedVideo={postedVideo} onOpen={onOpenPreview} />
    <p className="course-summary">{course.summary}</p>
    <div className="course-tags">{course.tags.slice(0, 2).map((tag) => <button className="hashtag-button" key={tag} type="button" aria-label={`${tag}の口コミを表示`} onClick={() => onOpenTag(tag)}>{tag}</button>)}</div>
    <div className="course-card-bottom"><button className="review-count-button" type="button" aria-label={`${reviewCount}件の口コミを表示`} onClick={onOpenReviews}>口コミ {reviewCount}件</button><button className="schedule-add-button" type="button" aria-pressed={enrolled} onClick={onToggleTimetable}>{enrolled ? '時間割から削除' : '時間割に追加'}</button><button type="button" onClick={onOpen}>講義を見る <span aria-hidden="true">→</span></button></div>
  </article>
}

function CourseMediaPreview({ course, postedMaterial, postedVideo, onOpen }: { course: Course; postedMaterial?: Review; postedVideo?: Review; onOpen: (tab: '動画' | '資料') => void }) {
  if (course.videoTitle || postedVideo?.attachment) return <CourseVideoPreview course={course} post={postedVideo} onOpen={() => onOpen('動画')} />

  const material = course.materials[0]
  const materialTitle = postedMaterial?.attachment?.name ?? material?.title
  if (!materialTitle) return null
  const materialBody = postedMaterial?.body || material?.body || '投稿された講義資料です。'

  return <button className="course-media-preview material-card-preview" type="button" aria-label={`${course.name}の資料プレビューを開く`} onClick={() => onOpen('資料')}>
    <span className="material-preview-copy"><small>LECTURE NOTES</small><strong>{materialTitle}</strong><span>{materialBody}</span></span>
  </button>
}

function CourseVideoPreview({ course, post, onOpen }: { course: Course; post?: Review; onOpen: () => void }) {
  const [thumbnail, setThumbnail] = useState('')
  const [thumbnailError, setThumbnailError] = useState(false)
  const attachmentId = post?.attachment?.id

  useEffect(() => {
    let active = true
    let video: HTMLVideoElement | undefined
    let videoUrl = ''
    const cleanup = () => {
      if (video) {
        video.onloadeddata = null
        video.onseeked = null
        video.onerror = null
        video.removeAttribute('src')
        video.load()
      }
      if (videoUrl) URL.revokeObjectURL(videoUrl)
    }

    if (!attachmentId) return cleanup

    loadAttachment(attachmentId).then((blob) => {
      if (!active) return
      if (!blob) {
        setThumbnailError(true)
        return
      }
      videoUrl = URL.createObjectURL(blob)
      video = document.createElement('video')
      video.muted = true
      video.preload = 'auto'
      video.onloadeddata = () => {
        if (!video || !active) return
        if (video.duration > 0.5) {
          try {
            video.currentTime = Math.min(1, video.duration / 2)
          } catch {
            captureFrame()
          }
        } else {
          captureFrame()
        }
      }
      video.onseeked = captureFrame
      video.onerror = () => {
        if (active) setThumbnailError(true)
      }
      video.src = videoUrl
      video.load()
    }).catch(() => {
      if (active) setThumbnailError(true)
    })

    function captureFrame() {
      if (!video || !active || !video.videoWidth || !video.videoHeight) {
        if (active) setThumbnailError(true)
        return
      }
      try {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const context = canvas.getContext('2d')
        if (!context) throw new Error('動画のサムネイルを作成できません。')
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        setThumbnail(canvas.toDataURL('image/jpeg', 0.8))
      } catch {
        setThumbnailError(true)
      }
    }

    return () => {
      active = false
      cleanup()
    }
  }, [attachmentId])

  const duration = post?.duration ? formatDuration(post.duration) : course.videoDuration
  return <button className="course-media-preview video-card-preview" type="button" aria-label={`${course.name}の映像プレビューを開く`} onClick={onOpen}>
    {thumbnail && <img className="video-preview-thumbnail" src={thumbnail} alt="" />}
    <span className="video-preview-play" aria-hidden="true">▶</span>
    <span className="video-preview-copy"><small>VIDEO PREVIEW{duration ? ` · ${duration}` : ''}</small><strong>{post?.body || post?.attachment?.name || course.videoTitle}</strong>{post?.attachment && thumbnailError && <small className="video-thumbnail-fallback">動画のサムネイルを表示できません</small>}</span>
  </button>
}

function CourseOverview({ course }: { course: Course }) {
  return <div className="detail-panels">
    <section className="content-panel"><div className="panel-heading"><span className="panel-icon blue" aria-hidden="true">01</span><div><p className="section-eyebrow">ABOUT THIS COURSE</p><h2>講義の目的・概要</h2></div></div><p className="panel-copy">{course.summary}</p></section>
    <section className="content-panel"><div className="panel-heading"><span className="panel-icon mint" aria-hidden="true">02</span><div><p className="section-eyebrow">GRADING</p><h2>成績評価割合</h2></div></div><div className="evaluation-bar">{course.evaluation.map((item, index) => <span key={item.label} className={`eval-segment eval-${index}`} style={{ width: `${item.percent}%` }} />)}</div><div className="evaluation-legend">{course.evaluation.map((item, index) => <div key={item.label}><span className={`legend-dot eval-${index}`} /><strong>{item.label}</strong><b>{item.percent}%</b><small>{item.note}</small></div>)}</div></section>
    <section className="content-panel textbook-panel"><div className="panel-heading"><span className="panel-icon orange" aria-hidden="true">03</span><div><p className="section-eyebrow">READING</p><h2>教科書・参考書</h2></div></div><p>{course.textbook}</p></section>
  </div>
}

function CourseMaterials({ course, posts }: { course: Course; posts: Review[] }) {
  return <section className="materials-section" aria-labelledby="materials-title">
    <div className="section-heading-row"><div><p className="section-eyebrow">LECTURE NOTES</p><h2 id="materials-title">講義資料の抜粋</h2></div><span className="material-pages">{course.materials.length > 0 ? 'PDF · 18頁' : '資料なし'}</span></div>
    {course.materials.length > 0 ? <>
      <div className="document-page">{course.materials.map((material, index) => <article className="document-excerpt" key={material.title}>
        <div className="document-topline"><span>LECTURE {String(index + 1).padStart(2, '0')}</span><span>{course.code}</span></div>
        <h3>{material.title}</h3>
        <p>{material.body}</p>
        <h4>この回の要点</h4>
        <ol>{material.points.map((point) => <li key={point}>{point}</li>)}</ol>
        <div className="document-footer"><span>{course.name}</span><span>{String(index + 3).padStart(2, '0')} / 18</span></div>
      </article>)}</div>
      <p className="document-caption">画面案の講義内容をもとにした抜粋形式の文章です。実際の講義資料ではありません。</p>
    </> : <p className="empty-materials">この講義の資料はありません。</p>}
    <section className="posted-materials" aria-labelledby="posted-materials-title">
      <div className="section-heading-row"><div><p className="section-eyebrow">SHARED MATERIALS</p><h2 id="posted-materials-title">投稿された講義資料</h2></div><span className="review-count">{posts.length}件</span></div>
      {posts.length > 0 ? <div className="review-list">{posts.map((post) => <ReviewCard key={post.id} review={post} />)}</div> : <p className="empty-materials">まだ投稿された講義資料はありません。</p>}
    </section>
  </section>
}

function CourseVideo({ course, posts }: { course: Course; posts: Review[] }) {
  const hasSampleVideo = Boolean(course.videoTitle && course.videoDuration)
  return <section className="video-section">
    <div className="section-heading-row"><div><p className="section-eyebrow">LECTURE CLIP</p><h2>授業の映像</h2></div>{hasSampleVideo && <span className="video-duration">{course.videoDuration}</span>}</div>
    {hasSampleVideo && <>
      <div className="video-poster"><div className="poster-grid" /><span className="play-button" aria-hidden="true">▶</span><div className="poster-caption"><span>講義ダイジェスト</span><strong>{course.videoTitle}</strong></div></div>
      <p className="video-note">動画ファイルは未提供のため、再生画面のデザイン見本を表示しています。</p>
    </>}
    <section className="posted-videos" aria-labelledby="posted-videos-title">
      <div className="section-heading-row"><div><p className="section-eyebrow">SHARED VIDEOS</p><h2 id="posted-videos-title">投稿された動画</h2></div><span className="review-count">{posts.length}件</span></div>
      {posts.length > 0 ? <div className="posted-video-list">{posts.map((post) => <VideoPostPlayer key={post.id} post={post} />)}</div> : !hasSampleVideo && <p className="empty-materials">この講義の映像はありません。</p>}
    </section>
  </section>
}

function VideoPostPlayer({ post }: { post: Review }) {
  const [url, setUrl] = useState('')
  const [failed, setFailed] = useState(false)
  const attachmentId = post.attachment?.id

  useEffect(() => {
    let objectUrl = ''
    let active = true
    if (!attachmentId) return
    loadAttachment(attachmentId).then((blob) => {
      if (!active) return
      if (!blob) {
        setFailed(true)
        return
      }
      objectUrl = URL.createObjectURL(blob)
      setUrl(objectUrl)
    }).catch(() => setFailed(true))
    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [attachmentId])

  return <article className="posted-video">
    <div className="posted-video-heading"><strong>{post.body || post.attachment?.name}</strong><span>{post.duration === undefined ? '' : formatDuration(post.duration)}</span></div>
    {failed || !attachmentId ? <p className="attachment-unavailable">動画を読み込めませんでした。</p> : url
      ? <video className="posted-video-player" controls preload="metadata" src={url} aria-label={`${post.body || post.attachment?.name}の動画`} />
      : <p className="attachment-loading">動画を読み込み中...</p>}
    {post.createdAt && <time className="posted-video-date" dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: 'long', day: 'numeric' })}</time>}
  </article>
}

function ReviewCard({ review, courseName, onTagClick }: { review: Review; courseName?: string; onTagClick?: (tag: string) => void }) {
  return <article className="review-card"><div className="review-avatar" aria-hidden="true">{review.author === 'あなた' ? 'あ' : review.author.startsWith('匿名') ? '匿' : review.author.slice(0, 1)}</div><div className="review-body"><div className="review-head"><div><strong>{review.author}</strong>{review.createdAt ? <time className="review-date" dateTime={review.createdAt}>{new Date(review.createdAt).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: 'long', day: 'numeric' })}</time> : <span>{review.year}</span>}</div>{courseName && <small className="review-course-name">{courseName}</small>}</div>{review.body && <p>{review.body}</p>}{onTagClick ? <button className="hashtag-button review-tag" type="button" aria-label={`${review.tag}の口コミを表示`} onClick={() => onTagClick(review.tag)}>{review.tag}</button> : <span className="review-tag">{review.tag}</span>}{review.attachment && <ReviewAttachmentView attachment={review.attachment} />}<div className="review-actions"><span>♡ <b>役に立った</b></span><span>↗ <b>共有</b></span></div></div></article>
}

function ReviewAttachmentView({ attachment }: { attachment: ReviewAttachment }) {
  const [url, setUrl] = useState('')
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let objectUrl = ''
    let active = true
    loadAttachment(attachment.id).then((blob) => {
      if (!active || !blob) return
      objectUrl = URL.createObjectURL(blob)
      setUrl(objectUrl)
    }).catch(() => setFailed(true))
    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [attachment.id])

  if (failed) return <p className="attachment-unavailable">添付ファイルを読み込めませんでした。</p>
  if (!url) return <p className="attachment-loading">添付ファイルを読み込み中...</p>

  return <a className="review-attachment-link" href={url} target="_blank" rel="noreferrer" aria-label={`添付ファイル ${attachment.name}`}>
    <span className="file-mark" aria-hidden="true">{attachment.type === 'application/pdf' ? 'PDF' : 'IMG'}</span>
    <span className="selected-file-name">{attachment.name}<small>{(attachment.size / 1024 / 1024).toFixed(2)} MB · 開く</small></span>
    <span className="attachment-open-mark" aria-hidden="true">↗</span>
  </a>
}

export default App
