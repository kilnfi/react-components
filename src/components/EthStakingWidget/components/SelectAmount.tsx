import React from 'react';
import Slider from "../../UI/form/Slider";
import { useEthStakingWidgetContext } from "../useEthStakingWidgetContext";
import { formatNumber } from "../../../utils";
import useEthStats from "../../../hooks/useEthStats";
import Badge from "../../UI/Badge";

const SelectAmount = () => {
  const { context, setContext } = useEthStakingWidgetContext();
  let { networkApy } = useEthStats(context.config.apiUrl, context.config.apiKey);
  networkApy = context.config.networkApy ? context.config.networkApy : networkApy;

  // APY
  const formatted_apy = `${formatNumber(networkApy, 2)}%`;

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
        <div className="rc-flex rc-justify-between rc-gap-x-4 rc-mb-5">
          <div className="rc-flex rc-flex-col rc-items-start">
          <span
            className="rc-inline-block rc-text-subtitle-3 rc-text-gray-700 rc-mb-2">
                ETH stake
          </span>
            <span className="rc-font-semibold rc-text-xl">
              {context.stakeAmount}
            </span>
          </div>

          <div className="rc-flex rc-flex-col rc-items-end rc-flex-shrink-0">
            <span
              className="rc-inline-block rc-text-subtitle-3 rc-text-gray-700 rc-mb-2 rc-text-right">
                  Network APY
            </span>
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
      </div>
    </>
  );
};

export default SelectAmount;