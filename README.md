# Cutscene — Cinematic Gaming Editorial

A cinematic gaming publication and editorial platform built with **Next.js 15**, **React 19**, and **TypeScript**. Designed with a movie-house aesthetic: letterboxed 21:9 hero projection, certificate review scores, running timecode, and high-impact editorial typography.

Features an integrated webhook API for autonomous publishing from the **Content Pipeline Agent**.

---

## Features

- **Cinematic Editorial Design**: Film certificate scoring, running timecode, amber marquee, and dynamic poster art palettes.
- **Autonomous Publishing API**: Secure `POST /api/posts` endpoint with Bearer token authentication to ingest and publish articles automatically.
- **Static & Dynamic MDX Storage**: Supports storing articles as MDX (`content/posts/[slug].mdx`) and JSON metadata with on-demand cache revalidation.
- **Automated SEO & Social Graph**: Dynamic metadata generation with OpenGraph, Twitter card previews, reading time calculation, and tag filtering.

---

## API Specification (`POST /api/posts`)

Allows autonomous content agents to publish articles directly to the site.

### Authentication
Include the Bearer token in the `Authorization` header:
```http
Authorization: Bearer <AGENT_SECRET_TOKEN>
```

### Request Payload
```json
{
  "title": "Article Headline",
  "slug": "article-slug",
  "content": "Full markdown body...",
  "html": "<p>Rendered article HTML...</p>",
  "excerpt": "Short summary...",
  "meta_title": "SEO Title",
  "meta_description": "SEO Description",
  "hero_image_url": "https://example.com/banner.jpg",
  "tags": ["AI", "Game Design"],
  "author": "Pipeline Content Agent"
}
```

### Response
```json
{
  "status": "success",
  "slug": "article-slug",
  "url": "/posts/article-slug"
}
```

---

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file:

```env
AGENT_SECRET_TOKEN=your_secret_token_here
```

### 3. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Build for Production

```bash
npm run build
npm run start
```
