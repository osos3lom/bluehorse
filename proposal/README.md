# Client proposal — Blue Horse

`Blue-Horse-Proposal.pdf` — 13-page A4 commercial proposal pitching the Blue Horse
booking engine to Jeddah experience operators (adventures, nightlife, corporate,
concerts, voyages, memberships). This is the file to send. All contact details are
filled in; the only open commercial number is the one-time deployment fee.

## Still open

| Item | Where | Current text |
|---|---|---|
| One-time deployment fee | page 12 | `Quoted on brief` |

The 5,000 SAR annual support figure, the 7-day delivery ceiling, phone
(0506542290), website, and licence FL-004759783 are all set.

## Refreshing the screenshots

`opt/` holds 11 screenshots referenced by `proposal.html`. To recapture them from
the live app (run this whenever the UI changes):

```bash
npm run dev              # in the repo root — leave this running
npm i playwright-core    # once
node proposal/capture-screenshots.js
```

The script drives headless Chrome against `http://localhost:3000`, walks the
landing page, an adventures listing, a voyage detail page, the Arabic site, four
operator-console screens, and the three checkout steps (filling dummy Saudi
guest details to reach the payment step), and writes JPEGs straight into `opt/`.
It needs the dev server already running — start that first.

`opt/` still has a handful of leftover files (`03-catalog.jpg`, `04-event-detail.jpg`,
etc.) from an earlier prototype; they aren't referenced by `proposal.html` and can
be deleted whenever it's convenient.

## Rebuilding the PDF

To regenerate `Blue-Horse-Proposal.pdf` after editing `proposal.html` or refreshing
screenshots:

```bash
npm i playwright-core && node proposal/build-pdf.js
```

`build-pdf.js` renders `proposal.html` through headless Chrome and reports any
image that failed to load. Page geometry is driven by `@page { size: A4 }` plus
fixed `210mm × 297mm` `.page` blocks, so what the browser shows is what prints.
