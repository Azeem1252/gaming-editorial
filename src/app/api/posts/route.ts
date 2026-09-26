import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import { revalidatePath } from "next/cache";

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
      version: "1.0.1",
      endpoint: "/api/posts",
      method: "POST",
      description: "Content Pipeline Agent article publishing endpoint",
    },
    { status: 200 }
  );
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

    const article = {
      title: body.title,
      slug: cleanSlug,
      content: body.content || "",
      html: body.html || "",
      excerpt: body.excerpt || "",
      meta_title: body.meta_title || body.title,
      meta_description: body.meta_description || body.excerpt || "",
      hero_image_url: body.hero_image_url || "",
      tags: Array.isArray(body.tags) ? body.tags : [],
      author: body.author || "Editorial Desk",
      publishedAt: new Date().toISOString(),
    };

    // 3. Storage: Save or upsert to content/posts/[slug].mdx
    // Format frontmatter for MDX
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

    let saved = false;
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
        saved = true;
        break;
      } catch (writeErr: any) {
        // Fallback to next directory if current one is read-only (e.g. Vercel serverless)
        console.warn(`Write to ${dir} failed, attempting fallback:`, writeErr?.message);
      }
    }

    if (!saved) {
      throw new Error("Unable to write article to disk or temporary storage");
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
