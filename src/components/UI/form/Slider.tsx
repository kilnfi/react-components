import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

export type Props = {
  stakeAmount: number;
  handleStakeAmountChange: (value: number[]) => void;
  maximumStakeAmount?: number;
}

const Slider = ({ stakeAmount, handleStakeAmountChange, maximumStakeAmount = 320 }: Props) => {
  return (
    <RadixSlider.Root
      className="rc-relative rc-flex rc-items-center rc-select-none rc-touch-none rc-w-full rc-h-[20px] rc-mb-5"
      step={32}
      value={[stakeAmount]}
      onValueChange={handleStakeAmountChange}
      min={0}
      max={maximumStakeAmount}
    >
      <RadixSlider.Track
        className="rc-h-[8px] rc-relative rc-flex-grow rc-rounded-full rc-bg-gray-500">
        <RadixSlider.Range
          className="rc-absolute rc-bg-primary rc-rounded-l-full rc-h-full"/>
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className="rc-block rc-w-[24px] rc-h-[24px] rc-bg-white rc-rounded-full  rc-border-[3px] rc-border-primary focus:rc-outline-none focus:rc-border-primary-pressed"/>
    </RadixSlider.Root>
  )
};

export default Slider;