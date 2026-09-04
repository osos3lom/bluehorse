This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Free-Tier Deployment on GitHub Pages

This app is fully configured for automated deployment to **GitHub Pages** (Free Tier) via GitHub Actions.

### 1. Enable GitHub Pages in your Repository
1. On GitHub, go to your repository: **Settings** -> **Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**.

### 2. Automated Deployment
- Any commit pushed to the `main` branch will automatically trigger the deployment workflow (`.github/workflows/deploy.yml`).
- You can also manually trigger the deployment anytime by visiting the **Actions** tab -> **Deploy Blue Horse to GitHub Pages** -> **Run workflow**.

### 3. Custom Domain (Optional)
If you want to use a custom domain (e.g., `events.bluehorse.sa` or `bluehorse.com`):
1. In repository **Settings** -> **Pages**, enter your **Custom domain** and save.
2. The GitHub Actions workflow and Next.js config automatically detect the custom domain and switch from `/bluehorse` subpath to root path (`/`).

