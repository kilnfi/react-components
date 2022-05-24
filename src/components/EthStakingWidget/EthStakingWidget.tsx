import React from "react";
import { JsonRpcProvider, TransactionReceipt } from '@ethersproject/providers';
import EthRewardForecast from "./components/EthRewardForecast";
import { EthStakingWidgetContextProvider } from "./EthStakingWidgetContext";
import Header from "./components/Header";
import SelectAmount from "./components/SelectAmount";
import Status from "./components/Status";
import Wrapper from "./components/Wrapper";

export type Config = {
  apiUrl: string;
  apiKey: string;
  accountId: string;
  network: 'goerli' | 'mainnet';
  defaultAmount?: number;
  maximumAmount?: number;
  networkApy?: number;
  onStartStaking?: () => void;
  onPendingTxSignature?: (contractAddress: string, stakeAmount: number, account: string) => void;
  onUserRejectsDepositTx?: () => void;
  onMiningDepositTx?: () => void;
  onSuccess?: (receipt: TransactionReceipt, stakeAmount: number) => void;
  onError?: (err: string) => void;
  onReset?: () => void;
}

export type Props = {
  config: Config;
  provider?: JsonRpcProvider;
  account?: string;
  className?: string;
  children?: any;
};

const EthStakingWidget = ({
                            config,
                            provider,
                            account,
                            children,
                            className = '',
                          }: Props) => {
  return (
    <EthStakingWidgetContextProvider>
      <Wrapper
        config={config}
        provider={provider}
        account={account}
        className={className}
      >
        {children}
      </Wrapper>
    </EthStakingWidgetContextProvider>
  );
};

EthStakingWidget.Header = Header;
EthStakingWidget.SelectAmount = SelectAmount;
EthStakingWidget.RewardsForecast = EthRewardForecast;
EthStakingWidget.Status = Status;


export default EthStakingWidget;