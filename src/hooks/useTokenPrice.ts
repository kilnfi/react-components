import useSWR from "swr";
import axios from "axios";

type Value = {
  [key: string]: number
};

type TokenPrice = {
  price: Value,
  isPriceLoading: boolean,
  isPriceError: boolean,
};

const fetcher = (url: string) => {
  return axios
    .get(`${url}`,)
    .then(res => res.data);
};

type Token = 'ethereum' | 'solana' | 'near' | 'tezos';

const useTokenPrice = (token: Token): TokenPrice => {
  const {
    data,
    error
  } = useSWR(`https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=USD,EUR,GBP`, fetcher);

  const defaultPrice = {
    usd: 0,
    eur: 0,
    gbp: 0,
  };

  return {
    price: data?.[token] ?? defaultPrice,
    isPriceLoading: !error && !data,
    isPriceError: Boolean(error),
  };
};

export default useTokenPrice;