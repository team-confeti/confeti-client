/* eslint-env node */

const SITE_URL = process.env.SITE_URL ?? 'https://www.confeti.co.kr';
const BACKEND_API_BASE = (
  process.env.BACKEND_API_BASE ?? 'https://api.confeti.xyz'
).replace(/\/$/, '');

const pathByType = (type, id) =>
  type === 'CONCERT'
    ? `/concert-detail/${id}`
    : type === 'FESTIVAL'
      ? `/festival-detail/${id}`
      : `/performance/${id}`;

function escapeXml(input) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlXml(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
}

export default async function handler(req, res) {
  if (req.method === 'HEAD') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400',
    );
    res.end();
    return;
  }
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET, HEAD');
    res.end();
    return;
  }

  try {
    const r = await fetch(`${BACKEND_API_BASE}/performances`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!r.ok) return sendEmpty(res);

    const json = await r.json();
    const list = json?.data?.performances ?? [];
    const now = new Date().toISOString();

    const staticUrls = ['', '/search', '/about']
      .map((p) => urlXml(`${SITE_URL}${p}`, now, 'weekly', '0.5'))
      .join('');

    const dynamicUrls = list
      .map(({ type, typeId }) =>
        urlXml(
          `${SITE_URL}${pathByType(type, typeId)}`,
          now,
          'daily',
          type === 'FESTIVAL' ? '0.8' : '0.7',
        ),
      )
      .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}${dynamicUrls}</urlset>`;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400',
    );
    res.end(xml);
  } catch {
    return sendEmpty(res);
  }
}

function sendEmpty(res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=3600',
  );
  res.end(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
  );
}
