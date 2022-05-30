import React, { useEffect, useState } from 'react';
import { JsonRpcProvider } from "@ethersproject/providers";
import { Config } from "../EthStakingWidget";
import { BigNumber, Contract, utils } from "ethers";
import { useEthStakingWidgetContext } from "../useEthStakingWidgetContext";

type Props = {
  config: Config;
  provider?: JsonRpcProvider;
  account?: string;
  className?: string;
  children?: any;
}

export const GOERLI_DEPOSIT_CONTRACT_ABI = '[{"inputs":[{"internalType":"address","name":"deposit_contract_address","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogDepositLeftover","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes","name":"pubkey","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"withdrawal","type":"bytes"}],"name":"LogDepositSent","type":"event"},{"inputs":[],"name":"kDepositAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"bytes[]","name":"pubkeys","type":"bytes[]"},{"internalType":"bytes[]","name":"withdrawal_credentials","type":"bytes[]"},{"internalType":"bytes[]","name":"signatures","type":"bytes[]"},{"internalType":"bytes32[]","name":"deposit_data_roots","type":"bytes32[]"}],"name":"batchDeposit","outputs":[],"stateMutability":"payable","type":"function","payable":true}]';
export const GOERLI_DEPOSIT_CONTRACT_ADDRESS = '0x5FaDfdb7eFffd3B4AA03f0F29d9200Cf5F191F31';

export const MAINNET_DEPOSIT_CONTRACT_ABI = '[{"inputs":[{"internalType":"address","name":"deposit_contract_address","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogDepositLeftover","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes","name":"pubkey","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"withdrawal","type":"bytes"}],"name":"LogDepositSent","type":"event"},{"inputs":[],"name":"kDepositAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"bytes[]","name":"pubkeys","type":"bytes[]"},{"internalType":"bytes[]","name":"withdrawal_credentials","type":"bytes[]"},{"internalType":"bytes[]","name":"signatures","type":"bytes[]"},{"internalType":"bytes32[]","name":"deposit_data_roots","type":"bytes32[]"}],"name":"batchDeposit","outputs":[],"stateMutability":"payable","type":"function","payable":true}]';
export const MAINNET_DEPOSIT_CONTRACT_ADDRESS = '0x9b8c989FF27e948F55B53Bb19B3cC1947852E394';

const Wrapper = ({ config, provider, account, className = '', children }: Props) => {
  const { context, setContext } = useEthStakingWidgetContext();
  const [isProviderLoaded, setIsProviderLoaded] = useState<boolean>(false);

  // Load context with provider and config
  useEffect(() => {
    if (!provider){
      setIsProviderLoaded(false);
      return;
    }

    if(!isProviderLoaded){
      setContext({
        ...context,
        config,
        provider: provider,
      });
      setIsProviderLoaded(true);
    }
  }, [provider, isProviderLoaded]);

  // Load account, contract and balance in context
  useEffect(() => {
    if (!provider) return;

    const contractABI = config.network === 'goerli' ? GOERLI_DEPOSIT_CONTRACT_ABI : MAINNET_DEPOSIT_CONTRACT_ABI;
    const depositInterface = new utils.Interface(contractABI);
    const signer = provider?.getSigner();
    const contractAddress = config.network === 'goerli' ? GOERLI_DEPOSIT_CONTRACT_ADDRESS : MAINNET_DEPOSIT_CONTRACT_ADDRESS;
    const contract = new Contract(contractAddress, depositInterface, signer);

    if (account) {
      provider.getBalance(account).then((b: BigNumber) => {
        const balance = utils.formatEther(b);
        setContext({
          ...context,
          provider,
          config,
          account,
          balance,
          contract,
        });
      });
    } else {
      setContext({
        ...context,
        provider,
        config,
        account: undefined,
        balance: undefined,
        contract: undefined,
      });
    }
  }, [account]);

  useEffect(() => {
    setContext({
      ...context,
      config,
    })
  }, [config.accountId, config.chainId]);

  return (
    <div
      className={`rc-font-sans rc-bg-gray-100 rc-border rc-border-gray-200 rc-rounded rc-px-3 rc-py-4.5 ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;