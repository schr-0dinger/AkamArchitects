import { absoluteUrl } from "../lib/urls";

export function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap-index.xml")}
`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
