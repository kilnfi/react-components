import useSWR from 'swr';
import { fetcher } from "../api/api";

export type EthereumStats = {
  networkApy: number,
  supplyStakedPercent: number,
  isLoading: boolean,
  isError: boolean,
};

const useEthStats = (apiUrl: string, apiKey: string): EthereumStats => {
  const {
    data: apiData,
    error: apiError,
  } = useSWR(apiUrl !== '' ? '/v0/eth/network-stats' : null, (url) => fetcher(url, {
    apiUrl,
    apiKey,
  }));

  const supplyStakedPercent = apiData?.data?.supply_staked_percent ?? 0;
  const networkApy = apiData?.data?.apy ?? 0;

  return {
    networkApy,
    supplyStakedPercent,
    isLoading: !apiError && !apiData,
    isError: Boolean(apiError),
  };
};

export default useEthStats;