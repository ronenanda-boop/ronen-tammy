# Ronen & Tammy Izhaki — Studio Website

This project is a bilingual (Hebrew default, English secondary) marketing site for the Ronen & Tammy Izhaki studio. It is built with **Next.js 14 App Router**, **TypeScript**, **TailwindCSS**, **next-intl** for localisation, and **Sanity CMS** for structured content. It also integrates **Resend** for transactional email and a Cal.com / Calendly booking embed.

## Features

- App Router architecture with locale route groups `/(he)` and `/(en)`
- next-intl translations with Hebrew default locale and English secondary
- Sanity CMS for site settings, works, studio content, posts, and booking requests
- Booking MVP with external scheduling embed and internal request form stored in Sanity + email notifications
- React Hook Form + Zod validation for contact and booking forms
- Video support via `react-player` and a hero video component with graceful fallbacks
- Tailwind-based minimalist design system and responsive layout

## Getting Started

### Prerequisites

- Node.js **20.x** or higher
- pnpm / npm / yarn (examples below use `npm`)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file (use `.env.example` as a template):

```ini
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_sanity_read_token
SANITY_API_WRITE_TOKEN=your_sanity_write_token
RESEND_API_KEY=your_resend_api_key
BOOKING_PROVIDER=cal
BOOKING_URL=https://cal.com/your-handle/your-event
```

- `SANITY_PROJECT_ID` and `SANITY_DATASET` come from your Sanity project settings.
- `SANITY_API_READ_TOKEN` requires a token with read permissions for the dataset.
- `SANITY_API_WRITE_TOKEN` should have write permissions to create `booking` documents.
- `RESEND_API_KEY` is used to send booking/contact notifications. If omitted, the API routes will skip email sending but still work.
- `BOOKING_PROVIDER` should be either `cal` or `calendly` and influences copy/iframe title.
- `BOOKING_URL` must be the public embed URL from Cal.com or Calendly.

### Sanity Studio

The Studio is configured in `/sanity`. To run it locally:

```bash
npm run sanity
```

This uses the schema files in `sanity/schemaTypes/*`. Deploy the Studio via Sanity CLI or host it with the main site depending on your preferred setup.

### Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`. Locale detection will redirect you to the Hebrew experience by default. English routes are available under `/en/...`.

### Linting & Production Build

```bash
npm run lint
npm run build
npm start
```

## Content Model Overview

- **siteSettings**: global metadata, hero video, contact info, social links (with optional English fields).
- **work**: portfolio entries with cover image, gallery, video URL, credits, and featured flag.
- **post**: blog entries (Hebrew-only for now).
- **studio**: vision content (he/en), photo gallery, booking provider + URL, address, email.
- **booking**: submitted booking requests captured from the internal form.

Update the content via Sanity to replace the placeholder/fallback data that renders on first run.

## Booking Embed & Internal Requests

1. Set `BOOKING_PROVIDER` (`cal` or `calendly`) and `BOOKING_URL` in the environment.
2. Sanity’s `studio` document should mirror these values for editors.
3. The Studio page renders an iframe embed followed by an internal booking form.
4. Successful submissions are written to the `booking` document type in Sanity and optionally emailed via Resend.

## Video Support

- The hero section uses the `HeroVideo` component, which accepts either a video URL (YouTube, Vimeo, or mp4) or falls back to a poster image from Sanity.
- Individual works can also define a `videoUrl` which renders via the reusable `VideoPlayer` component (lazy-loaded `react-player`).
- To embed a new video, simply paste the source URL into the relevant Sanity field.

## Deployment

Deploy the Next.js app to Vercel (recommended):

1. Push this repository to your Git provider.
2. Create a new project in Vercel and import the repo.
3. Configure the environment variables listed above in the Vercel dashboard.
4. Deploy. Vercel will run `npm install`, `npm run build`, and `npm start` automatically.

Remember to deploy / host the Sanity Studio (either via Sanity’s managed hosting or another deployment target) and to update the environment tokens for production.

## Useful Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js in development mode |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the Next.js production server |
| `npm run lint` | Run ESLint checks |
| `npm run sanity` | Launch Sanity Studio locally |

## Project Structure

```
app/                # Next.js App Router with locale route groups
components/         # Reusable UI components
lib/                # i18n helpers, Sanity client, GROQ queries, rate limiter
messages/           # Translation dictionaries
public/             # Static assets including the custom SVG logo
sanity/             # Sanity Studio configuration and schema definitions
types/              # Shared TypeScript content interfaces
```

## Support & Contributions

This MVP is designed for production readiness with fallbacks when the CMS is empty. Feel free to extend the design system, add blog/works translations, or integrate further automations as needed.
