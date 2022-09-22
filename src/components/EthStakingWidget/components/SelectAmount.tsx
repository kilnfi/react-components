import React from 'react';
import Slider from "../../UI/form/Slider";
import { useEthStakingWidgetContext } from "../useEthStakingWidgetContext";
import { formatNumber } from "../../../utils";
import useEthStats from "../../../hooks/useEthStats";
import Badge from "../../UI/Badge";
import Tooltip from "../../UI/Tooltip";
import { InfoIcon } from "../../Icons";
import { BigNumber, utils } from "ethers";

const SelectAmount = () => {
  const { context, setContext } = useEthStakingWidgetContext();
  let { networkApy } = useEthStats(context.config.apiUrl, context.config.apiKey);
  networkApy = context.config.networkApy ? context.config.networkApy : networkApy;

  // APY
  const formatted_apy = `${formatNumber(networkApy, 2)}%`;

  const formatBalance = (balance: BigNumber): string => {
    const balanceString = utils.formatEther(balance);
    return parseFloat(balanceString).toFixed(4);
  };

  // Balance
  const formattedBalance = context.balance ? formatBalance(utils.parseEther(context.balance)) : undefined;

  // Update stake amount handler
  const handleStakeAmountChange = (value: number[]) => {
    setContext({
      ...context,
      stakeAmount: value[0],
    });
  };

  return (
    <>
      <div className="rc-bg-white rc-p-4.5 rc-rounded">
        <div className="rc-flex rc-justify-between rc-items-center rc-gap-x-4 rc-mb-5">
          <div className="rc-flex rc-items-center rc-gap-x-2">
                  <span className="rc-inline-block rc-text-subtitle-3 rc-text-gray-700">
                Stake
                  </span>
            <h2>
              {context.stakeAmount}
            </h2>
            <span className="rc-inline-block rc-text-subtitle-3 rc-text-gray-700">
                ETH
                  </span>
          </div>

          <div
            className="rc-flex rc-flex rc-items-center rc-justify-end rc-gap-x-2 rc-flex-shrink-0">
                  <span
                    className="rc-inline-block rc-text-subtitle-3 rc-text-gray-700 rc-text-right">
                APY
                  </span>
            <Tooltip>
              <Tooltip.Trigger>
                <button className="rc-bg-white">
                  <InfoIcon className="rc-w-[18px] rc-h-[18px] rc-text-gray-700"/>
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content className="rc-max-w-[300px] rc-p-2">
                      <span className="rc-flex rc-text-sm rc-text-gray-900">
                  The estimated reward your will earn per year. This is calculated with real-time blockchain data.
                      </span>
              </Tooltip.Content>
            </Tooltip>
            <Badge color="yellow">
              {formatted_apy}
            </Badge>
          </div>
        </div>

        <Slider
          stakeAmount={context.stakeAmount}
          handleStakeAmountChange={handleStakeAmountChange}
          maximumStakeAmount={context.config.maximumAmount}
        />

        {formattedBalance && (
          <div className="rc-flex rc-items-center rc-justify-between rc-mt-4">
                  <span
                    className="rc-inline-block rc-text-subtitle-3 rc-text-gray-700">
                Available
                  </span>
            <span
              className="rc-inline-block rc-text-subtitle-3 rc-text-gray-700 rc-text-right">
                    {formattedBalance}
                  </span>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectAmount;