import type { OG } from '@hey/types/misc';

import getFavicon from '@hey/lib/getFavicon';
import { parseHTML } from 'linkedom';

import getProxyUrl from './getProxyUrl';
import generateIframe from './meta/generateIframe';
import getDescription from './meta/getDescription';
import getEmbedUrl from './meta/getEmbedUrl';
import getImage from './meta/getImage';
import getIsLarge from './meta/getIsLarge';
import getNft from './meta/getNft';
import getSite from './meta/getSite';
import getTitle from './meta/getTitle';

const getMetadata = async (url: string): Promise<any> => {
  const { html } = await fetch(url, {
    headers: { 'User-Agent': 'Twitterbot' }
  }).then(async (res) => ({
    html: await res.text()
  }));

  const { document } = parseHTML(html);
  const isLarge = getIsLarge(document) as boolean;
  const image = getImage(document) as string;
  const proxiedUrl = getProxyUrl(image, isLarge);
  const metadata: OG = {
    description: getDescription(document),
    favicon: getFavicon(url),
    html: generateIframe(getEmbedUrl(document), url),
    image: proxiedUrl,
    isLarge,
    lastIndexedAt: new Date().toISOString(),
    nft: getNft(document, url),
    site: getSite(document),
    title: getTitle(document),
    url
  };

  return metadata;
};

export default getMetadata;
