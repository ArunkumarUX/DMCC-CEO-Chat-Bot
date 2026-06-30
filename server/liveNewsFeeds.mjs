/**
 * Real-time news feed fetcher — public RSS feeds, no API key required.
 * Used for priority signal cards with verifiable source links.
 */

/** @typedef {{ title: string; url: string; date: string; source: string; sourceUrl: string; excerpt: string; feedId?: string; tags?: string[] }} NewsItem */

const FEEDS = [
  {
    id: 'google-gcc-finance',
    label: 'Google News — GCC Finance',
    siteUrl: 'https://news.google.com',
    rssUrl:
      'https://news.google.com/rss/search?q=%22Apparel+Group%22+OR+%22GCC+retail%22+OR+%22Dubai+retail%22+OR+%226thStreet%22+OR+%22Club+Apparel%22+OR+Namshi+OR+Noon+OR+%22Tim+Hortons%22&hl=en-AE&gl=AE&ceid=AE:en',
    tags: ['market', 'competitor', 'investment', 'regulatory', 'followup'],
  },
  {
    id: 'bbc-business',
    label: 'BBC Business',
    siteUrl: 'https://www.bbc.com/news/business',
    rssUrl: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    tags: ['market', 'competitor', 'investment', 'regulatory'],
  },
  {
    id: 'cnbc-top',
    label: 'CNBC Top News',
    siteUrl: 'https://www.cnbc.com',
    rssUrl: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114',
    tags: ['market', 'competitor', 'investment'],
  },
  {
    id: 'aljazeera-all',
    label: 'Al Jazeera',
    siteUrl: 'https://www.aljazeera.com',
    rssUrl: 'https://www.aljazeera.com/xml/rss/all.xml',
    tags: ['market', 'competitor', 'regulatory', 'followup'],
  },
  {
    id: 'reuters-business',
    label: 'Reuters Business',
    siteUrl: 'https://www.reuters.com/business',
    rssUrl: 'https://feeds.reuters.com/reuters/businessNews',
    tags: ['market', 'competitor', 'investment'],
  },
  {
    id: 'reuters-finance',
    label: 'Reuters Finance',
    siteUrl: 'https://www.reuters.com/finance',
    rssUrl: 'https://feeds.reuters.com/reuters/INbusinessNews',
    tags: ['market', 'regulatory'],
  },
  {
    id: 'arabian-business',
    label: 'Arabian Business',
    siteUrl: 'https://www.arabianbusiness.com',
    rssUrl: 'https://www.arabianbusiness.com/rss',
    tags: ['market', 'competitor', 'investment', 'regulatory'],
  },
  {
    id: 'gulf-news',
    label: 'Gulf News Business',
    siteUrl: 'https://gulfnews.com/business',
    rssUrl: 'https://gulfnews.com/rss/business.rss',
    tags: ['market', 'regulatory', 'followup'],
  },
  {
    id: 'khaleej-times',
    label: 'Khaleej Times Business',
    siteUrl: 'https://www.khaleejtimes.com/business',
    rssUrl: 'https://www.khaleejtimes.com/business/feed',
    tags: ['market', 'investment', 'followup'],
  },
  {
    id: 'zawya',
    label: 'ZAWYA — GCC Markets',
    siteUrl: 'https://www.zawya.com/en/markets',
    rssUrl: 'https://www.zawya.com/en/rss/feed/markets',
    tags: ['market', 'investment', 'competitor'],
  },
];

const FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
  'Accept-Language': 'en-US,en;q=0.9',
};

function parseRssItems(xml, siteUrl) {
  const items = [];
  const itemRe = /<(?:item|entry)>([\s\S]*?)<\/(?:item|entry)>/gi;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1];
    const title = extractTag(block, 'title');
    const link = extractLink(block, siteUrl);
    const date = extractDate(block);
    const excerpt = extractExcerpt(block);
    if (title && link) {
      items.push({ title: cleanText(title), url: link, date, excerpt: cleanText(excerpt) });
    }
  }
  return items.slice(0, 10);
}

