import useSWR from 'swr';
import { fetcher } from "../api/api";

export type EthereumStats = {
  networkApy: number,
  isLoading: boolean,
  isError: boolean,
};

const useEthStats = (apiUrl: string, apiKey: string): EthereumStats => {
  const {
    data: apiData,
    error: apiError,
  } = useSWR(apiUrl !== '' ? '/v1/eth/network-stats' : null, (url) => fetcher(url, {
    apiUrl,
    apiKey,
  }));

  const networkApy = apiData?.data?.apy ?? 0;

  return {
    networkApy,
    isLoading: !apiError && !apiData,
    isError: Boolean(apiError),
  };
};

export default useEthStats;