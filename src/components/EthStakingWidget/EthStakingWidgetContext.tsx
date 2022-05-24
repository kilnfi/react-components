import { Contract } from "ethers";
import React, { createContext, useState } from "react";
import { Config } from "./EthStakingWidget";
import { JsonRpcProvider } from "@ethersproject/providers";

type ContextValues = {
  config: Config;
  provider: JsonRpcProvider | undefined;
  account: string | undefined;
  stakeAmount: number;
  contract: Contract | undefined;
  balance: string | undefined;
  stakingState: 'initial' | 'generating_keys' | 'pending_tx_signature' | 'mining_deposit_tx' | 'stake_deposited';
  isAddressConfirmed: boolean;
}

type EthStakingWidgetContext = {
  context: ContextValues;
  setContext: (context: ContextValues) => void;
};

const DEFAULT_CONTEXT_VALUES: ContextValues = {
  config: {
    apiUrl: '',
    apiKey: '',
    accountId: '',
    network: 'goerli',
  },
  provider: undefined,
  stakeAmount: 32,
  contract: undefined,
  account: undefined,
  balance: undefined,
  stakingState: 'initial',
  isAddressConfirmed: false,
};

export const defaultEthStakingWidgetContext: EthStakingWidgetContext = {
  context: DEFAULT_CONTEXT_VALUES,
  setContext: () => {},
};

export const EthStakingWidgetContext = createContext(defaultEthStakingWidgetContext);

type ContextProps = {
  children: any,
}

export const EthStakingWidgetContextProvider = ({ children }: ContextProps) => {
  const [context, setContext] = useState<ContextValues>(DEFAULT_CONTEXT_VALUES);

  return (
    <EthStakingWidgetContext.Provider value={{ context, setContext }}>
      {children}
    </EthStakingWidgetContext.Provider>
  );
};