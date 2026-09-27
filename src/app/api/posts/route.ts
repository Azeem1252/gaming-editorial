import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import { revalidatePath } from "next/cache";
import { renderMarkdown } from "@/lib/markdown";

export interface ArticlePayload {
  title: string;
  slug: string;
  content: string;
  html?: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  hero_image_url?: string;
  tags?: string[];
  author?: string;
}

export async function GET() {
  return NextResponse.json(
    {
      status: "ready",
      version: "2.1.0",
      endpoint: "/api/posts",
      method: "POST",
      storage_engines: {
        upstash_redis: Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
        github_api: Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO),
        local_disk: true
      },
      description: "Content Pipeline Agent serverless article publishing endpoint",
    },
    { status: 200 }
  );
}

// Storage Engine 1: Upstash Redis REST (Instant 0s serverless publishing)
async function saveToUpstash(slug: string, article: any): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/+$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false;

  try {
    const setRes = await fetch(`${url}/set/post:${slug}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(article)
    });
    await fetch(`${url}/sadd/posts:index/${slug}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    return setRes.ok;
  } catch (err) {
    console.error("[Storage] Upstash Redis write error:", err);
    return false;
  }
}

// Storage Engine 2: GitHub API Direct Cloud Commit (No local git push required)
async function saveToGitHub(slug: string, article: any): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  const repo = (process.env.GITHUB_REPO || "Azeem1252/gaming-editorial")
    .replace(/^https?:\/\/github\.com\//, "")
    .replace(/\/+$/, "");
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token || !repo) return false;

  try {
    const filePath = `content/posts/${slug}.json`;
    const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

    let sha: string | undefined = undefined;
    const checkRes = await fetch(`${apiUrl}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "ContentPipelineAgent/2.0"
      }
    });
    if (checkRes.ok) {
      const existing = await checkRes.json();
      sha = existing.sha;
    }

    const commitBody = {
      message: `Publish article: ${article.title}`,
      content: Buffer.from(JSON.stringify(article, null, 2), "utf-8").toString("base64"),
      branch,
      ...(sha ? { sha } : {})
    };

    const commitRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "ContentPipelineAgent/2.0"
      },
      body: JSON.stringify(commitBody)
    });

    return commitRes.ok;
  } catch (err) {
    console.error("[Storage] GitHub API commit error:", err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Security Check
    const authHeader =
      request.headers.get("authorization") || request.headers.get("Authorization");
    const expectedToken = process.env.AGENT_SECRET_TOKEN;

    if (!expectedToken || !authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify Bearer token
    const parts = authHeader.trim().split(/\s+/);
    if (
      parts.length !== 2 ||
      parts[0].toLowerCase() !== "bearer" ||
      parts[1] !== expectedToken
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse & Validate Payload
    let body: ArticlePayload;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!body || !body.title || !body.slug) {
      return NextResponse.json(
        { error: "Missing required fields: title and slug are required" },
        { status: 400 }
      );
    }

    // Normalize slug
    const cleanSlug = body.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const rawContent = body.content || "";
    const renderedHtml = body.html || renderMarkdown(rawContent, body.title);

    const article = {
      title: body.title,
      slug: cleanSlug,
      content: rawContent,
      html: renderedHtml,
      excerpt: body.excerpt || "",
      meta_title: body.meta_title || body.title,
      meta_description: body.meta_description || body.excerpt || "",
      hero_image_url: body.hero_image_url || "",
      tags: Array.isArray(body.tags) ? body.tags : [],
      author: body.author || "Editorial Desk",
      publishedAt: new Date().toISOString(),
    };

    const storedEngines: string[] = [];

    // Storage 1: Upstash Redis REST (Instant 0s publishing)
    const upstashSaved = await saveToUpstash(cleanSlug, article);
    if (upstashSaved) storedEngines.push("upstash_redis");

    // Storage 2: GitHub API Direct Cloud Commit
    const githubSaved = await saveToGitHub(cleanSlug, article);
    if (githubSaved) storedEngines.push("github_api");

    // Storage 3: Local Disk / Serverless temp
    const frontmatter = [
      "---",
      `title: ${JSON.stringify(article.title)}`,
      `slug: ${JSON.stringify(article.slug)}`,
      `excerpt: ${JSON.stringify(article.excerpt)}`,
      `meta_title: ${JSON.stringify(article.meta_title)}`,
      `meta_description: ${JSON.stringify(article.meta_description)}`,
      `hero_image_url: ${JSON.stringify(article.hero_image_url)}`,
      `tags: ${JSON.stringify(article.tags)}`,
      `author: ${JSON.stringify(article.author)}`,
      `publishedAt: ${JSON.stringify(article.publishedAt)}`,
      "---",
      "",
      article.content,
    ].join("\n");

    const targetDirs = [
      path.join(process.cwd(), "content", "posts"),
      path.join(os.tmpdir(), "posts"),
    ];

    for (const dir of targetDirs) {
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(path.join(dir, `${cleanSlug}.mdx`), frontmatter, "utf-8");
        fs.writeFileSync(
          path.join(dir, `${cleanSlug}.json`),
          JSON.stringify(article, null, 2),
          "utf-8"
        );
        storedEngines.push(`disk:${path.basename(dir)}`);
        break;
      } catch (writeErr: any) {
        // Fallback gracefully on read-only serverless filesystems
      }
    }

    if (storedEngines.length === 0) {
      throw new Error("Unable to write article to any persistent storage or temporary storage");
    }

    // Revalidate paths in Next.js cache
    try {
      revalidatePath(`/posts/${cleanSlug}`);
      revalidatePath("/posts");
      revalidatePath("/");
    } catch {
      // Ignore if revalidation is not available in current execution context
    }

    // 4. Return standard response
    return NextResponse.json(
      {
        status: "success",
        slug: cleanSlug,
        url: `/posts/${cleanSlug}`,
        engines: storedEngines,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing post publication:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
