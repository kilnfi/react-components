import React from 'react';

type Props = {
  token_name: string,
  token_daily_rewards: string,
  token_monthly_rewards: string,
  token_yearly_rewards: string,
  fiat_daily_rewards: string,
  fiat_monthly_rewards: string,
  fiat_yearly_rewards: string,
}

const RewardForecast = (props: Props) => {
  const {
    token_name,
    token_daily_rewards,
    token_monthly_rewards,
    token_yearly_rewards,
    fiat_daily_rewards,
    fiat_monthly_rewards,
    fiat_yearly_rewards,
  } = props;

  return (
    <div className="rc-px-4 rc-my-4.5">
      <span className="rc-font-semibold rc-text-sm rc-text-black">Rewards</span>
      <div
        className="rc-flex rc-items-center rc-justify-between rc-border-b rc-border-gray-300 rc-py-4 rc-gap-x-2">
        <span
          className="rc-w-1/3 rc-text-gray-700 rc-text-small-1">
                Daily
        </span>
        <span
          className="rc-w-1/3 rc-text-body-2 rc-text-black rc-text-right rc-flex-shrink-0 rc-break-all">
          {token_daily_rewards} <span
            className="rc-whitespace-nowrap">{token_name}</span>
        </span>
        <span
          className="rc-w-1/3 rc-text-body-2 rc-text-black rc-text-right rc-flex-shrink-0 rc-break-all">
          {fiat_daily_rewards}
        </span>
      </div>
      <div
        className="rc-flex rc-items-center rc-justify-between rc-border-b rc-border-gray-300 rc-py-4 rc-gap-x-2">
        <span
          className="rc-w-1/3 rc-text-gray-700 rc-text-small-1">
                Monthly
        </span>
        <span
          className="rc-w-1/3 rc-text-body-2 rc-text-black rc-text-right rc-flex-shrink-0 rc-break-all">
          {token_monthly_rewards} <span
            className="rc-whitespace-nowrap">{token_name}</span>
        </span>
        <span
          className="rc-w-1/3 rc-text-body-2 rc-text-black rc-text-right rc-flex-shrink-0 rc-break-all">
          {fiat_monthly_rewards}
        </span>
      </div>
      <div className="rc-flex rc-items-center rc-justify-between rc-py-4 rc-gap-x-2">
        <span
          className="rc-w-1/3 rc-text-gray-700 rc-text-small-1">
                Yearly
        </span>
        <span
          className="rc-w-1/3 rc-text-body-2 rc-text-black rc-text-right rc-flex-shrink-0 rc-break-all">
          {token_yearly_rewards} <span
            className="rc-whitespace-nowrap">{token_name}</span>
        </span>
        <span
          className="rc-w-1/3 rc-text-body-2 rc-text-black rc-text-right rc-flex-shrink-0 rc-break-all">
          {fiat_yearly_rewards}
        </span>
      </div>
    </div>
  );
};

export default RewardForecast;