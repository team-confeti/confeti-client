/* eslint-env node */

const SITE_URL = process.env.SITE_URL ?? 'https://www.confeti.co.kr';
const BACKEND_API_BASE = (
  process.env.BACKEND_API_BASE ?? 'https://api.confeti.xyz'
).replace(/\/$/, '');

const STATIC_PATHS = ['/', '/search', '/timetable'];

const escapeXml = (input) =>
  String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const urlXml = (loc, lastmod, changefreq, priority) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;

const pathByType = (type, id) => {
  const t = String(type).toLowerCase();
  if (t === 'concert') return `/concert-detail/${id}`;
  if (t === 'festival') return `/festival-detail/${id}`;
  return `/performance/${id}`;
};

const sendEmpty = (res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=3600',
  );
  res.end(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
  );
};

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

    if (!r.ok) {
      console.error('GET /performances not ok:', r.status, r.statusText);
      return sendEmpty(res);
    }

    const json = await r.json().catch((e) => {
      console.error('JSON parse failed:', e);
      return null;
    });
    if (!json) return sendEmpty(res);

    const list = json?.data?.performances ?? [];
    const now = new Date().toISOString();

    const staticUrls = STATIC_PATHS.map((p) =>
      urlXml(`${SITE_URL}${p}`, now, 'weekly', '0.5'),
    ).join('');

    const dynamicUrls = list
      .filter((p) => p && p.typeId)
      .map(({ type, typeId }) => {
        const t = String(type).toLowerCase();
        const loc = `${SITE_URL}${pathByType(t, typeId)}`;
        return urlXml(loc, now, 'daily', t === 'festival' ? '0.8' : '0.7');
      })
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
  } catch (e) {
    console.error('sitemap fatal error:', e);
    return sendEmpty(res);
  }
}