function extractTag(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`, 'i');
  const m = re.exec(xml);
  return m ? m[1].trim() : '';
}

function extractLink(block, siteUrl) {
  const linkTag = extractTag(block, 'link');
  if (linkTag?.startsWith('http')) return linkTag;
  const hrefM = /<link[^>]+href=["']([^"']+)["']/i.exec(block);
  if (hrefM?.[1]?.startsWith('http')) return hrefM[1];
  const guid = extractTag(block, 'guid');
  if (guid?.startsWith('http')) return guid;
  return siteUrl;
}

function extractDate(block) {
  const raw =
    extractTag(block, 'pubDate') ||
    extractTag(block, 'published') ||
    extractTag(block, 'updated') ||
    extractTag(block, 'dc:date') ||
    '';
  if (!raw) return new Date().toISOString().slice(0, 10);
  try {
    return new Date(raw).toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function extractExcerpt(block) {
  const raw =
    extractTag(block, 'description') ||
    extractTag(block, 'summary') ||
    extractTag(block, 'content');
  const cleaned = cleanText(raw);
  return cleaned.length > 220 ? `${cleaned.slice(0, 217).trim()}…` : cleaned;
}

function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1')
    .replace(/<a[^>]*>/gi, ' ')
    .replace(/<\/a>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/<[^>]*$/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchFeed(feed, timeoutMs = 10_000) {
  try {
    const res = await fetch(feed.rssUrl, {
      signal: AbortSignal.timeout(timeoutMs),
      headers: FETCH_HEADERS,
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    if (!xml.includes('<') || xml.length < 200) throw new Error('empty feed');
    const items = parseRssItems(xml, feed.siteUrl);
    if (!items.length) throw new Error('no items parsed');
    return items.map((item) => ({
      ...item,
      source: feed.label,
      sourceUrl: feed.siteUrl,
      feedId: feed.id,
      tags: feed.tags,
    }));
  } catch (err) {
    console.warn(`[liveNewsFeeds] ${feed.id} skipped: ${err?.message}`);
    return [];
  }
}

export async function fetchAllNewsFeeds() {
  const results = await Promise.all(FEEDS.map((f) => fetchFeed(f)));
  const flat = results.flat();
  const seen = new Set();
  const deduped = flat.filter((item) => {
    const key = item.title.toLowerCase().slice(0, 80);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  deduped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return deduped;
}

/**
 * Apparel Group CEO relevance — article must match retail/portfolio keywords
 * and must NOT match property/real-estate exclusions.
 */
const CEO_RELEVANCE_KEYWORDS = [
  'apparel group', 'r&b', '6thstreet', '6th street', 'club apparel', 'nysaa',
  'neeraj teckchandani', 'retail', 'fashion', 'mall', 'footfall', 'consumer',
  'store', 'omnichannel', 'e-commerce', 'ecommerce', 'loyalty', 'namshi', 'noon',
  'centrepoint', 'landmark', 'tim hortons', 'cold stone', 'aldo', 'charles keith',
  'ksa', 'saudi retail', 'uae retail', 'gcc retail', 'arabian alesaar', 'heydude',
  'barbour', 'forever new', 'images retailme', 'vat', 'ded', 'mohre', 'fta', 'f&b',
  'franchise', 'brand launch', 'store opening', 'value retail', 'athleisure',
  'beauty retail', 'lifestyle', 'dubai retail',
];

const CEO_EXCLUDE_KEYWORDS = [
  'property market', 'real estate', 'townhouse', 'townhouses', 'apartment',
  'villa sales', 'off-plan', 'off plan', 'data center', 'data centre', 'ai infra',
  'masterplan', 'racecourse', 'drec', 'huna sculpture', 'arm holding', 'a.r.m.',
  'difc', 'fsra', 'rental index', 'ejari', 'rera', 'dld', 'damac', 'nakheel',
  'meraas', 'sobha', 'ellington', 'emaar', 'aldar', 'jebel ali racecourse',
  'sold for $', 'homes sold', 'units sold', 'coingecko', 'bitcoin', 'ethereum',
];

/**
 * Per-signal keyword classifiers — routes articles to the most relevant CEO card.
 */
const SIGNAL_KEYWORDS = {
  market: ['retail', 'fashion', 'mall', 'footfall', 'consumer', 'tourism', 'gcc retail', 'uae retail', 'ksa retail', 'lifestyle', 'spending'],
  competitor: ['namshi', 'noon', 'centrepoint', 'landmark', 'e-commerce', 'omnichannel', 'delivery', 'fast fashion', 'marketplace', 'competitor', 'rival'],
  investment: ['apparel group', 'store opening', 'expansion', 'ksa', 'saudi', 'franchise', 'heydude', 'barbour', 'forever new', 'arabian alesaar', 'new store', 'flagship'],
  regulatory: ['vat', 'ded', 'mohre', 'fta', 'retail license', 'labour', 'labor', 'visa', 'compliance', 'f&b', 'tim hortons', 'cold stone'],
  followup: ['images retailme', 'club apparel', 'loyalty', 'award', 'sustainability', 'brand', 'campaign', 'nysaa', 'ceo', 'apparel group'],
};

function itemText(item) {
  return (item.title + ' ' + (item.excerpt || '')).toLowerCase();
}

function isExcludedForCeo(item) {
  const text = itemText(item);
  return CEO_EXCLUDE_KEYWORDS.some((kw) => text.includes(kw));
}

function isCeoRelevant(item) {
  if (!item?.title) return false;
  if (isExcludedForCeo(item)) return false;
  const text = itemText(item);
  return CEO_RELEVANCE_KEYWORDS.some((kw) => text.includes(kw));
}

function signalScore(tag, item) {
  const text = (item.title + ' ' + (item.excerpt || '')).toLowerCase();
  const kws = SIGNAL_KEYWORDS[tag] ?? [];
  return kws.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
}

/**
 * Get news items for a given signal tag — Apparel Group CEO retail intelligence only.
 */
export function getNewsByTag(tag, allItems, limit = 3) {
  const tagged = allItems.filter((i) => i.tags?.includes(tag));
  const relevant = tagged.filter(isCeoRelevant);
  const scored = relevant
    .map((item) => ({ item, score: signalScore(tag, item) }))
    .sort((a, b) => b.score - a.score || new Date(b.item.date).getTime() - new Date(a.item.date).getTime());
  return scored.map((s) => s.item).slice(0, limit);
}

export function filterGccRelevant(items, limit = 5) {
  const scored = items
    .filter(isCeoRelevant)
    .map((item) => {
      const text = itemText(item);
      const score = CEO_RELEVANCE_KEYWORDS.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
      return { item, score };
    });
  scored.sort(
    (a, b) => b.score - a.score || new Date(b.item.date).getTime() - new Date(a.item.date).getTime(),
  );
  return scored.filter((s) => s.score > 0).map((s) => s.item).slice(0, limit);
}
