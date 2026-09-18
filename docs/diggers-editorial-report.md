# The Diggers in Walton-on-Thames and Elmbridge: implementation and editorial-issues report

Page: `/history/diggers/` (`src/content/history/diggers.md`, rendered by `src/layouts/HistoryLongform.astro`).
Source manuscript: `diggers-walton-elmbridge-definitive-history.md`, implemented against `claude-code-diggers-publication-brief.md`.
Prepared: 16 September 2026. Status: **implemented locally, not committed, not deployed.**

This report separates three things: what was changed and why, what a structural citation check found, and what still needs an editorial decision. It does not claim that any printed book, private scan or archive document was independently checked. Those sources were not available in this session, and their absence is not treated as a problem.

---

## 0. Editor's revision, 18 September 2026

Darren's edited text was re-imported and is now what the page carries. The export came back with markdown escaping (`\*\*`, `\[`, `\\&`), which was undone. Tables and the reference list came back unchanged, checked cell by cell and entry by entry, so the original table formatting was kept.

The body is now about 9,600 words, down from about 10,000. Cuts of substance, all the editor's:

- the "Sermon of the Four Candles" passage and the Digger who filled the pulpit with thorns (removed the only citation of Hill, 1972 in that section; Hill is still cited under Rediscovering Winstanley);
- the cross-dressing-as-protest paragraph;
- both middle paragraphs of the Francis Drake section, on the elder and younger Francis Drake (see below);
- the paragraph explaining that the Wellingborough declaration predates the Surrey emissaries' arrest;
- shorter closers: "They must never be conflated", "This diversity matters", "The most careful account should preserve that uncertainty", the qualification of Elizabeth Barton and Jane Edsaw as possible participants, and the note that *The Law of Freedom* still contained coercive law.

Corrections applied to the new wording, all mechanical:

| Was | Now | Why |
|---|---|---|
| "local historicalEric Ratcliffe" | "local historian Eric Ratcliffe" | Missing word and space |
| "Wigan may have aced as" | "may have acted as" | Typo |
| "free-for-all.This helps" | "free-for-all. This helps" | Missing space |
| "moved to the Cobham  came from" | "moved to the Cobham phase came from" | Dropped word |
| "may have inspired other to act" | "may have inspired others to act" | Typo |
| "The key local question is, not why" | "is not why" | Stray comma |
| "common land belonging in Walton" | "belonging to Walton" | Preposition |
| "continuity between the exact seventeenth-century building should be treated cautiously" | "continuity between the seventeenth-century building and surviving fabric should be…" | The comparison had lost its second half |
| "Walton-on-Thames focused study" | "Walton-on-Thames-focused study" | Compound modifier |
| "Corns, Hughes & Loewenstein, 2009" | "Corns, Hughes and Loewenstein, 2009" | The ampersand form would not have linked to the reference |
| "St. George's Hill" (4) | "St George's Hill" | House style, matching the rest of the article |
| "no national Digger movement" | "no national Digger organisation" | Contradicted the heading and the section's own opening sentence. Flagged, then changed on the editor's instruction |

Two consequences of the cuts were raised and then resolved on the editor's instruction:

1. **The Francis Drake section** had lost its explanation and every citation. The manuscript's two paragraphs were restored as one, in the manuscript's own wording: the elder Francis Drake of Esher and his 1633/34 will, the younger man as the figure of 1649, Gurney describing him as farmer of the manor, and Pulford's use of the elder man's will to show the two cannot be the same person. The two framing sentences the editor had cut in the same pass ("Local history sources help disentangle the two generations" and "The distinction is small but important in a definitive account") were not restored, so the section keeps the tightened register. It now carries Gurney (2007) and Pulford (2000).
2. **Pulford (2000) is cited again** as a result. *An Humble Request* (Winstanley, 1650b/2009) remains the one uncited entry, pending item 3.3 below.

Publication and review dates are now 18 September 2026. Everything in sections 3 and 5 below still stands.

## 1. Textual changes to the manuscript

A word-count comparison between the manuscript's narrative and the page body confirms that the only textual differences are the ones listed here. No section was dropped or abridged.

