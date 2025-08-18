import type { IncomingMessage, ServerResponse } from 'http';

type PerfType = 'CONCERT' | 'FESTIVAL';

interface PerformancesResponse {
  status: number;
  message: string;
  data: {
    performances: Array<{ type: PerfType; typeId: number }>;
  };
}

const SITE_URL = process.env.SITE_URL ?? 'https://www.confeti.co.kr';
const BACKEND_API_BASE =
  process.env.BACKEND_API_BASE ?? 'https://api.confeti.xyz';

const pathByType = (type: PerfType, id: number) => {
  if (type === 'CONCERT') return `/concert-detail/${id}`;
  if (type === 'FESTIVAL') return `/festival-detail/${id}`;
  return `/performance/${id}`;
};

export default async function handler(
  _req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    const r = await fetch(
      `${BACKEND_API_BASE.replace(/\/$/, '')}/performances`,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    if (!r.ok)
      throw new Error(`GET /performances failed: ${r.status} ${r.statusText}`);

    const json = (await r.json()) as PerformancesResponse;
    const list = json?.data?.performances ?? [];
    const now = new Date().toISOString();

    const staticUrls = ['', '/search', '/about']
      .map(
        (p) => `
  <url>
    <loc>${escapeXml(`${SITE_URL}${p}`)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`,
      )
      .join('');

    const dynamicUrls = list
      .map(({ type, typeId }) => {
        const loc = `${SITE_URL}${pathByType(type, typeId)}`;
        return `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${type === 'FESTIVAL' ? '0.8' : '0.7'}</priority>
  </url>`;
      })
      .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${dynamicUrls}
</urlset>`.trim();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400',
    );
    res.end(xml);
  } catch {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
    res.end(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
    );
  }
}

function escapeXml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
