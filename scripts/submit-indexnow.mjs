const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITE_URL = 'https://azgs.nl';
const KEY = '37ff27111be849ff8d541121dd09c289';
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

function extractUrls(sitemap) {
  return [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => match[1].trim())
    .filter((url) => url.startsWith(SITE_URL));
}

async function main() {
  const sitemapResponse = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!sitemapResponse.ok) {
    throw new Error(`Could not fetch sitemap: ${sitemapResponse.status}`);
  }

  const sitemap = await sitemapResponse.text();
  const urls = extractUrls(sitemap);

  if (urls.length === 0) {
    throw new Error('No URLs found in sitemap.');
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'azgs.nl',
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });

  const body = await response.text();
  console.log(`Submitted ${urls.length} URLs to IndexNow.`);
  console.log(`Response: ${response.status} ${response.statusText}`);
  if (body) {
    console.log(body);
  }

  if (![200, 202].includes(response.status)) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
