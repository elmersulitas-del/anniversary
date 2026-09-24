# For you, Adi — sixth anniversary

A romantic, mobile-friendly Vite + TypeScript website with a surprise opening, falling hearts, 15-photo gallery, full anniversary letter, and final gift teaser.

## Run on your computer

Install Node.js 22.12 or later (Node.js 24 LTS recommended), then open a terminal in this folder:

```
npm install
npm run dev
```

Open the local URL shown in the terminal. To verify and build:

```
npm run build
npm run preview
```

The build runs TypeScript checking before creating the `dist` folder.

## Publish on Vercel (GitHub method)

1. Extract this ZIP.
2. Create a GitHub repository, then upload the files INSIDE the `adi-anniversary` folder. Keep `index.html`, `package.json`, and `vercel.json` at the repository root. Include `src`, `public`, and `package-lock.json`. Do not upload `node_modules`.
3. Sign in at https://vercel.com and choose Add New → Project.
4. Connect GitHub, select this repository, and click Import.
5. Choose framework preset Vite. Build command: `npm run build`. Output directory: `dist`. No environment variables are required. If you uploaded an enclosing folder, set Root Directory to `adi-anniversary`.
6. Click Deploy. When it finishes, open the generated URL and test the opening button, photo gallery, and letter.
7. Send your partner the Vercel link.

Alternative: with the Vercel CLI installed, run `vercel` in this folder for a preview and `vercel --prod` when ready to publish.

Official guidance: https://vercel.com/docs/frameworks/frontend/vite and https://vercel.com/docs/git

## Personalize

- Letter: `src/letter.ts`.
- Photo order, captions, and descriptions: `src/main.ts`.
- Opening greeting and page headings: `index.html`.
- Colors, spacing, and animations: `src/style.css`.
- Images: `public/photos`. Image 15 is the original studio photograph and cover. Photos 01, 02, 03, 04, 06, 07, 10, 12, and 14 use completed AI enhancements; the remaining photos use your originals. All are encoded as high-quality WebP for the website. AI restoration can change fine details; inspect the images before publishing.

No exact anniversary date was supplied, so the site celebrates six years without inventing a date or countdown.

The opening screen is a surprise reveal, not a password. Anyone who has access to the deployed URL can view the photos and letter. `noindex` asks search engines not to index the site; it does not provide access control.

Animations respect the visitor's reduced-motion setting. The gallery supports keyboard arrows, Escape, touch swipes, and click/tap navigation. Photos are displayed in their original proportions. Fonts have local system fallbacks if Google Fonts is unavailable.

## Delivery status

Prepared and tested locally. This ZIP does not mean the site has already been deployed to your Vercel account.
