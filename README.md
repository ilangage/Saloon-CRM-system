# Fur Naills Beauty Salon Booking Website

Production-ready single-page booking website built with Next.js App Router, TypeScript and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

Or push to GitHub and import the repository in Vercel.

## Google Sheets booking setup

1. Create a Google Sheet.
2. Open `Extensions` > `Apps Script`.
3. Paste the code from:

```txt
google-apps-script-bookings.js
```

4. Deploy as a Web App with access set to anyone.
5. Copy the Web App URL into `.env.local`:

```bash
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

The sheet will store: `CreatedAt`, `Date`, `Time`, `Service`, `Name`, `Phone`, `Status`.

## Edit Weekly Special

Open:

```txt
src/lib/config.ts
```

Change:

```ts
export const WEEKLY_SPECIAL = {
  title: "This Week’s Special",
  featuredService: "Nail Art",
  discount: "20% OFF",
  validityText: "Valid Monday–Saturday"
};
```

## Replace placeholder images

Replace the files inside `/public` with real salon images using the same filenames:

```txt
hero-salon.svg
service-nails.svg
gallery-1.svg
gallery-2.svg
gallery-3.svg
gallery-4.svg
```

You can also switch them to `.jpg` or `.png`, but update the image paths in `src/lib/config.ts` and `components/Hero.tsx`.

## Booking rules

- Bookings are available Monday-Saturday, 9:00 AM-6:00 PM.
- Nail Art and Facial use one hourly slot.
- Rebonding uses three hourly slots.
- Only one appointment can use a time range because one person is working.
