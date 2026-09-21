# Agent Log

Append-only. Newest entry first. No participant data, committee or faculty names,
credentials, or tokens.

---

## 2026-09-21 - Clarifying the first case and restoring Table 1 questions

**Why.** The evidence-versus-stipulation repair was conceptually correct, but the first
case could still leave a reader wondering why all four status chips were emphasized in a
weak case. The inquiry section also paraphrased five of the source table's six questions.

**Changed.**

- The first case now says directly that all four *warning conditions* are built into the
  fictional scenario and that this does not make its learning claim strong.
- The stipulation lead and legend use plainer language while retaining `Stipulated` as
  the compact status word.
- The inquiry cards now use the exact six question wordings from the manuscript's Table 1.

**Scope.** The case structure, statuses, evidence guidance, interaction model, shared
tokens, and visual design are unchanged.

---

## 2026-09-21 - Separating an evidence claim from a scenario stipulation

**Why.** A reader reported that the first section misrepresented its own argument, and
the report was correct. The case panel put the heading **"What the case supports"** — an
evidence claim — directly over a list of the four conditions of the proposed mechanism,
which is a construct-membership claim. Under one heading the two collapsed, so `Present`
read as *verified*. The worst instance was row three, which rendered as
**"Insufficient evidence for that claim — Present"** in green: an absence of evidence
presented as a positive finding.

**The colour ran opposite to the argument.** `.condition b.yes` was green. Case 01, the
pathology the source article warns about, showed four green badges; Case 04, where the
district behaves well and investigates before claiming, showed none. More green meant
worse practice, and the CSS class was named `yes`.

**A checklist also contradicts the source.** The article states that neither the
improvement alone nor the absence of learning measures establishes the construct, and
that a compliance rate or omitted measure cannot diagnose the sequence on its own. Four
independent badges are exactly the row-by-row diagnosis the argument forecloses. The
correcting sentence existed but sat below the badges in muted 0.82rem text, after the
reader had already parsed the list.

**Changed.**

- The evidence prose and the condition list now carry separate headings:
  **"What the evidence supports"** and **"How the scenario is written"**, the second
  introduced by a lead stating the rows describe stipulations, are read together, and are
  not a score. That lead sits *above* the list.
- `Present` became **`Stipulated`**, a word that cannot be misread as verified. Green is
  gone; emphasis is weight and ink on a neutral chip.
- Condition three was restored to the source wording, *"Evidence for the broader purpose
  remains insufficient"*. The shortened form had chained it to condition two, which left
  a dangling referent in Case 02 while Case 03 with the same structure read
  *"Not applicable"*. Both are now consistent.
- Added a legend for the four status terms, which previously rendered identically.

**Adopted the shared tokens.** Linked `https://minerclass.github.io/tokens.css` before the
page stylesheet, declared `data-mjm-ground="light"`, and pointed local tokens at the
shared ones with fallbacks equal to the pre-adoption values, per that file's own
procedure. Colour literals throughout both stylesheets now resolve through those tokens.
Text on the dark panels uses `--on-dark` with opacity for hierarchy, so it follows the
ground rather than a fixed blue-grey tint.

**Verified by measurement, not by eye.** Contrast was computed against real rendered
surfaces — walking up for the effective background and compounding ancestor opacity —
across 131 text elements in all four sections. One item sits below threshold: the
disabled *Previous* button at 3.65:1, which WCAG exempts as an inactive control and which
behaved the same way before. Disabling the token stylesheet reverts every local token to
its exact pre-adoption value, so a fetch failure leaves the page unchanged rather than
broken. No horizontal overflow in any section at 375px.

**One real accessibility fix found in passing.** Form input borders were `#95a3ba` at
**2.56:1**, under the 3:1 required of a perceivable UI border. They now resolve through
`--muted` at **5.97:1**.

**Pages.** `actions/configure-pages` with `enablement: true` cannot enable Pages on a new
repository — the default `GITHUB_TOKEN` is refused by the Pages creation API
(*Resource not accessible by integration*). The setting was flipped once by hand. The
workflow was then replaced with the ecosystem's canonical `pages.yml`, shared
byte-identical across the sibling repos; the only deviation is `path: dist`, because
`.openai/hosting.json` points the Codex static host at that same directory.
