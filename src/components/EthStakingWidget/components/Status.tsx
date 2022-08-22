import React from "react";
import CheckboxInput from "../../UI/form/CheckboxInput";
import Button from "../../UI/Button";
import { ExternalLinkIcon, LoadingIcon } from "../../Icons";
import InfoCard from "../../UI/InfoCard";
import { useEthStakingWidgetContext } from "../useEthStakingWidgetContext";
import { generateEthKeys, ValidationKeyDepositData } from "../../../api/eth";
import { utils } from "ethers";
import {
  GOERLI_DEPOSIT_CONTRACT_ADDRESS,
  MAINNET_DEPOSIT_CONTRACT_ADDRESS,
} from "./Wrapper";
import SuccessCardWhite from "../../UI/SuccessCardWhite";

const Status = () => {
  const { context, setContext } = useEthStakingWidgetContext();

  const reset = () => {
    setContext({
      ...context,
      stakingState: 'initial',
    });
    if (context.config.onReset && typeof context.config.onReset === 'function') {
      context.config.onReset();
    }
  };

  const handleConfirmAddress = () => {
    setContext({
      ...context,
      isAddressConfirmed: !context.isAddressConfirmed,
    });
  };

  const handleStake = async () => {
    if (!context.contract || !context.account || context.config.accountId === '') return;

    const generateKeys = async (
      account: string,
      accountId: string,
    ): Promise<ValidationKeyDepositData | undefined> => {
      const nbKeys = context.stakeAmount / 32;
      try {
        return await generateEthKeys(context.config.apiUrl, context.config.apiKey, account, accountId, nbKeys);
      } catch (e) {
        reset();
        if (context.config.onError && typeof context.config.onError === 'function') {
          context.config.onError('An error happened while preparing validators. Please try again later.');
        }
      }
    };

    try {
      // onStartStaking
      if (context.config.onStartStaking && typeof context.config.onStartStaking === 'function') {
        context.config.onStartStaking();
      }
      // Generate keys
      setContext({
        ...context,
        stakingState: 'generating_keys',
      });
      const generatedKeys = await generateKeys(context.account, context.config.accountId);
      if (!generatedKeys) {
        reset();
        if (context.config.onError && typeof context.config.onError === 'function') {
          context.config.onError('An error happened while preparing validators. Please try again later.');
        }
        return;
      }

      // onPendingTxSignature
      if (context.config.onPendingTxSignature && typeof context.config.onPendingTxSignature === 'function') {
        const contractAddress = context.config.network === 'goerli' ? GOERLI_DEPOSIT_CONTRACT_ADDRESS : MAINNET_DEPOSIT_CONTRACT_ADDRESS;
        context.config.onPendingTxSignature(contractAddress, context.stakeAmount, context.account);
      }

      // Send tx
      setContext({
        ...context,
        stakingState: 'pending_tx_signature',
      });
      const res = await context.contract.batchDeposit(
        generatedKeys.data.pubkeys
          .map((v) => '0x' + v),
        generatedKeys.data.withdrawal_credentials
          .map((v) => '0x' + v),
        generatedKeys.data.signatures
          .map((v) => '0x' + v),
        generatedKeys.data.deposit_data_roots
          .map((v) => '0x' + v),
        { value: utils.parseEther(context.stakeAmount.toString()) },
      );

      // onMiningDepositTx
      if (context.config.onMiningDepositTx && typeof context.config.onMiningDepositTx === 'function') {
        context.config.onMiningDepositTx();
      }
      setContext({
        ...context,
        stakingState: 'mining_deposit_tx',
      });
      const receipt = await res.wait();
      if (receipt.status === 0) { // tx failed
        if (context.config.onError && typeof context.config.onError === 'function') {
          context.config.onError('The transaction could not be processed by the network, please try again later.');
        }
        reset();
      } else { // tx succeeded
        // onSuccess
        if (context.config.onSuccess && typeof context.config.onSuccess === 'function') {
          context.config.onSuccess(receipt, context.stakeAmount);
        }
        setContext({
          ...context,
          stakingState: 'stake_deposited',
        });
      }
    } catch (e: any) {
      reset();
      if (e.code !== 4001) { // 4001 is when user rejects tx
        if (context.config.onError && typeof context.config.onError === 'function') {
          context.config.onError('An error happened while preparing validators. Please try again later.');
        }
      } else { // onUserRejectsDepositTx
        if (context.config.onUserRejectsDepositTx && typeof context.config.onUserRejectsDepositTx === 'function') {
          context.config.onUserRejectsDepositTx();
        }
      }
    }
  };

  // Insufficient balance warning
  const stakeAmountBigNumber = utils.parseEther(context.stakeAmount.toString());
  const showInsufficientBalanceWarning =
    context.stakingState === 'initial' &&
    context.account &&
    context.balance &&
    stakeAmountBigNumber.gt(utils.parseEther(context.balance));

  // Stake button disabled state
  const isStakeDisabled: boolean = Boolean(
    context.stakingState === 'initial' &&
    (context.stakeAmount === 0 || showInsufficientBalanceWarning || !context.isAddressConfirmed || context.config.accountId === ''),
  );

  const neededChainId = context.config.network === 'goerli' ? 5 : 1;
  const isAccountValid: boolean = Boolean(context.account) && context.config.chainId === neededChainId;

  return (
    <div className="rc-px-4">
      {(context.stakingState === 'initial' && isAccountValid) && (
        <>
          {showInsufficientBalanceWarning ? (
            <InfoCard className="rc-mb-4"
                      label={`Insufficient funds to stake ${context.stakeAmount} ETH`}/>
          ) : (
            <div className="rc-mb-4">
              <InfoCard className="rc-mb-4"
                        label="Please verify your wallet address">
                <a
                  href={`https://${context.config.network === 'goerli' ? 'goerli.' : ''}etherscan.io/address/${context.account}`}
                  className="rc-col-span-2 rc-inline-block hover:rc-underline rc-mt-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="rc-break-all">
                    {context.account}
                    <ExternalLinkIcon
                      className={`rc-inline rc-ml-1 rc-relative rc-bottom-[1px] rc-h-4 rc-w-4 rc-text-black`}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </InfoCard>
              <CheckboxInput
                name="address_confirmation"
                label="I understand that this address will be the only one able to withdraw my staking rewards, I should not lose access to it."
                checked={context.isAddressConfirmed}
                onChange={handleConfirmAddress}
              />
            </div>
          )}

          <Button
            className="rc-w-full"
            onClick={handleStake}
            disabled={isStakeDisabled}
          >
            Stake now
          </Button>
        </>
      )}

      {context.stakingState === 'initial' && !isAccountValid && (
        <InfoCard
          label={`Connect an Ethereum ${context.config.network} wallet`}/>
      )}

      {context.stakingState === 'generating_keys' && (
        <div
          className="rc-flex rc-item-center rc-gap-x-3 rc-mt-5 rc-justify-center">
          <LoadingIcon className="rc-w-4 rc-w-4"/>
          <span className="rc-text-subtitle-2 rc-text-gray-800">
                Preparing validators...
          </span>
        </div>
      )}

      {context.stakingState === 'pending_tx_signature' && (
        <div className="rc-flex rc-item-center rc-gap-x-3 rc-justify-center">
          <LoadingIcon className="rc-w-4 rc-w-4"/>
          <span className="rc-text-subtitle-2 rc-text-gray-800">
            Pending signature...
          </span>
        </div>
      )}

      {context.stakingState === 'mining_deposit_tx' && (
        <div className="rc-flex rc-item-center rc-gap-x-3 rc-justify-center">
          <LoadingIcon className="rc-w-4 rc-w-4"/>
          <span className="rc-text-subtitle-2 rc-text-gray-800">
            Processing transaction...
          </span>
        </div>
      )}

      {context.stakingState === 'stake_deposited' && (
        <>
          <SuccessCardWhite label="Congrats!" className="rc-mb-6">
            You have successfully staked {context.stakeAmount} ETH!
          </SuccessCardWhite>

          <div className="rc-mb-4">
            <Button
              variant="secondary"
              onClick={reset}
              className="rc-w-full"
            >
              Stake more
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Status;