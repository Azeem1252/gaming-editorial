import { marked } from "marked";

/**
 * Strips leading redundant # Heading if it matches the post title or is at the top of the body
 * (since the post template already renders the title as <h1> in the hero header).
 */
export function stripDuplicateTitle(content: string, postTitle?: string): string {
  if (!content) return "";
  let cleaned = content.trim();

  if (cleaned.startsWith("# ")) {
    const firstLineEnd = cleaned.indexOf("\n");
    const firstLine = (firstLineEnd !== -1 ? cleaned.slice(0, firstLineEnd) : cleaned).trim();
    const headingText = firstLine.replace(/^#+\s*/, "").trim();

    // If it matches the post title or is a single top-level title at the very beginning
    if (
      !postTitle ||
      headingText.toLowerCase() === postTitle.toLowerCase() ||
      headingText.length > 0
    ) {
      cleaned = firstLineEnd !== -1 ? cleaned.slice(firstLineEnd + 1).trim() : "";
    }
  }

  return cleaned;
}

/**
 * Strips leading <h1> tag from pre-rendered HTML if present to prevent
 * duplicate title rendering on pages with dedicated hero titles.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  let clean = html.trim();
  return clean.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "").trim();
}

/**
 * Converts markdown text into semantic, accessible HTML for editorial reading.
 */
export function renderMarkdown(content: string, postTitle?: string): string {
  if (!content) return "";

  const cleaned = stripDuplicateTitle(content, postTitle);

  try {
    const parsed = marked.parse(cleaned, {
      gfm: true,
      breaks: false,
    });
    return sanitizeHtml(parsed as string);
  } catch (err) {
    console.error("Markdown parse error:", err);
    return `<p>${cleaned.replace(/\n\n+/g, "</p><p>")}</p>`;
  }
}
