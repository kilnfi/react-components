import React from 'react';
import RewardForecast from "../../UI/RewardForecast";
import { formatNumber, formatPrice } from "../../../utils";
import { useEthStakingWidgetContext } from "../useEthStakingWidgetContext";
import useEthStats from "../../../hooks/useEthStats";
import useTokenPrice from "../../../hooks/useTokenPrice";

const EthRewardForecast = () => {
  const { context } = useEthStakingWidgetContext();
  const { price } = useTokenPrice('ethereum');
  let { networkApy } = useEthStats(context.config.apiUrl, context.config.apiKey);
  networkApy = context.config.networkApy ? context.config.networkApy : networkApy;

  // Rewards calculation
  const getRewards = () => {
    // Rewards amount
    let token_yearly_rewards_amount: number = context.stakeAmount * (networkApy / 100);
    let token_monthly_rewards_amount: number = token_yearly_rewards_amount / 12;
    let token_daily_rewards_amount: number = token_yearly_rewards_amount / 365;

    let fiat_yearly_rewards_amount: number =
      token_yearly_rewards_amount * price['usd'];
    let fiat_monthly_rewards_amount: number = fiat_yearly_rewards_amount / 12;
    let fiat_daily_rewards_amount: number = fiat_yearly_rewards_amount / 365;

    // Rewards formatted
    const token_yearly_rewards: string = formatNumber(
      token_yearly_rewards_amount,
      4,
    );
    const token_monthly_rewards: string = formatNumber(
      token_monthly_rewards_amount,
      4,
    );
    const token_daily_rewards: string = formatNumber(
      token_daily_rewards_amount,
      4,
    );

    const fiat_yearly_rewards: string = formatPrice(
      fiat_yearly_rewards_amount,
      'usd',
    );
    const fiat_monthly_rewards: string = formatPrice(
      fiat_monthly_rewards_amount,
      'usd',
    );
    const fiat_daily_rewards: string = formatPrice(
      fiat_daily_rewards_amount,
      'usd',
    );

    return {
      token_yearly_rewards,
      token_monthly_rewards,
      token_daily_rewards,
      fiat_yearly_rewards,
      fiat_monthly_rewards,
      fiat_daily_rewards,
    };
  };

  const {
    token_daily_rewards,
    token_monthly_rewards,
    token_yearly_rewards,
    fiat_daily_rewards,
    fiat_monthly_rewards,
    fiat_yearly_rewards,
  } = getRewards();

  return (
    <div className="rc-mb-5">
      <RewardForecast
        token_name="ETH"
        token_daily_rewards={token_daily_rewards}
        token_monthly_rewards={token_monthly_rewards}
        token_yearly_rewards={token_yearly_rewards}
        fiat_daily_rewards={fiat_daily_rewards}
        fiat_monthly_rewards={fiat_monthly_rewards}
        fiat_yearly_rewards={fiat_yearly_rewards}
      />
    </div>
  );
};

export default EthRewardForecast;