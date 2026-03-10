# SEO + Performance Handoff Prompt (Based on Garage Work)

Use this prompt in the other project (e.g., Termix) to replicate the useful parts quickly and safely.

---

You are a senior Flask/Jinja web engineer.  
Run a practical SEO + performance pass with minimal regression risk.

## Primary goals
1. Improve Google indexing signals (technical SEO consistency).
2. Improve mobile PageSpeed (largest wins first).
3. Avoid visual regressions on hero/logo areas.

## Findings from the Garage project (important)
1. **Cache TTL missing** on static assets caused a large repeat-visit penalty.
2. **Render-blocking CSS** mostly came from CDN Bootstrap + fonts.
3. **Image delivery inefficiency** remained the biggest opportunity:
   - logos and feature images were much larger than rendered size.
   - gallery thumbnails were still heavier than needed on mobile.
4. Aggressive intrinsic sizing (`width/height`) on some logos/heroes can break layout in responsive `<picture>` setups.

## What worked well
1. Per-page SEO metadata:
   - unique `title`, `meta description`, canonical, hreflang + `x-default`.
2. Better robots/sitemap setup:
   - valid `robots.txt`,
   - dynamic sitemap with consistent URL format.
3. Age gate rework:
   - `<dialog>` + localized fallback,
   - consent version + expiration in localStorage.
4. Homepage performance:
   - moved non-critical scripts to deferred footer loading,
   - switched gallery to lightweight thumbnail sources.
5. Responsive image delivery:
   - `srcset`/`sizes` for mobile hero, logos, gallery thumbs, featurette images.

## Safe implementation order (do in this order)
1. **Caching first**
   - set static cache lifetime in Flask (`SEND_FILE_MAX_AGE_DEFAULT`).
2. **Responsive images with low risk**
   - add `srcset/sizes` for logos and gallery thumbnails first.
3. **Feature images**
   - add 400w/800w variants and wire with `srcset/sizes`.
4. **Mobile hero**
   - add 480w/640w/target-original variants; keep layout CSS unchanged.
5. **Only then** consider aggressive optimizations (critical CSS/font changes).

## Image generation examples (ImageMagick)
### Gallery mobile thumb variant
```bash
convert input.avif -resize 480x -strip -quality 45 output_480.avif
```

### Feature image variants
```bash
convert input.avif -resize 400x -strip -quality 45 output_400.avif
convert input.avif -resize 800x -strip -quality 45 output_800.avif
```

### Logos
```bash
convert logo.png -resize 128x -strip logo_128.png
convert logo.png -resize 256x -strip logo_256.png
convert logo.png -resize 512x -strip logo_512.png
```

## Rules to avoid regressions
1. Do not force `width/height` on fragile logo/hero elements unless visually verified on mobile + desktop.
2. Keep original source as fallback in `srcset`.
3. Verify:
   - navbar logo,
   - homepage title logo,
   - mobile hero image,
   - events/drink hero images.
4. If UI breaks, revert only risky image sizing changes; keep caching + safe `srcset` improvements.

## Validation checklist
1. `python3 -m py_compile` for Flask modules.
2. JSON translation validity.
3. Visual smoke test on:
   - `/cs/`, `/en/`,
   - mobile + desktop breakpoints.
4. Re-run PageSpeed mobile and compare:
   - cache lifetime issue,
   - image delivery savings,
   - render-blocking requests.

## Final output format expected from the agent
1. What was changed (files + purpose).
2. Which PSI findings were addressed.
3. What was intentionally not changed (risk/defer).
4. Optional cleanup list for generated assets not currently referenced.

---

## Garage-specific implementation notes to mirror
1. Cache lifetime set to 7 days in Flask app config.
2. Responsive variants added for:
   - navbar/footer logo,
   - homepage title logo (mobile + desktop),
   - featurette images,
   - gallery thumbs (480/720),
   - termix logo,
   - mobile poster (480/640/original).
3. Keep generated files under predictable suffixes (`_128`, `_256`, `_400`, `_480`, `_640`, `_800`, etc.).

