import type { UnlonelyNfc } from '@hey/types/nft';

import { HEY_API_URL } from '@hey/data/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UseUnlonelyNfcProps {
  enabled?: boolean;
  id: string;
}

const useUnlonelyNfc = ({
  enabled,
  id
}: UseUnlonelyNfcProps): {
  data: UnlonelyNfc;
  error: unknown;
  loading: boolean;
} => {
  const getUnlonelyNfcDetails = async () => {
    const response = await axios.get(`${HEY_API_URL}/nfts/unlonely/nfc`, {
      params: { id }
    });

    return response.data?.nfc;
  };

  const { data, error, isLoading } = useQuery({
    enabled,
    queryFn: getUnlonelyNfcDetails,
    queryKey: ['getUnlonelyNfcDetails', id],
    refetchOnMount: false
  });

  return { data, error, loading: isLoading };
};

export default useUnlonelyNfc;
