# Reclaimed Attention reader companion

An interactive companion to Micah J. Miner's conceptual article, *Reclaimed Attention Is Not a Learning Outcome: Institutional Unproductive Success in K–12 Device Restriction*.

Seven chapters: test a claim against four hypothetical cases; trace the five proposed institutional moves; read six phone-policy sources for what each can and cannot establish; read Illinois Public Act 104-0657 as a worked example; examine pedagogical friction; stress-test the idea against neighboring accounts and the article's own limits; and prepare an inquiry sheet across six evaluation questions. The sheet downloads as Markdown or prints through the browser. An "article in brief" panel, key terms, and the article's full reference list sit in the page header and footer.

## Run locally

From this directory, run `node preview-server.cjs` and open `http://127.0.0.1:4173`. No dependencies or build step are required. Deployable files are in `dist/`.

## Source and interpretation

Content was checked against the manuscript revision of September 29, 2026. Section 5 supplies the four conditions, the proposed sequence, and the neighboring accounts; Section 3 supplies the evidence chapter; Section 6 supplies the statute chapter; Sections 4 and 7 supply the friction lenses; Section 8, Table 1 supplies the evaluation questions; Section 9 supplies the limits and research agenda. New scenarios are explicitly hypothetical, not empirical findings. Prompts labeled as the companion's own are not in the article. The reference list in `dist/references.js` is generated from the manuscript, not retyped.

Statutory provisions are paraphrased from the text of 105 ILCS 5/10-20.88 as added by P.A. 104-657, read on September 29, 2026. Section 10-20.88 currently carries three separate texts from different Acts, so cite the wireless communication device policy as the text from P.A. 104-657.

The framework is a proposal for inquiry, not a validated diagnostic, scoring system, or evidence of causal effects. Accessibility support can enable the target intellectual work. Social and wellbeing purposes need their own suitable evidence.

## Data and access

Companion material accompanying a manuscript in preparation. The hosted companion carries `noindex,nofollow`. The app has no analytics, AI service, server form submission, or persistent browser storage. It loads one external stylesheet, the shared ecosystem tokens at `https://minerclass.github.io/tokens.css`. Every token carries a fallback equal to the value the page used before adoption, so the page renders unchanged if that file is unavailable. Notes exist only in the page until downloaded. Reloading discards them. Do not enter identifiable student or research participant information.

When supported, browser tools can select a section and read the current reflection, including notes. They cannot modify notes, publish, or transmit files. Sites hosting credentials must remain outside this repository.

## Hosting

Two deployments serve the same `dist/` directory. GitHub Pages builds from `.github/workflows/pages.yml` on every push to `main`, publishing at `https://minerclass.github.io/reclaimed-attention-companion/`. The Codex static host reads `.openai/hosting.json`, which is untracked and must be redeployed from that workspace separately. Keep `dist/` as the served directory so neither breaks.

## Design tokens

The page links `https://minerclass.github.io/tokens.css` before its own stylesheet and declares `data-mjm-ground="light"` on the root element, following the adoption procedure documented in that file. Local tokens in `styles.css` point at the shared ones with fallbacks; colour literals elsewhere were replaced by those tokens. Text on the dark panels uses `--on-dark` with opacity for hierarchy, so it follows the ground rather than a fixed tint. Re-measure contrast against the real surfaces after changing either file.

## Maintenance

Keep manuscript interpretation, hypothetical examples, and evidence requirements distinct. Update this source map if the manuscript changes, and regenerate `dist/references.js` from the manuscript reference list rather than editing it by hand. The article names four dimensions of pedagogical friction; the friction chapter shows three learner-facing dimensions on an infrastructural base, and the sources panel says so. Mobile and keyboard checks, selected-state announcements, empty exports, and invalid tool inputs should be checked after interaction changes.
