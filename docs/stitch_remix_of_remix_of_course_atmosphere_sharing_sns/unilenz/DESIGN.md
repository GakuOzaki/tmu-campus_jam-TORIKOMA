---
name: UniLenz
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#444656'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#747687'
  outline-variant: '#c4c5d8'
  surface-tint: '#2749eb'
  primary: '#0f3ae0'
  on-primary: '#ffffff'
  primary-container: '#3858f8'
  on-primary-container: '#ebebff'
  inverse-primary: '#bac3ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#953100'
  on-tertiary: '#ffffff'
  tertiary-container: '#b94512'
  on-tertiary-container: '#ffe8e0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee0ff'
  primary-fixed-dim: '#bac3ff'
  on-primary-fixed: '#00105b'
  on-primary-fixed-variant: '#002fc9'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59b'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#812900'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Noto Sans
    fontSize: 17px
    fontWeight: '700'
    lineHeight: 24px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

The design system embodies the warmth, intellectual vitality, and casual optimism of contemporary university life in Japan. It bridges academic planning with spontaneous peer connection, rejecting both cold enterprise learning management interfaces and cluttered bulletin boards. The aesthetic sits at the intersection of Modern Japanese App Design and tactile, card-forward minimalism: crisp visual rhythm, intentional whitespace, softly rounded modularity, and micro-interactions that feel energetic yet respectful.

Key brand pillars:
- **Youthful Authenticity:** Direct, student-first voice without institutional stuffiness. Real course ratings, peer-to-peer syllabi annotations, and unvarnished campus reviews.
- **Clarity under Density:** Japanese academic workflows demand dense textual data (course codes, credit breakdowns, grading metrics) alongside rich media (slides, professor video teasers, whiteboard snaps). The visual presentation isolates density within clean, breathable micro-containers.
- **Modern Stationery Metaphor:** Evoking the quiet satisfaction of high-quality Japanese notebooks and stationery through delicate dividers, subtle surface elevations, and warm, tactile canvas tones.

## Colors

The palette balances the focus of campus study with the social spark of collegiate life.

- **Primary (`#3858F8` - Campus Ultramarine):** A bright, forward-leaning indigo blue representing clarity, trust, and forward momentum. Used for primary actions, current course highlights, unread badges, and key navigation highlights.
- **Secondary (`#10B981` - Mint Emerald):** A refreshing, vibrant mint-green evoking renewal, passed units, validated reviews, and active status indicators. Provides balanced visual contrast without signaling error.
- **Tertiary (`#FF7843` - Solar Tangerine):** A warm, high-visibility accent used selectively for urgent campus deadlines, live lecture badges, peer upvotes, and review rating stars.
- **Neutral Palette:**
  - Base canvas: `#F8F9FA` (Clean chalk paper with subtle warm undertones).
  - Elevated surfaces: `#FFFFFF` (Pure card surface).
  - Subtle borders / Dividers: `#E8ECF2` (Soft slate border).
  - Primary text: `#1A202C` (Deep charcoal; avoiding harsh pure black for Japanese reading comfort).
  - Secondary text / Metadata: `#64748B` (Refined slate grey).
  - Disabled / Ghost fills: `#EEF2F6`.

## Typography

The typography couples the friendly, geometric energy of **Plus Jakarta Sans** for numerical scores, Latin headings, tags, and time indicators with the legibility and stroke balance of **Noto Sans** for Japanese Kanji, Kana, and extended body reviews.

- **Kanji/Kana Optimization:** Set body text with slightly increased line-height (`1.55` to `1.65`) to prevent optical overcrowding common in dense academic syllabi.
- **Numbers & Metrics:** Use `Plus Jakarta Sans` with proportional tabular figures (`tnum`) for course credits, timestamps, class periods (e.g., 2限, 4限), and rating aggregates (e.g., `4.8 / 5.0`).
- **Hierarchy Rules:** Course titles and section headers use `headline-md` or `headline-sm` with a bold weight (`700`) to anchor scanning eyes on card grids.

## Layout & Spacing

The layout is built upon an 8-point vertical baseline grid with a fluid-within-constraints mobile-first architecture.

- **Mobile Canvas (Default, < 640px):** Single-column layout with fixed outer margin `margin: 1rem` (16px), 12px horizontal gutters (`gutter-sm`), and a bottom navigation clearance of 88px (incorporating dynamic safe area insets).
- **Tablet / Split View (640px – 1024px):** 2-column masonry or balanced dual-card grid with `margin-tablet: 1.5rem` and `gutter: 1rem`. Suited for lecture slide previews alongside live discussion threads.
- **Desktop / Web (≥ 1024px):** Fixed-width max container (1180px) centered with `margin-desktop: 2.5rem` and `gutter-lg: 1.5rem`, using a 12-column structure (3 columns navigation & schedules, 6 columns media & course feed, 3 columns student activity & review filters).
- **Rhythm Rules:** Inter-card vertical spacing strictly defaults to `space-md` (12px) to keep feeds tight, while section dividers use `space-xl` (32px) for breathing room.

