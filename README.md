# Overview

This is a React components library that can be used to integrate staking components on different protocols.

## ETH staking widget

The ETH staking widget allows you to stake on Kiln's deposit contract with a connected wallet.  

Usage:
```tsx
import { EthStakingWidget } from "@kilnfi/react-components";
import "@kilnfi/react-components/dist/cjs/index.css";

const App = () => {
  const config: Config = {
    apiUrl: '...', // KILN API URL
    apiKey: '...', // KILN API TOKEN
    accountId: '...', // KILN account id
    network: 'goerli', // goerli | mainnet
    chainId: 5, // network chain id
    onStartStaking: () => {
      //
    },
    onPendingTxSignature: (contractAddress, stakeAmount) => {
      //
    },
    onMiningDepositTx: () => {
      //
    },
    onUserRejectsDepositTx: () => {
      //
    },
    onError: (error) => {
      //
    },
    onSuccess: (receipt, stakeAmount) => {
      //
    },
    onReset: () => {
      //
    }
  };
  
  const provider = '' // A JsonRpcProvider (see: https://docs.ethers.io/v5/api/providers/jsonrpc-provider/)
  const account = '...' // connected wallet address
  
  return (
    <EthStakingWidget 
      config={config}
      provider={provider}
      account={account}
    >
      <EthStakingWidget.Header/>
      <EthStakingWidget.SelectAmount/>
      <EthStakingWidget.RewardsForecast/>
      <EthStakingWidget.Status/>
    </EthStakingWidget>   
  )
}
```

Reference:  

### EthStakingWidget

| **Props**                     | **Type** | **Description**                                                                             |
|-------------------------------|----------|---------------------------------------------------------------------------------------------|
| account                       | required | Connected wallet address (eg. '0x78693a6BCE41cB56D822FF039470DdAee0d47E72')                 |
| provider                      | required | JsonRpcProvider (see: https://docs.ethers.io/v5/api/providers/jsonrpc-provider/)            |
| config                        | required |                                                                                             |
| config.apiUrl                 | required | Kiln API URL                                                                                |
| config.apiKey                 | required | Kiln API key                                                                                |
| config.accountId              | required | Kiln account id that will be associated with the stake.                                     |
| config.network                | required | 'goerli' or 'mainnet'                                                                       |
| config.chainId                | required | Network chain id: 5 or 1                                                                    |
| config.onStartStaking         | optional | Function triggered when user clicks on "Stake now"                                          |
| config.onPendingTxSignature   | optional | Function triggered when the transaction signature is pending                                |
| config.onUserRejectsDepositTx | optional | Function triggered when user rejects the transaction signature                              |
| config.onMiningDepositTx      | optional | Function triggered when transaction has been signed and is being mined                      |
| config.onSuccess              | optional | Function triggered when transaction has been mined successfully                             |
| config.onError                | optional | Function triggered when there is an error while generating keys or if the transaction failed |
| config.onReset                | optional | Function triggered when component has been reset to initial state                           |

### EthStakingWidget.Header

Optional header.

### EthStakingWidget.SelectAmount

Slider required to choose the amount to stake.

### EthStakingWidget.RewardsForecast

Optional rewards forecast component.

### EthStakingWidget.Status

Required bottom part of component with the different staking states, it includes the "Stake now" button.