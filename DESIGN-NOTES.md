# CUTSCENE — design memory

Project: gaming blog, "Cinematic Gaming Editorial" style. Built fresh in
`gaming-editorial/` (Next.js 15, App Router, RSC, no other deps). Built with
no reference to any prior project identity, per the brief.

## Concept

Games reviewed with the gravity of cinema. The site is a movie house:
letterboxed 21:9 hero with black projection bars, a live ticking timecode with
a REC dot, title cards over the frame, an amber lobby marquee of what's
showing, certificate-framed review scores, an intermission quote band, and a
footer that reads as a credits roll. The memorable element is the letterboxed
hero + running timecode; everything else stays disciplined around it.

## Tokens

- Stage black `#0C0B09`, panel `#14120E`, screen-light bone `#F2EBDC`
  (dimmed/faint variants for hierarchy), hairlines at 14%/28% bone alpha.
- Marquee amber `#F0B429` (deep `#B9820E`) — the single accent; REC red
  `#E5484D` strictly for live dots. Ink-on-amber `#171205`.
- Deliberately NOT near-black + acid-neon; the amber is lobby light and
  subtitle type, not gaming RGB.

## Type

- Bebas Neue — display/poster headlines, section headers, drop caps, score
  numerals. Condensed poster voice.
- Fraunces — editorial body (17–18px/1.7), deks, pull quotes (italic).
- IBM Plex Mono — bylines, timecode, codes (R-24, F-11), credits roles,
  metadata. All-caps with wide tracking reserved for these mono roles only.

## Layout

Flush-left editorial grid, 1200px wrap. Hero: full-bleed 21:9 frame, bars,
timecode top-right, title card lower-left like subtitles, score certificate
bottom-right (desktop). Home sequence: hero → marquee → features (3-up) →
intermission (amber quote band) → reviews (2-up) → frames + question-of-the-
week aside → credits footer. Articles: title card → meta bar → 66ch body with
amber drop cap and an extracted italic pull-quote (3rd paragraph) → sticky
side rail with the certificate → credits grid → prev/next reel nav.

## Devices that carry meaning (keep)

- Certificate score frame: double keyline, engraved, amber numeral — reviews
  are "rated" like film certificates. Essays get a plain FEATURE stamp.
- Mono codes (R-24 / F-11 / E-08) — the archive feels filed like reels.
- Content model in `src/lib/posts.ts` — five full pieces with real long-form
  copy, per-post art palettes, and Question-of-the-week answers.
- Question of the week is a real editorial position with a real answer.

## Motion

Marquee scroll (pauses on hover), REC-dot pulse, timecode tick, subtle plate
zoom on card hover. Reduced-motion fully respected. Nothing else animates.

## If extending

- Add posts in `src/lib/posts.ts` (kind: Review | Essay | Frame); indexes
  filter automatically; prev/next uses array order.
- Keep scores on the certificate only — never red, never neon.
- Keep body measure ≤ 72ch; keep the drop cap amber.
