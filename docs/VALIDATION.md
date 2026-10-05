# Portfolio validation — 2026-10-05

- `npm run check`: passed JavaScript syntax, local asset/anchor checks and unique IDs.
- `npm run build`: passed; static output generated under ignored `dist/`.
- `git diff --check`: passed.
- Browser: installed Chromium-based Brave driven with temporary Playwright tooling under `/tmp/portfolio-browser` (no runtime dependencies added to the site).
- Viewports: 1440, 1024, 768, 390 and 320 pixels wide, 900 pixels high.
- All 12 project cards rendered at every width.
- No document or element horizontal overflow in the checks; expanded .NET details also fit.
- Every image was scrolled into view and successfully decoded at each width. Initial lazy-image checks taken before scrolling were inconclusive and were replaced by this explicit decode check.
- All section navigation destinations and both .NET detail controls worked; major project detail sections were opened and closed.
- Keyboard Enter opened/closed TimeReady details.
- JavaScript-disabled mobile check: all 12 cards rendered and native project details opened.
- Reduced-motion checks passed; normal desktop background loaded and the hero .NET shortcut navigated correctly.
- With the Three.js request blocked, no page exception occurred and the hero/navigation remained usable.
- Automated axe checks for WCAG 2 A/AA and WCAG 2.1 AA returned no violations at each tested width. This is automated screening, not a claim of comprehensive accessibility certification.
- Desktop/mobile screenshots were visually reviewed; existing image assets were reused and .NET visuals are conceptual text flows.
- GitHub repository existence/visibility and demo HTTP responses are recorded in `PROJECT-EVIDENCE.md`. No live demo was invented; private links require authorized GitHub access.

On 2026-10-05, the bundled CV PDF was replaced with the user-supplied October 2026 revision. PDF metadata/text extraction confirmed a readable, two-page, unencrypted A4 PDF. The static build verified the linked file exists and is included in `dist/images/`. No external repository tests were run and no site was published. No TypeScript compiler or framework lint configuration exists in this plain JavaScript repository.
