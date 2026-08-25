# Artdecoris Shopify Theme

Shopify theme prototype.

## Branch workflow

- `main`: published theme used by the live storefront.
- `stage`: unpublished theme used for testing and previewing.

The first `stage` commit is a Horizon theme copy used to verify the workflow. Keep Shopify theme-editor changes out of the workflow unless they are deliberately brought back into Git.

## Local development

Install Shopify CLI, authenticate, and work from this directory:

```powershell
npm install -g @shopify/cli@latest
shopify auth login
shopify theme list
```

Preview the local theme without publishing it:

```powershell
shopify theme dev
```

## GitHub and Shopify mapping

Connect the `stage` branch to an unpublished Shopify theme and the `main` branch to the published Shopify theme. Preview `stage` from **Online Store > Themes > Preview** while customers continue seeing `main`.

Release through a pull request:

```powershell
git switch main
git pull
git merge stage
git push origin main
```

Do not publish the staging theme directly if `main` is intended to remain the single source of truth for the live storefront.
