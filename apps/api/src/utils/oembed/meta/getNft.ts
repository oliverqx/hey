import type { Nft } from '@hey/types/misc';
import type { Document } from 'linkedom';

// https://reflect.site/g/yoginth/nft-extended-open-graph-spec/780502f3c8a3404bb2d7c39ec091602e
const getNft = (document: Document, url: string): Nft | null => {
  const collectionName =
    document.querySelector('meta[name="eth:nft:collection"]') ||
    document.querySelector('meta[property="eth:nft:collection"]');
  const contractAddress =
    document.querySelector('meta[name="eth:nft:contract_address"]') ||
    document.querySelector('meta[property="eth:nft:contract_address"]');
  const creatorAddress =
    document.querySelector('meta[name="eth:nft:creator_address"]') ||
    document.querySelector('meta[property="eth:nft:creator_address"]');
  const chain =
    document.querySelector('meta[name="eth:nft:chain"]') ||
    document.querySelector('meta[property="eth:nft:chain"]');
  const mediaUrl =
    document.querySelector('meta[name="eth:nft:media_url"]') ||
    document.querySelector('meta[property="eth:nft:media_url"]') ||
    document.querySelector('meta[name="og:image"]') ||
    document.querySelector('meta[property="og:image"]');
  const mintCount =
    document.querySelector('meta[name="eth:nft:mint_count"]') ||
    document.querySelector('meta[property="eth:nft:mint_count"]');
  const mintStatus =
    document.querySelector('meta[name="eth:nft:mint_status"]') ||
    document.querySelector('meta[property="eth:nft:mint_status"]');
  const mintUrl =
    document.querySelector('meta[name="eth:nft:mint_url"]') ||
    document.querySelector('meta[property="eth:nft:mint_url"]');
  const schema =
    document.querySelector('meta[name="eth:nft:schema"]') ||
    document.querySelector('meta[property="eth:nft:schema"]');

  const processedCollectionName =
    collectionName?.getAttribute('content') || null;
  const processedContractAddress =
    contractAddress?.getAttribute('content') || null;
  const processedCreatorAddress =
    creatorAddress?.getAttribute('content') || null;
  const processedChain = chain?.getAttribute('content') || null;
  const processedMediaUrl = mediaUrl?.getAttribute('content') || null;
  const processedMintCount = mintCount?.getAttribute('content')
    ? Number(mintCount?.getAttribute('content'))
    : null;
  const processedMintStatus = mintStatus?.getAttribute('content') || null;
  const processedMintUrl = mintUrl?.getAttribute('content') || null;
  const processedSchema = schema?.getAttribute('content') || null;

  if (
    !processedCollectionName &&
    !processedContractAddress &&
    !processedCreatorAddress &&
    !processedSchema
  ) {
    return null;
  }

  return {
    chain: processedChain,
    collectionName: processedCollectionName,
    contractAddress: processedContractAddress,
    creatorAddress: processedCreatorAddress,
    mediaUrl: processedMediaUrl,
    mintCount: processedMintCount,
    mintStatus: processedMintStatus,
    mintUrl: processedMintUrl,
    schema: processedSchema,
    sourceUrl: url
  };
};

export default getNft;