| # | Change | Justification |
|---|---|---|
| 1 | Ten internal `filecite` markers removed from public text. Eight sat directly after an explicit citation to the same source (Stonebanks ×2, Ratcliffe ×2, Sandells/Ratcliffe, Valovoi and Lapshina ×3), so removal loses nothing. | Brief section 3: markers must not render. |
| 2 | One marker converted: after Sandells's caveat about her own church history, `turn45file1` became `(Sandells, 1992)`. | The sentence reports Sandells's own statement, so the attribution is unambiguous. No page number was supplied, so none was added. |
| 3 | One marker **unresolved** and removed: `turn44file14` after "both listed in Walton and Weybridge Local History Society bibliographies." See 3.4 below. | No matching reference-list entry. |
| 4 | `(Winstanley et al., 1649b/2009)` became `1649/2009`. | The reference list has one Winstanley et al. 1649 entry and no 1649a. The orphan suffix produced a citation matching nothing. |
| 5 | Two `(Winstanley, 1650/2009)` citations became `1650a/2009`, and the reference list now labels *A New-Yeers Gift* 1650a and *An Humble Request* 1650b. | The manuscript lists two sole-authored Winstanley 1650 works, so the citation was ambiguous. Both passages (Stoke Common cart and mare; John Taylor's crowd taking the Diggers to Walton and Kingston) were located today in the "Bill of Account" printed with *A New-Yeers Gift*, as reproduced in Berens (1906), Project Gutenberg text, items 2 and 7. The third instance could not be resolved (3.3). |
| 6 | "Your local history sources help disentangle the two generations" became "Local history sources help…". | Second-person address to the editor left over from the research process. |
| 6a | "That distinction matters. The Surrey Digger movement…" became "That distinction matters, the Surrey Digger movement…". | Editor's instruction, 16 September 2026. |
| 7 | Eight part headings (H2) added above the manuscript's section headings, which became H3. | Brief section 6: grouped contents rather than dozens of fragments. Headings are navigational labels only. |
| 8 | "What remains uncertain" and "Conclusion" moved ahead of the chronology and key-people tables. | The narrative now ends before the appendices. No wording changed. |
| 9 | Four internal links added to existing words: Hersham, Oatlands, St Mary's Church, Elmbridge Hundred. | Brief section 12. Link text is unchanged manuscript wording. |

### Additions (new text, derived only from the manuscript)

- **"The Diggers in brief"** box at the top: seven short answers (who, where, why Walton, common land, local disagreement, end date, exact location), each linking to its section. Every statement paraphrases the manuscript and keeps its qualifiers (for example "strongest general candidate, not a proven site").
- **"The places in the story"** table in the Place, landscape and memory part: ten places, their role, and how precisely each can be located, using only what the manuscript establishes. It is a text alternative to a map (see 5.2).
- Reference-list note explaining the Harvard-in-text / APA-list convention and the 1649/2009 date form.

## 2. Quotation checks carried out

Berens (1906) is public domain and reproduces several contemporary texts in modernised spelling. It was used as a check, not as a substitute source.

| Quotation | Result |
|---|---|
| "next to Campe Close" | Matches (Sanders's report as printed in Berens). |
| "malignant and disaffected" | Matches (Council of State letter). |
| "chief men" | Matches (Gladman's report). |
| "common treasury" | Matches (many instances). |
| "kingly and lordly" | Matches. |
| "George-Hill, in the Parish of Walton, in the County of Surrey" | Wording matches; Berens prints the modernised "Georges Hill". The manuscript's "George-Hill" presumably follows the Corns et al. edition. **Please confirm the spelling against Corns et al.** |
| "True Commonwealths Freedom" | Berens prints "True Commonwealth's Freedom" (modernised). **Confirm against Corns et al.** |
| "wives and families" | Not found in Berens. Not checkable here; retained. |

## 3. Structural citation check

The build now runs this check automatically. `src/components/LinkedCitations.astro` links every in-text author-date citation to its reference entry and logs anything it cannot match. On the current build: **128 in-text citations linked, 3 unmatched.**

Each reference entry was also checked for at least one in-text citation, excluding the "further research" group, which is deliberately uncited. Every entry is cited except *An Humble Request* (Winstanley, 1650b/2009). It stays in the list because it is almost certainly the work intended in 3.3; if the editor decides otherwise, remove it.

### 3.1 Missing reference: Hessayon, 2023
Cited for the probable 28 November 1649 date for the pulling down of two Little Heath houses. There is no Hessayon 2023 entry. Supply the full reference, or confirm that another Hessayon work was meant. Rendered as plain text for now.

### 3.2 Missing reference: Surrey Archaeological Society, 2000
Cited, alongside The Land Is Ours (1999), for the 1999 reoccupation not being evidence of the 1649 plot. There is no entry. Supply it (a *Bulletin* or *Collections* item?). Rendered as plain text for now.

### 3.3 Ambiguous: Winstanley, 1650/2009 (Platt and Sutton attack, pregnant woman)
Could be *A New-Yeers Gift* or *An Humble Request*. The attack is dated to early April 1650, after *A New-Yeers Gift* appeared, and web summaries (not checked sources) attribute the story to *An Humble Request*. It was **not** assigned without confirmation. Confirm 1650b and it will link automatically (add the suffix in `diggers.md`).

### 3.4 Unresolved marker: turn44file14
Supports the statement that Martin (1984) and Blackman (1988) are "both listed in Walton and Weybridge Local History Society bibliographies". The underlying file is not identifiable, and no WWLHS bibliography appears in the references. This is a low-stakes claim, but it needs an attribution, for example a WWLHS publications list with a URL or date.

### 3.5 Structurally matched, content worth confirming
- **Winstanley, 1649/2009** is the only sole-authored Winstanley 1649 entry (*A Watch-Word*), so the citations link there. One use supports a statement about the content of *The New Law of Righteousness*, which is not itself in the reference list. *A Watch-Word* does describe writing *The New Law of Righteousness* and then taking up the spade (confirmed in Berens), so the link is defensible, but please confirm the intended work. Another use supports the White Lion meeting of 24 August 1649. Please check that this is not being conflated with the "White Lion Prison" named in item 13 of the *New-Yeers Gift* Bill of Account.
- **Hessayon, 2014** ("Gerrard Winstanley and Jacob Boehme") is cited with Hessayon 2008 for the 1 or 8 April question. Confirm that this is the intended chapter.
- **Folger Shakespeare Library, n.d.-a/-b/-c** had no entries of their own. The manuscript embedded three Folger catalogue URLs inside other entries, and the context maps them unambiguously: n.d.-a to record 508576 (*Bloudie and Unchristian Acting*, the Thomason date), n.d.-b to 521283 (*An Appeal to the House of Commons*) and n.d.-c to 343949 (Wellingborough). Separate catalogue-record entries were created from that data. The Folger catalogue blocks automated access, so the titles are the manuscript's, not the catalogue's.
- **Whitelocke, cited in Berens, 1906** links to Berens as a secondary citation.
- **BFI, 2025** links to the British Film Institute (2025) entry.

## 4. Reference-list formatting (APA 7)

- Converted to APA 7 punctuation: "&" before the final author, sentence-case titles with proper nouns kept, italics on stand-alone works, containers and journals.
- Reprints are dated in the original/edition form (1649/2009) so that list and text match. Strict APA would print "(2009)… (Original work published 1649)". This follows the manuscript and keeps matching simple.
- Grouped as: primary and contemporary sources; specialist scholarship; local history and heritage; reception history and later interpretation; plus the uncited priority sources for future research. Berens is grouped under reception history because the article discusses it as an early interpretation, although it is also used for printed contemporary reports.
- **Stonebanks (1982)**: full title taken from the site's existing record in `sidney-road.md` ("Cottimore and Walton Lodge: An account of the two estates after the Inclosure of 1800"), which also confirms the booklet covers the 1800 Inclosure.
- Nothing was invented. Known gaps left as supplied:
  - Sandells (1992) has a place ("Walton-on-Thames") but no publisher.
  - Taylor (1982; later ed. 2000) has imprecise edition and publisher detail.
  - Vann (1965) and Webb (2004) have no DOIs.
  - The chapters in Corns et al. (2009) have no page ranges.
  - No access dates were added.
- **Kingston Court of Record book**: reformatted with "Kingston Court of Record" as the creating body, which is inferred from the item's title.

### Link check (16 September 2026)
Resolved (HTTP 200): Cambridge Core (Clarke Papers, Gurney 1994 DOI), exclassics Iver, Exeter famine texts, Gutenberg, BFI, Bangor, Elmbridge Museum ×3, JHU (Hessayon 2008 DOI), The Land Is Ours, Wigan Local History.
Blocked automated access (403/202), not treated as broken: Folger ×3, Manchester University Press, OUP (Gurney 2017 DOI), Historic England, Pirton history. Check these in a browser before publication.

## 5. Other editorial observations (not changed)

1. **Chronology and key-people tables carry no citations.** Several rows appear only there: 9 June 1649 (Winstanley addresses Fairfax again), 1 March 1650 (four cottages challenged), 1 April 1650 (fifteen Diggers indicted at Southwark), William Everard as a "former soldier", and Richard Maidley/Medley. Section 8.3 of the Standards expects citations close to substantive claims. Consider adding them to the table rows.
2. **Minor tension:** the chronology has the cottages "formally challenged" on 1 March 1650, while the narrative says "by early April several Diggers were also facing legal proceedings over cottages". This is probably compatible (proceedings that began in March were still under way in April), but worth a glance.
3. **Name variant:** the *True Levellers Standard* signatory list gives "Courton, J."; the narrative uses John Coulton. This is presumably the pamphlet's spelling. Confirm.
4. **Lights of Walton:** the manuscript calls the church episode the "Sermon of the Four Candles", while Ratcliffe's subtitle has "The 'Lights' in Walton St Mary". The page keeps the manuscript wording and presents the episode as context, not a Digger action, as the brief requires.

### 5.1 Images: none published
No image with documented rights exists in the repository for this subject. Opportunities, each needing a rights decision first:
- Your own photographs of St Mary's Church (the St Mary's article already has an unfilled image slot) and of the Digger memorial near Brooklands Road, captioned as commemorative.
- Title pages of *The True Levellers Standard Advanced*, *A Declaration of the Bloudie and Unchristian Acting* and *An Appeal to the House of Commons* from Folger digital collections or the British Library Thomason Tracts. Check the specific image licence; online availability is not permission.
- A still from Brownlow and Mollo's *Winstanley* (1975), captioned as a 1975 interpretation. Needs BFI permission.
- Historic England imagery of the St George's Hill hillfort. Check the licence.

### 5.2 Map: not built
No existing map facility suits this, and a drawn map would need coordinates this research does not establish. The "places in the story" table gives the same distinctions in text. A future map should use a dated historic OS sheet with documented licence and attribution, mark only secure points (St Mary's, Kingston, Cobham), shade only broad areas (St George's Hill, Little Heath), and state that Campe Close and the house sites are unlocated.

### 5.3 Other decisions for the editor
- **Dates:** `publishDate` and `reviewedDate` are set to 16 September 2026, the implementation date. Reset them to the real publication date when approved.
- **Byline:** the layout's default "By Darren Bayley". Confirm, or set `contributor`.
- **Standards Section 20 checklist:** human approval, rights review and WHKS claim records are outside this implementation and still need your sign-off.
- **Existing page corrected:** `/hersham/history/` said the Diggers' story "belong[s] properly to Weybridge, not Hersham". That contradicts the manuscript's evidence that the Diggers placed George Hill in Walton parish, which then included Hersham. The sentence now says the hill is associated with Weybridge today, but the Diggers placed it in Walton parish, which then included Hersham, and that the site is not in modern Hersham. It links to the new article.
- **St Mary's Church article:** a new short section says Diggers were held in the church, citing Berens (1906), whose reproduction of the Bill of Account was read today. It links to the new article.
