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

## Four-part workflow

The workflow combines four roles:

- **You**: describe the change, review the result, and approve releases.
- **Shopify MCP server**: provide the assistant with authenticated Shopify context through Shopify's supported AI or CLI connector, for inspecting the store and carrying out explicitly approved Shopify actions.
- **GitHub**: store the theme source, branches, pull requests, and review history.
- **Shopify CLI**: authenticate locally, preview theme changes, pull or push theme files, and validate the theme from the command line.

Use this handoff for normal theme work:

```text
You
	-> assistant + Shopify MCP server: inspect Shopify context or perform an approved store action
	-> local theme + Shopify CLI: develop and preview
	-> GitHub stage: commit and review
	-> GitHub main: approve and merge
	-> Shopify main theme: live production version
```

### Recommended operating rules

1. Use the Shopify MCP server for store context and approved Shopify operations; keep source-code changes in the local theme repository.
2. Use Shopify CLI for local development, theme previews, and deliberate file transfers.
3. Commit development work to `stage` and preview the unpublished Shopify theme.
4. Merge reviewed work into `main` only after staging is accepted.
5. Treat publishing as a separate, explicit production action. MCP or Shopify CLI must not publish `stage` by accident.

MCP credentials and Shopify access are local environment configuration. Do not commit credentials, tokens, or MCP configuration containing secrets to GitHub.

### Connecting the AI tool

Use Shopify's official connection flow from the AI tool or the Shopify CLI connector documented in the [Shopify Help Center](https://help.shopify.com/en/manual/ai-powered-tools/connecting-ai-tools). Before authorizing, review the requested data access and whether write permissions are included. The connected tool is limited by both the approved app access and your Shopify user permissions.

Review every proposed store change before confirming it. Data shared with a third-party AI tool is handled under that provider's terms and privacy policy, and access can be revoked by uninstalling the app or connector.
