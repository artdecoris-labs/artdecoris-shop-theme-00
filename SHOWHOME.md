# The showhome branch

A storefront built only from what has been **decided**, so it can be shown to
people. It answers a different question from `stage`: not "does this work" but
"is this what you want".

This file exists only on this branch. It is the reason the branch exists, and
deleting it would leave an unexplained third theme.

## Theme ↔ branch map

| Branch | Shopify theme | Published? | For |
| --- | --- | --- | --- |
| `stage` | `artdecoris-shop-theme-00/stage` | No | Development. Real work happens here |
| `showhome` | `artdecoris-shop-theme-00/showhome` | No | **Showing.** Decided elements only |
| `main` | `artdecoris-shop-theme-00/main` | No — not yet | Release candidate |
| *(none)* | `Horizon` | **Yes** | The live storefront today |

Connect this branch in **Online Store → Themes → Add theme → Connect from
GitHub**, choosing `showhome`. Shopify creates an unpublished theme and keeps it
in step with the branch.

## The one rule

**Flow is one-way: `stage` → `showhome`. Never back.**

```
  stage ──merge──▶ showhome        yes
  showhome ──merge──▶ stage        no — cherry-pick instead
```

The reason is `config/settings_data.json`. The GitHub integration is **two-way**:
anything changed in the theme editor is committed straight back to the connected
branch by the Shopify bot. A showhome is *meant* to be edited in the editor —
that is most of what a showhome is for — so this branch will accumulate
theme-editor commits full of demo settings, sample copy and hand-placed content.

Merging that into `stage` would drag every demo decision into the real theme,
and the diff would be too large to review honestly. If something built here is
worth keeping, cherry-pick the file — usually a `.liquid` under `blocks/`,
`sections/` or `snippets/`, never `settings_data.json`.

Editing this theme in admin is therefore **allowed and expected**, which is the
opposite of the rule for `stage` and `main`. `git pull` before resuming local
work on this branch, same as always.

## Refreshing from stage

```powershell
git -C C:\DevOps\artdecoris-shop-theme-00 switch showhome
git -C C:\DevOps\artdecoris-shop-theme-00 pull            # pick up admin-side commits
git -C C:\DevOps\artdecoris-shop-theme-00 merge stage     # take the real work
```

Expect conflicts in `config/settings_data.json` and resolve them **in favour of
showhome** — the demo's settings are the point of the demo.

## What belongs here

Only what is decided. The capability matrix
(`artdecoris-private/odoo-shopify-capability-matrix.md`, section 5) is the
authority; at the time this branch was cut that was:

| | Element | Status |
| --- | --- | --- |
| C-01 | Designer as `vendor` + artist metaobject | built |
| C-06 | Artist story pages | built |
| C-12 | `/pages/artists` index | built |
| C-09 | Trilingual — `nl_NL`, `en_GB`, `fr_FR` | pattern proven |
| C-19 · C-20 · C-21 | Wishlist, compare, recently viewed — all `localStorage` | decided |
| C-27 | `/custom-art` as a content page | decided |

And two worth proving here **because** they are new and have never been rendered
by Shopify:

- **C-28 — a bundle.** One beanbag as filling + skin, the shopper choosing two
  skins and one filling. Proves the mechanism, the option count and the
  inventory behaviour before 240 products depend on it.
- **C-29 — the price.** A net price in Shopify shown gross to a Belgian visitor
  and correctly to one elsewhere. Confirms the tax setting does what the plan
  assumes, at a cost of one product.

**Nothing marked ◻ open belongs here.** A showhome that demonstrates an
undecided option teaches everyone the wrong answer, and it is remembered long
after the decision goes the other way.

## Products

A showhome wants roughly a dozen products with good photography. The media pass
found 41 products with no image at all and 138 whose images are too large for
Shopify to accept, so the selection is not arbitrary: pick from the eight images
that passed clean and the better end of the 1024–2047 px band. See
`artdecoris-private/discovery/odoo-media-2026-09-05.md`.

## Release flow

The five gates in the `theme-release` skill still apply to `stage` and `main`.
They do **not** apply to this branch: nothing here is a release candidate, and
nothing here reaches a customer. `theme check` is still worth running before
pushing, because a Liquid error renders as a broken page in front of whoever you
are showing it to.