## Elevation & Depth

Visual depth avoids heavy artificial drops, prioritizing layered, ambient daylight shadows tinted softly with deep indigo slate (`rgba(28, 39, 76, 0.06)`).

- **Ground Level (Canvas):** Tone `#F8F9FA`. Background for feeds and pages.
- **Layer 1 (Cards, Modules, List Rows):** Pure `#FFFFFF` surface accompanied by a hairline border (`1px solid #E8ECF2`) and an ambient shadow `0 2px 8px -2px rgba(28, 39, 76, 0.05)`.
- **Layer 2 (Floating Action Buttons, Active Navigation Bars, Slide Previews):** `#FFFFFF` with `0 8px 24px -4px rgba(28, 39, 76, 0.10)` and `1px solid rgba(232, 236, 242, 0.80)`.
- **Layer 3 (Modals, Bottom Sheets, Media Zoom Overlays):** `#FFFFFF` paired with dynamic backdrop blur (`backdrop-filter: blur(16px)` over `rgba(15, 23, 42, 0.40)`) and shadow `0 16px 40px -8px rgba(28, 39, 76, 0.18)`.
- **Interactive Press States:** Active cards slightly reduce vertical offset (`0 1px 3px rgba(28, 39, 76, 0.08)`) and scale down to `0.985`, providing satisfying tactile feedback reminiscent of physical buttons.

## Shapes

The design system adopts **Level 2 (Rounded)** curvature. This strikes the ideal equilibrium between Japanese mobile UI ergonomics (soft, approachable, non-intimidating) and structured structural discipline (scannable lists, tight timetables).

- **Primary Cards & Containers:** `1rem` (16px) radius for course review cards, media containers, and timetable chips.
- **Interactive Controls:** `0.5rem` to `0.75rem` (8px–12px) radius for input fields, filter buttons, and nested action icons.
- **Pill Exceptions:** User tags, category labels (e.g., `必修` [Required], `春学期` [Spring]), reaction counters, and persistent floating tabs employ full pill radius (`9999px`) to immediately distinguish contextual meta-tokens from actionable rectangular cards.

## Components

### 1. Buttons
- **Primary:** Solid `#3858F8` background with `#FFFFFF` text. Height `48px` (mobile touch target), `rounded-lg` (12px), bold font (`label-lg`). Subtle ambient shadow on resting, translates down `1px` on tap.
- **Secondary / Soft:** Tinted `#EEF2FF` fill with `#3858F8` text. Used for "Add to Timetable" or "Save Syllabus".
- **Outline / Filter:** Transparent background, `1px solid #E8ECF2`, text `#64748B`. Active state flips to `#3858F8` outline and fill tint.

### 2. Course & Review Cards
- White surface, `16px` border-radius, hairline slate border.
- **Header:** Course Code badge (pill), Course Name (`headline-sm`), Professor label, and instant rating indicator (e.g., `★ 4.6` in Solar Tangerine pill).
- **Body Area:** 16:9 media preview (lecture slide thumbnails, embedded 15-second syllabus video reel with play button overlay) or rich text student takeaway.
- **Footer:** Helpful counter (`役に立った` button with count), professor responsiveness tag, and comment preview.

### 3. Chips & Category Filters
- Height `32px`, horizontal padding `12px`, pill-shaped (`9999px`).
- Default: `#FFFFFF` fill, `#E8ECF2` border, `#64748B` typography.
- Active / Selected: `#3858F8` fill, `#FFFFFF` typography with a subtle glow or `#10B981` for completed/passed status filters.

### 4. Input Fields & Search
- Generous `44px` height with `12px` rounded corners.
- Background `#F1F5F9`, border transparent; transitions on focus to `#FFFFFF` background with `1.5px solid #3858F8` and an ambient blue focus ring (`rgba(56, 88, 248, 0.15)`).
- Prefix slot specifically calibrated for search icons or department selector icons.

### 5. Checkboxes & Radio Controls
- Checkbox: `20px` square, `6px` soft curvature. Unchecked: `1.5px solid #CBD5E1`. Checked: `#10B981` (Mint Emerald) fill with sharp white check vector.
- Radio: `20px` circle, `#3858F8` central dot when selected.

### 6. Media-Rich Lecture Previewers
- Rounded `12px` media wrapper with subtle inner border overlay (`inset 0 0 0 1px rgba(0,0,0,0.06)`).
- Slide carousel featuring horizontal snap scrolling, discrete pagination dots, and floating slide index indicator (`2 / 18`) in the top-right corner.

### 7. Bottom Navigation Bar
- Fixed dock, translucent white glass (`rgba(255, 255, 255, 0.92)` with `backdrop-filter: blur(20px)`), `1px solid #E8ECF2` top border.
- 4 primary destinations: **講義検索 (Explore)**, **タイムテーブル (Schedule)**, **キャンパス広場 (Feed)**, and **マイページ (Profile)** with animated active icon indicators in Campus Ultramarine.