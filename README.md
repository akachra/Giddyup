# Giddyup — React + Vite (GitHub Pages)

This repo is set up to deploy automatically to **GitHub Pages** using **GitHub Actions**.

## Local dev (optional)
```bash
npm install
npm run dev
```

## Deploy (automatic)
Just push to `main`. The included workflow builds with Vite and deploys `dist/` to Pages.

### GitHub Pages settings
- Repo → Settings → Pages → **Build and deployment**: `Source = GitHub Actions`

### Important
If your repo name is not **Giddyup**, update `base` in `vite.config.js` to `/<your-repo-name>/`.

## App structure
- React + Vite + HashRouter (no 404 issues on Pages)
- Tabs: Dashboard, Activity, Sleep, Recovery, Import, Profile
- Local storage data seed; export planned
- Import CSV/JSON placeholder (data saved locally for now)

## Next steps
- Metabolic age cards (two methods)
- Health Connect parsing & mapping
- Insight tiles and weekly summaries
